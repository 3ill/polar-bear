import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import { useGraph, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useMemo, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { SkeletonUtils } from "three-stdlib";

const BlueTruck = (props) => {
  const groupRef = useRef();
  const { camera } = useThree();
  const { scene } = useGLTF("models/truck/blue-truck.glb");
  const clone = useMemo(() => {
    return SkeletonUtils.clone(scene);
  }, [scene]);

  const { nodes, materials } = useGraph(clone);
  const isSmall = useMediaQuery({
    maxWidth: 440,
  });

  const defaultPos = isSmall ? [0, -2, 0] : [0, -1.5, 0];

  useGSAP(() => {
    if (!groupRef.current) return;

    gsap.set(camera.position, {
      x: 0,
      y: 0,
      z: 27,
    });

    gsap.set(groupRef.current.position, {
      x: -30,
      y: defaultPos[1],
      z: defaultPos[2],
    });

    gsap.set(groupRef.current.rotation, {
      x: 0,
      y: Math.PI / 2,
      z: 0,
    });

    gsap.to(groupRef.current.position, {
      x: defaultPos[0],
      duration: 2.5,
      delay: 0.6,
      ease: "power3.out",
    });

    gsap.to(groupRef.current.rotation, {
      y: Math.PI / 1.9,
      duration: 2,
      delay: 0.4,
      ease: "power3.out",
    });
  }, [props.animationKey]);
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.material.geometry}
        material={materials["Material.002"]}
        rotation={[-Math.PI, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes.JAC_BACK.geometry}
        material={materials["Material.004"]}
        position={[-0.005, 0.009, -0.565]}
        rotation={[-1.615, 0, 0]}
        scale={[-0.101, -0.127, -0.033]}
      />
      <mesh
        geometry={nodes.Plane001.geometry}
        material={materials["Material.003"]}
        position={[-0.003, 0.02, 0.605]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.05, 2.831, 0.016]}
      />
      <mesh
        geometry={nodes.Plane004.geometry}
        material={materials["Material.001"]}
        position={[0.002, -0.008, 0.553]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.095, 0.145, 0.038]}
      />
    </group>
  );
};

useGLTF.preload("models/truck/blue-truck.glb");

export default BlueTruck;
