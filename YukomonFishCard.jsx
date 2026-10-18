import React from 'react';
import ReflectiveCard from './ReflectiveCard.jsx';
import './YukomonFishCard.css';

const YukomonFishCard = ({
  number = 'YK-001',
  rarity = 'SR',
  name = '小丑鱼',
  englishName = 'Clownfish',
  description = '在海葵之间穿梭的珊瑚礁精灵',
  imageUrl = '/assets/clownfish.webp',
  ...props
}) => (
  <ReflectiveCard
    {...props}
    style={{
      ...props.style,
      '--rc-holo': props.holo ?? 0.8,
      '--rc-holo-gain': 1.25,
      '--rc-holo-detail': 1
    }}
    className={`yukomon-fish-card ${props.className || ''}`.trim()}
    videoSrc={undefined}
    webcam={false}
    tint={props.tint ?? '#ffffff'}
    metalness={props.metalness ?? 1}
    roughness={props.roughness ?? 0.3}
    blurStrength={props.blurStrength ?? 6}
    shine={props.shine ?? 1}
    glare={props.glare ?? 0.5}
    grayscale={props.grayscale ?? 1}
    warp={props.warp ?? 0.6}
    warpScale={props.warpScale ?? 1}
    bevel={props.bevel ?? 3}
    tiltStrength={props.tiltStrength ?? 16}
    enableMobileTilt={props.enableMobileTilt ?? true}
    mobileTiltSensitivity={props.mobileTiltSensitivity ?? 7}
    radius={props.radius ?? 24}
  >
    <div className="yukomon-fish-card__inner">
      <span className="yukomon-fish-card__laser" aria-hidden="true">
        <span className="yukomon-fish-card__laser-glow" />
        <span className="yukomon-fish-card__laser-shift" />
      </span>
      <span className="yukomon-fish-card__foil" aria-hidden="true" />
      <span className="yukomon-fish-card__grain" aria-hidden="true" />
      <span className="yukomon-fish-card__number">{number}</span>
      <span className="yukomon-fish-card__rarity">{rarity}</span>
      <span className="yukomon-fish-card__fish-stage">
        <img className="yukomon-fish-card__fish" src={imageUrl} alt={name} draggable={false} />
        <span className="yukomon-fish-card__fish-sheen" aria-hidden="true" />
      </span>
      <span className="yukomon-fish-card__scrim" aria-hidden="true" />
      <div className="yukomon-fish-card__identity">
        <h3>{name}</h3>
        <p>{englishName}</p>
      </div>
      <span className="yukomon-fish-card__inner-rim" aria-hidden="true" />
    </div>
    <p className="yukomon-fish-card__description">{description}</p>
  </ReflectiveCard>
);

export default YukomonFishCard;
