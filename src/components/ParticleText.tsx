import { useEffect, useRef } from 'react';
import { useParticleSimulation } from '../hooks/useParticleSimulation';

type ParticleTextProps = {
  onFadeComplete: () => void;
};

const ParticleText: React.FC<ParticleTextProps> = ({ onFadeComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useParticleSimulation(containerRef, onFadeComplete);
  return <div ref={containerRef} className="w-full h-screen" />;
};

export default ParticleText;
