import { useEffect } from 'react';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import * as CANNON from 'cannon-es';
import { setupScene } from '../utils/sceneSetup';
import { createParticles } from '../utils/particleCreator';
import { fadeOutParticles } from '../utils/animationUtils';
import { useCleanup } from './useCleanup';
import { useWindowResize } from './useWindowResize';

type ParticleSimulationProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  onFadeComplete: () => void;
};

export const useParticleSimulation = (
  containerRef: React.RefObject<HTMLDivElement>,
  onFadeComplete: () => void
) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const { scene, camera, renderer, world } = setupScene(containerRef.current);
    const particles: Array<{
      mesh: THREE.Mesh;
      body: CANNON.Body;
    }> = [];
    let physicsEnabled = false;

    // Create text geometry
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', (font) => {
      const textGeometry = new TextGeometry('David', {
        font,
        size: 35,
        height: 4,
        curveSegments: 32,
        bevelEnabled: true,
        bevelThickness: 1.5,
        bevelSize: 0.8,
        bevelSegments: 16
      });

      textGeometry.center();
      createParticles(textGeometry, scene, world, particles, 1.0);

      // Wait before starting physics
      setTimeout(() => {
        physicsEnabled = true;

        // Start fade out after physics has run for a while
        setTimeout(() => {
          fadeOutParticles(particles, 1.5, onFadeComplete);
        }, 4000); // Time from physics start to fade
      }, 2000); // Time to wait before physics starts
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (physicsEnabled) {
        world.step(1 / 60);
        particles.forEach(({ mesh, body }) => {
          mesh.position.copy(body.position as any);
          mesh.quaternion.copy(body.quaternion as any);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => useWindowResize(camera, renderer);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => useCleanup(containerRef, renderer, handleResize);
  }, []);
};
