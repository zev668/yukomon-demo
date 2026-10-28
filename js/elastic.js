/* Touch-only bounded rubber band. Transform the viewport, not its contents:
   scrollHeight/scrollTop and sticky descendants remain unchanged. */
(function(){
  const gsap=window.gsap, app=document.querySelector('#app');
  const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
  const reduced=()=>motionQuery.matches;
  let gesture=null, active=null, suppress=null;
  function clear(s,keepTransform=false){if(!s)return;if(s.tween)s.tween.kill();if(!keepTransform)s.el.style.transform=s.transform;s.el.style.clipPath=s.clip;s.el.style.transformOrigin=s.origin;s.el.style.willChange=s.will;s.el.style.overflowY=s.overflow;if(active===s)active=null;}
  function paint(s){if(!s.el.isConnected){clear(s);return;}const y=s.y,scale=1+Math.min(.018,Math.abs(y)/5000),h=s.height;
    s.el.style.transformOrigin='50% '+(y>=0?'0%':'100%');
    s.el.style.transform=`translate3d(0,${y}px,0) scaleY(${scale})`;
    // Clip to original viewport, including during small spring overshoot.
    const top=y>=0?0:Math.max(0,(-y+h*(scale-1))/scale);
    const bottom=y>=0?Math.max(0,(y+h*(scale-1))/scale):0;
    s.el.style.clipPath=`inset(${top}px 0 ${bottom}px 0)`;
  }
  function release(){const g=gesture;gesture=null;if(!g||!g.s)return;const s=g.s;s.el.style.overflowY=s.overflow;suppress={until:performance.now()+250,root:s.el};
    s.tween=gsap.to(s,{y:0,duration:reduced()?.12:.65,ease:reduced()?'power2.out':'elastic.out(1,0.65)',onUpdate:()=>paint(s),onComplete:()=>clear(s)});
  }
  app.addEventListener('touchstart',e=>{
    suppress=null;if(active)clear(active);gesture=null;if(e.touches.length!==1||reduced()||e.target.closest('input,textarea,video,.yk-card,.reflective-shell,.card-host,.card-stage'))return;
    let el=e.target.closest('#view,.page-body,.sheet-body,.sheet-scroll');
    while(el&&!/auto|scroll/.test(getComputedStyle(el).overflowY))el=el.parentElement.closest('#view,.page-body,.sheet-body,.sheet-scroll');
    if(!el||gsap.isTweening(el))return;const t=e.touches[0];gesture={el,target:e.target,x:t.clientX,y:t.clientY,last:t.clientY,axis:null,raw:0};
  },{passive:true});
  app.addEventListener('touchmove',e=>{
    const g=gesture;if(!g)return;if(e.touches.length!==1){release();return;}
    const t=e.touches[0],dx=t.clientX-g.x,dy=t.clientY-g.y,delta=t.clientY-g.last;g.last=t.clientY;
    if(!g.axis){if(Math.max(Math.abs(dx),Math.abs(dy))<7)return;g.axis=Math.abs(dy)>Math.abs(dx)?'y':'x';}if(g.axis!=='y')return;
    if(!g.s){if(gsap.isTweening(g.el)){gesture=null;return;}const max=g.el.scrollHeight-g.el.clientHeight;
      if(!((g.el.scrollTop<=1&&delta>0)||(g.el.scrollTop>=max-1&&delta<0)))return;
      const el=g.el;g.s=active={el,target:g.target,y:0,height:el.offsetHeight,transform:el.style.transform,clip:el.style.clipPath,origin:el.style.transformOrigin,will:el.style.willChange,overflow:el.style.overflowY};
      g.edge=delta>0?1:-1;g.raw=0;el.style.overflowY='hidden';el.style.willChange='transform';
    }
    if(e.cancelable)e.preventDefault();g.raw+=delta;
    if(g.raw*g.edge<0){const remainder=g.raw;clear(g.s);g.s=null;g.raw=0;g.el.scrollTop-=remainder;return;}
    g.s.y=Math.sign(g.raw)*80*(1-Math.exp(-Math.abs(g.raw)*.5/80));paint(g.s);
  },{passive:false});
  app.addEventListener('touchend',release,{passive:true});app.addEventListener('touchcancel',release,{passive:true});
  app.addEventListener('click',e=>{const pending=suppress;suppress=null;if(pending&&e.detail!==0&&performance.now()<pending.until&&pending.root.contains(e.target)){e.preventDefault();e.stopPropagation();}},{capture:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){gesture=null;clear(active);}});
  // #view is reused across tabs; its old touch target can leave while the scroller stays connected.
  new MutationObserver(()=>{
    if(gesture&&(!gesture.el.isConnected||!gesture.target.isConnected))gesture=null;
    if(active&&(!active.el.isConnected||!active.target.isConnected)){suppress=null;clear(active,gsap.isTweening(active.el));}
    for(const [el,s] of scales)if(!el.isConnected){gsap.killTweensOf(s);el.style.scale=s.original;scales.delete(el);if(pressed?.el===el)pressed=null;}
  }).observe(app,{childList:true,subtree:true});

  // ---------- 底部导航：滑块跟随选中项 ----------
  const bar=document.querySelector('#tabbar');
  const ind=document.createElement('i');ind.className='tab-ind';ind.setAttribute('aria-hidden','true');bar.prepend(ind);
  let placed=false;
  function moveInd(animate){const on=bar.querySelector('button.on');if(!on)return;const x=on.offsetLeft,w=on.offsetWidth;
    if(!animate||!placed||reduced()){gsap.killTweensOf(ind);gsap.set(ind,{x,width:w,scaleY:1});placed=true;return;}
    // Button widths are stable; animate only the compositor-friendly x transform.
    gsap.set(ind,{width:w});
    gsap.to(ind,{x,duration:.28,ease:'power3.out',overwrite:'auto'});}
  new MutationObserver(()=>moveInd(true)).observe(bar,{subtree:true,attributes:true,attributeFilter:['class']});
  addEventListener('resize',()=>moveInd(false));
  requestAnimationFrame(()=>moveInd(false));
  bar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||reduced()||b.disabled||b.getAttribute('aria-disabled')==='true')return;const icon=b.querySelector('svg,img'),label=b.querySelector('span');gsap.killTweensOf([icon,label].filter(Boolean));
    if(icon)gsap.fromTo(icon,{y:-2,scale:.94},{y:0,scale:1,duration:.22,ease:'power3.out',overwrite:'auto',clearProps:'transform'});
    if(label)gsap.fromTo(label,{y:1,autoAlpha:.75},{y:0,autoAlpha:1,duration:.16,ease:'power2.out',overwrite:'auto',clearProps:'transform,opacity,visibility'});});

  // ---------- 全局按压微动效 ----------
  const PRESS='button,.btn,.pill,[role=button],.cell,.entry,.rank-row,.tile[data-act],.met-row,.album-btn,.head-act,.like';
  // Individual scale keeps press feedback separate from entrance transforms.
  const scales=new Map();
  function scaleTo(el,value,duration,ease,from=1){let s=scales.get(el);
    if(!s){s={el,value:from,original:el.style.scale};scales.set(el,s);}
    gsap.to(s,{value,duration,ease,overwrite:true,onUpdate:()=>{el.style.scale=String(s.value);},onComplete:()=>{
      if(value===1&&scales.get(el)===s){el.style.scale=s.original;scales.delete(el);}
    }});
  }
  let pressed=null;
  function up(e){if(!pressed||(e&&'pointerId'in e&&e.pointerId!==pressed.pointerId))return;
    const {el}=pressed;pressed=null;scaleTo(el,1,reduced()?0:.18,'power3.out');}
  app.addEventListener('pointerdown',e=>{
    suppress=null;if(reduced()||e.button>0||e.isPrimary===false)return;const el=e.target.closest(PRESS);
    if(!el||el.disabled||el.getAttribute('aria-disabled')==='true'||el.getAttribute('aria-busy')==='true'||el.closest('[inert]')||el.matches('.shutter')||el.closest('.yk-card,.reflective-shell,.card-host,.card-stage,.card-face'))return;
    up();pressed={el,pointerId:e.pointerId};const big=el.offsetWidth>220||el.offsetHeight>120;
    scaleTo(el,big?.99:.97,.09,'power2.out');
  },{passive:true});
  ['pointerup','pointercancel'].forEach(t=>addEventListener(t,up,{passive:true}));
  app.addEventListener('pointerleave',up,{passive:true});
  app.addEventListener('pointerout',e=>{if(pressed&&!pressed.el.contains(e.relatedTarget))up(e);},{passive:true});
  app.addEventListener('touchmove',()=>up(),{passive:true});
  addEventListener('blur',()=>resetFeedback());
  addEventListener('pagehide',()=>resetFeedback());

  // ---------- 选中态切换：pill / 分段按钮 被选中时轻弹一下 ----------
  new MutationObserver(list=>{if(reduced())return;for(const m of list){const t=m.target;
    if(m.oldValue&&!/\bon\b/.test(m.oldValue)&&t.classList.contains('on')&&t.matches('.pill,.cam-modes button,.variant .pill')){
      scaleTo(t,1,.18,'power2.out',.98);}}})
    .observe(app,{subtree:true,attributes:true,attributeFilter:['class'],attributeOldValue:true});
  function resetFeedback(){pressed=null;gesture=null;suppress=null;clear(active);
    for(const s of scales.values()){gsap.killTweensOf(s);s.el.style.scale=s.original;}scales.clear();
    const parts=bar.querySelectorAll('button svg,button img,button span');
    gsap.killTweensOf(parts);gsap.set(parts,{clearProps:'transform,opacity,visibility'});moveInd(false);
  }
  motionQuery.addEventListener('change',()=>{if(reduced())resetFeedback();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)resetFeedback();});
})();
