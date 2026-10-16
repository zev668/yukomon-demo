/* Touch-only bounded rubber band. Transform the viewport, not its contents:
   scrollHeight/scrollTop and sticky descendants remain unchanged. */
(function(){
  const gsap=window.gsap, app=document.querySelector('#app');
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  let gesture=null, active=null, suppress=0;
  function clear(s){if(!s)return;if(s.tween)s.tween.kill();s.el.style.transform=s.transform;s.el.style.clipPath=s.clip;s.el.style.transformOrigin=s.origin;s.el.style.willChange=s.will;s.el.style.overflowY=s.overflow;if(active===s)active=null;}
  function paint(s){if(!s.el.isConnected){clear(s);return;}const y=s.y,scale=1+Math.min(.018,Math.abs(y)/5000),h=s.height;
    s.el.style.transformOrigin='50% '+(y>=0?'0%':'100%');
    s.el.style.transform=`translate3d(0,${y}px,0) scaleY(${scale})`;
    // Clip to original viewport, including during small spring overshoot.
    const top=y>=0?0:Math.max(0,(-y+h*(scale-1))/scale);
    const bottom=y>=0?Math.max(0,(y+h*(scale-1))/scale):0;
    s.el.style.clipPath=`inset(${top}px 0 ${bottom}px 0)`;
  }
  function release(){const g=gesture;gesture=null;if(!g||!g.s)return;const s=g.s;s.el.style.overflowY=s.overflow;suppress=performance.now()+250;
    s.tween=gsap.to(s,{y:0,duration:reduced()?.12:.65,ease:reduced()?'power2.out':'elastic.out(1,0.65)',onUpdate:()=>paint(s),onComplete:()=>clear(s)});
  }
  app.addEventListener('touchstart',e=>{
    if(active)clear(active);gesture=null;if(e.touches.length!==1||reduced()||e.target.closest('input,textarea,video,.yk-card'))return;
    let el=e.target.closest('#view,.page-body,.sheet-body,.sheet-scroll');
    while(el&&!/auto|scroll/.test(getComputedStyle(el).overflowY))el=el.parentElement.closest('#view,.page-body,.sheet-body,.sheet-scroll');
    if(!el)return;const t=e.touches[0];gesture={el,x:t.clientX,y:t.clientY,last:t.clientY,axis:null,raw:0};
  },{passive:true});
  app.addEventListener('touchmove',e=>{
    const g=gesture;if(!g)return;if(e.touches.length!==1){release();return;}
    const t=e.touches[0],dx=t.clientX-g.x,dy=t.clientY-g.y,delta=t.clientY-g.last;g.last=t.clientY;
    if(!g.axis){if(Math.max(Math.abs(dx),Math.abs(dy))<7)return;g.axis=Math.abs(dy)>Math.abs(dx)?'y':'x';}if(g.axis!=='y')return;
    if(!g.s){const max=g.el.scrollHeight-g.el.clientHeight;
      if(!((g.el.scrollTop<=1&&delta>0)||(g.el.scrollTop>=max-1&&delta<0)))return;
      const el=g.el;g.s=active={el,y:0,height:el.offsetHeight,transform:el.style.transform,clip:el.style.clipPath,origin:el.style.transformOrigin,will:el.style.willChange,overflow:el.style.overflowY};
      g.edge=delta>0?1:-1;g.raw=0;el.style.overflowY='hidden';el.style.willChange='transform';
    }
    if(e.cancelable)e.preventDefault();g.raw+=delta;
    if(g.raw*g.edge<0){const remainder=g.raw;clear(g.s);g.s=null;g.raw=0;g.el.scrollTop-=remainder;return;}
    g.s.y=Math.sign(g.raw)*80*(1-Math.exp(-Math.abs(g.raw)*.5/80));paint(g.s);
  },{passive:false});
  app.addEventListener('touchend',release,{passive:true});app.addEventListener('touchcancel',release,{passive:true});
  app.addEventListener('click',e=>{if(performance.now()<suppress){e.preventDefault();e.stopPropagation();}},{capture:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){gesture=null;clear(active);}});
  new MutationObserver(()=>{if(active&&!active.el.isConnected){gesture=null;clear(active);}}).observe(app,{childList:true,subtree:true});

  // ---------- 底部导航：黄色滑块跟随选中项 ----------
  const bar=document.querySelector('#tabbar');
  const ind=document.createElement('i');ind.className='tab-ind';ind.setAttribute('aria-hidden','true');bar.prepend(ind);
  let placed=false;
  function moveInd(animate){const on=bar.querySelector('button.on');if(!on)return;const x=on.offsetLeft,w=on.offsetWidth;
    if(!animate||!placed||reduced()){gsap.set(ind,{x,width:w});placed=true;return;}
    // Button widths are stable; animate only the compositor-friendly x transform.
    gsap.set(ind,{width:w});
    gsap.to(ind,{x,duration:.55,ease:'expo.out',overwrite:'auto'});
    gsap.fromTo(ind,{scaleY:1},{keyframes:{scaleY:[1,.86,1.04,1]},duration:.5,ease:'power1.out'});}
  new MutationObserver(()=>moveInd(true)).observe(bar,{subtree:true,attributes:true,attributeFilter:['class']});
  addEventListener('resize',()=>moveInd(false));
  requestAnimationFrame(()=>moveInd(false));
  bar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||reduced())return;const icon=b.querySelector('svg'),label=b.querySelector('span');gsap.killTweensOf([icon,label]);
    gsap.fromTo(icon,{y:-4,scale:.8,rotation:b.dataset.tab==='catch'?-90:-10},{y:0,scale:1,rotation:0,duration:.5,ease:'back.out(2.2)',clearProps:'transform'});
    gsap.fromTo(label,{y:3,autoAlpha:.4},{y:0,autoAlpha:1,duration:.35,ease:'power2.out',clearProps:'all'});});

  // ---------- 全局按压微动效：所有可点元素按下轻缩、松开带一点回弹 ----------
  const PRESS='button,.btn,.pill,[role=button],.cell,.entry,.rank-row,.tile[data-act],.met-row,.album-btn,.head-act,.like';
  let pressed=null;
  function up(){const el=pressed;pressed=null;if(!el)return;gsap.to(el,{scale:1,duration:.5,ease:'elastic.out(1,0.5)',overwrite:'auto',clearProps:'transform'});}
  app.addEventListener('pointerdown',e=>{
    if(reduced()||e.button>0)return;const el=e.target.closest(PRESS);
    if(!el||el.disabled||el.closest('#tabbar')||el.matches('.shutter')||el.closest('.yk-card,.card-stage'))return;
    pressed=el;const big=el.offsetWidth>220||el.offsetHeight>120;
    gsap.to(el,{scale:big?.985:.94,duration:.14,ease:'power2.out',overwrite:'auto'});
  },{passive:true});
  ['pointerup','pointercancel','pointerleave'].forEach(t=>app.addEventListener(t,up,{passive:true}));
  addEventListener('blur',up);
  // 底部导航按压只压图标所在按钮，避免和滑块抢
  bar.addEventListener('pointerdown',e=>{const b=e.target.closest('button');if(!b||reduced())return;gsap.to(b,{scale:.94,duration:.12,overwrite:'auto'});});
  ['pointerup','pointercancel','pointerleave'].forEach(t=>bar.addEventListener(t,e=>{const b=e.target.closest('button');if(b)gsap.to(b,{scale:1,duration:.45,ease:'elastic.out(1,0.5)',overwrite:'auto',clearProps:'transform'});}));

  // ---------- 选中态切换：pill / 分段按钮 被选中时轻弹一下 ----------
  new MutationObserver(list=>{if(reduced())return;for(const m of list){const t=m.target;
    if(m.oldValue&&!/\bon\b/.test(m.oldValue)&&t.classList.contains('on')&&t.matches('.pill,.cam-modes button,.variant .pill')){
      gsap.fromTo(t,{scale:.9},{scale:1,duration:.45,ease:'back.out(3)',clearProps:'transform'});}}})
    .observe(app,{subtree:true,attributes:true,attributeFilter:['class'],attributeOldValue:true});
})();
