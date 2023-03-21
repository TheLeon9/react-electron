import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stats } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import styled from "styled-components";

export const StatsStyle = styled(Stats)`
  position: absolute !important;
  right: 0 !important;
  left: auto !important;
  width: 30%;
  display: flex;
  justify-content: space-around;
  canvas{
    display: block !important;
  }
`;
const Model = (props) => {
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    if (props.file !== "") {
      let file = props.file;
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function (event) {
          const gltfLoader = new GLTFLoader();
          gltfLoader.parse(event.target.result, "", function (gltf) {
            setGltf(gltf.scene);
          });
        },
        false
      );
      reader.readAsArrayBuffer(file);
    }
  }, [props.file]);

  return (
    <>
      <Canvas>
        <StatsStyle />
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <OrbitControls />
          {gltf && <primitive object={gltf} />}
          <Environment preset="night" background />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Model;
