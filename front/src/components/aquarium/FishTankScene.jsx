import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Chest } from "./Chest.jsx";
import { SeaWeed } from "./SeaWeed.jsx";
import { FishGroup } from "./FishGroup.jsx";
import { EffectComposer, GodRays } from "@react-three/postprocessing";
import {
  BlendFunction,
  KernelSize,
  Resolution as Resizer,
} from "postprocessing";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import {
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
} from "three";
import { Underwater } from "./Underwater.jsx";
import { Box } from "@react-three/drei";

export const FishTankScene = ({
  alignment,
  cohesion,
  separation,
  maxDistance,
  amountOfFish,
  reset,
  hasPostProcessing,
  environment,
  clownExist,
  stoneExist,
  breamExist,
  blackExist,
}) => {
  const cameraRef = useRef();

  const goldLightMesh = new Mesh(
    new CylinderGeometry(0.6, 0.6, 3, 20),
    new MeshBasicMaterial({
      color: "#CC8C39",
      transparent: true,
      opacity: 0.5,
    })
  );

  const sunMesh = new Mesh(
    new SphereGeometry(0.5, 0.5, 3, 20),
    new MeshBasicMaterial({
      color: "#CC8C39",
      transparent: true,
      opacity: 1,
    })
  );

  const SwimmingBox = () => {
    const boxRef = useRef();

    // 매 프레임마다 상자의 위치를 업데이트하여 물결 모션을 시뮬레이션
    useFrame((state, delta) => {
      if (boxRef.current) {
        // 시간에 따라 sin 함수를 사용하여 물결 모션 생성
        boxRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2;
        boxRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5);
        boxRef.current.rotation.x += 0.01;
        boxRef.current.rotation.y += 0.01;
      }
    });

    return (
      <Box ref={boxRef} position={[0, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial attach="material" color={"aquamarine"} />
      </Box>
    );
  };

  const shadowCameraBounds = 40;

  return (
    <Canvas className={"threeCanvas"} shadows={"soft"}>
      <SwimmingBox />
      <directionalLight
        castShadow
        position={[10, 10, 10]}
        intensity={2}
        shadow-camera-left={-shadowCameraBounds}
        shadow-camera-right={shadowCameraBounds}
        shadow-camera-bottom={shadowCameraBounds}
        shadow-camera-top={-shadowCameraBounds}
        shadow-mapSize-height={400}
        shadow-mapSize-width={400}
        shadow-bias={-0.001}
      ></directionalLight>
      {/* <fog attach="fog" color="darkblue" near={2} far={150} /> */}
      <Underwater
        position={[5, -27, 0]}
        rotation={[Math.PI / 2, 0, 11]}
        scale={1.5}
      ></Underwater>
      <SeaWeed
        scale={[3, 4.3, 3]}
        position={[6, -25, 0]}
        rotation={[0, 3, 0]}
      ></SeaWeed>
      <SeaWeed scale={[4, 4, 4]} position={[10, -25, 6]}></SeaWeed>
      <SeaWeed scale={[4, 4.5, 4]} position={[-15, -25, -10]}></SeaWeed>
      <SeaWeed scale={[4, 4.5, 4]} position={[-12, -25, -11]}></SeaWeed>
      <SeaWeed
        scale={[4, 4.5, 4]}
        position={[-15, -25, -0]}
        rotation={[-0.1, 1.3, 0]}
      ></SeaWeed>
      <SeaWeed
        scale={[4, 4.5, 4]}
        position={[-0, -25, -10]}
        rotation={[0.1, 1.4, 0]}
      ></SeaWeed>
      <SeaWeed
        scale={[4, 4.5, 4]}
        position={[-14, -25, -9]}
        rotation={[0, 2, 0]}
      ></SeaWeed>
      <SeaWeed scale={[4, 4.5, 4]} position={[-5, -25, -10]}></SeaWeed>

      <Chest
        position={[-8, -24, 10]}
        scale={[1.5, 1.5, 1.5]}
        rotation={[0, 0.5, 0]}
      ></Chest>

      <FishGroup
        reset={reset}
        amount={amountOfFish}
        cohesion={cohesion}
        separation={separation}
        alignment={alignment}
        maxDistance={maxDistance}
        scale={[1.5, 1.5, 1.5]}
        clownExist={clownExist}
        stoneExist={stoneExist}
        breamExist={breamExist}
        blackExist={blackExist}
      ></FishGroup>
      <PerspectiveCamera
        position={[100, 50, 0]}
        near={0.01}
        far={1000}
        ref={cameraRef}
        makeDefault
      ></PerspectiveCamera>
      <OrbitControls
        target={[0, 3, 0]}
        camera={cameraRef.current}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={100}
        autoRotate={false}
        enablePan={false}
        enableRotate={true}
      ></OrbitControls>
      {hasPostProcessing && (
        <EffectComposer>
          <primitive
            object={goldLightMesh}
            position={[-8, -22, 10]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <primitive
            object={sunMesh}
            position={[100, 70, 50]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <GodRays
            sun={goldLightMesh}
            blendFunction={BlendFunction.SCREEN}
            samples={40}
            density={0.98}
            decay={0.98}
            weight={0.6}
            exposure={0.1}
            clampMax={1}
            width={Resizer.AUTO_SIZE}
            height={Resizer.AUTO_SIZE}
            kernelSize={KernelSize.SMALL}
            blur={0.25}
          />
          <GodRays
            sun={sunMesh}
            blendFunction={BlendFunction.SCREEN}
            samples={40}
            density={2}
            decay={0.99}
            weight={0.75}
            exposure={0.2}
            clampMax={1}
            width={Resizer.AUTO_SIZE}
            height={Resizer.AUTO_SIZE}
            kernelSize={KernelSize.SMALL}
            blur={0.25}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
};
