import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useGraph, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const WhiteSUV = (props) => {
  const groupRef = useRef();
  const { camera } = useThree();
  const { scene } = useGLTF("models/suv/white-suv.glb");
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
      <group
        position={[0.021, 0.108, -0.545]}
        rotation={[2.555, 0, Math.PI]}
        scale={[0.376, 0.574, 0.493]}
      >
        <mesh
          geometry={nodes.path0001_1.geometry}
          material={materials.PaletteMaterial002}
        />
        <mesh
          geometry={nodes.path0001_2.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.path0001_3.geometry}
          material={materials.PaletteMaterial001}
        />
      </group>
    </group>
  );
};

useGLTF.preload("models/suv/white-suv.glb");
export default WhiteSUV;
