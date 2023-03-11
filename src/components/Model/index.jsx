import React, { useEffect, useState } from "react";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import { useGLTF } from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


// const Model = () => {
//   const [gltf, setGltf] = useState(null);

//   const openDialog = () => {
//     window.dialog.open();
//     window.dialog.getFilePath((filePaths) => {
//       const filePath = filePaths;
//       console.log(filePath);
//       const reader = new FileReader();

//       reader.addEventListener('load', function (event) {
//         const gltfLoader = new GLTFLoader();
//         gltfLoader.parse(event.target.result, '', function (gltf) {
//           setGltf(gltf.scene);
//         });
//       }, false);

//       reader.readAsArrayBuffer(filePath);
//     });
//   };

//   return (
//     <>
//       <button onClick={openDialog}>Open File Dialog</button>
//       {gltf && 
//           <Canvas>
//           <Suspense fallback={null}>
//             <primitive object={gltf} />
//             <OrbitControls />
//             <ambientLight intensity={1} />
//             <Environment preset="sunset" background />
//           </Suspense>
//         </Canvas>
//       }
//     </>
//   );
// }

const Model = () => {
  const [gltf, setGltf] = useState(null);

  const openDialog = () => {
    window.dialog.open();
    window.dialog.getFilePath((filePaths) => {
      // path
      let filePath = filePaths.split("//")[1];
      console.log(filePath);
      console.log(typeof filePath);
      // name
      let name = filePath.split("\\");
      let fileName = name[name.length - 1];
      // blob
      const file = new File([filePath], [fileName],{ type: 'model/gltf+json' });
      const reader = new FileReader();

      reader.addEventListener('load', function (event) {
        const gltfLoader = new GLTFLoader();
        gltfLoader.parse(event.target.result, '', function (gltf) {
          setGltf(gltf.scene);
        });
      }, false);
      console.log(file);
      reader.readAsArrayBuffer(file);
    });
  };
  return (
    <>
      <button onClick={openDialog}>Open File Dialog</button>
      {gltf && 
          <Canvas>
          <Suspense fallback={null}>
            <primitive object={gltf} />
            <OrbitControls />
            <ambientLight intensity={1} />
            <Environment preset="sunset" background />
          </Suspense>
        </Canvas>
      }
    </>
  );
}



// const Model = () => {
//     const [gltf, setGltf] = useState(null);
  
//     const loadGLTF = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.addEventListener('load', function (event) {
//         const gltfLoader = new GLTFLoader();
//         gltfLoader.parse(event.target.result, '', function (gltf) {
//             setGltf(gltf.scene);
//           });
//         }, false);
//         console.log(file);
//         reader.readAsArrayBuffer(file);
//       };
    
//         return (
//             <>
//       <input type="file" onChange={loadGLTF} />
//       {gltf && 
//                   <Canvas>
//                   <Suspense fallback={null}>
//                     <primitive object={gltf} />
//                     <OrbitControls />
//                     <ambientLight intensity={1} />
//                     <Environment preset="sunset" background />
//                   </Suspense>
//                 </Canvas>
//       }
//     </>
//   );
// }


export default Model;
