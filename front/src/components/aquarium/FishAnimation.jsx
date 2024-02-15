import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { TweenMax, Power2 } from "gsap";

const FishAnimation = () => {
  const fishModelRef = useRef();
  const { nodes, materials } = useGLTF("/clownfish.glb");

  useEffect(() => {
    fishModelRef.current = nodes.Cube003_Material_0; // Replace "YourFishMeshName" with the actual name of your fish mesh

    // Call the function to start swimming animation
    swimAnimation();
  }, [nodes]);

  const swimAnimation = () => {
    // You can customize the animation parameters based on your requirements
    TweenMax.to(fishModelRef.current.rotation, 2, {
      x: Math.random() * Math.PI * 2,
      y: Math.random() * Math.PI * 2,
      ease: Power2.easeInOut,
      onComplete: swimAnimation, // Repeat the animation
    });
  };

  useFrame(() => {
    if (fishModelRef.current) {
      fishModelRef.current.rotation.z += 0.005; // Additional rotational animation
    }
  });

  return <primitive object={fishModelRef.current} />;
};

export default FishAnimation;
