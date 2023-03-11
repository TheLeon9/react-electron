import React, { useRef, useEffect, useState } from "react";
import Title from "../../components/Title";
import {
  P,
  Span,
  CanvaCont,
  GlobalCont,
  TextCont,
  LinkCont,
  StyledLink,
} from "./style/home.js";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const Home = () => {
  const [guiRef, setGui] = useState()
  const mount = useRef(null);
  // color for vertex
  const colors = [];
  // initial color
  let vertexR = 0;
  let vertexG = 0;
  let vertexB = 0.4;
  // color when hover
  let hoverColorR = 0.1;
  let hoverColorG = 0.4;
  let hoverColorB = 1;

  useEffect(() => {
    // GUI
    const gui = new dat.GUI();
    setGui(gui)
    let PlaneWidth = 400;
    let PlaneHeight = 400;
    let PlaneWidthSegments = 50;
    let PlaneHeightSegments = 50;
    const world = {
      plane: {
        width: PlaneHeight,
        height: PlaneWidth,
        widthSegments: PlaneWidthSegments,
        heightSegments: PlaneHeightSegments,
      },
    };

    // DATA GUI = controls on top right of your windows
    // change when change gui
    function generatePlane() {
      planeMesh.geometry.dispose();
      planeMesh.geometry = new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments
      );

      // vertice position randomization
      const { array } = planeMesh.geometry.attributes.position;
      const randomValues = [];
      for (let index = 0; index < array.length; index++) {
        if (index % 3 === 0) {
          const verticeX = array[index];
          const verticeY = array[index + 1];
          const verticeZ = array[index + 2];

          array[index] = verticeX + (Math.random() - 0.5) * 3;
          array[index + 1] = verticeY + (Math.random() - 0.5) * 3;
          array[index + 2] = verticeZ + (Math.random() - 0.5) * 5;
        }

        randomValues.push(Math.random() * Math.PI * 2);
      }
      planeMesh.geometry.attributes.position.randomValues = randomValues;
      planeMesh.geometry.attributes.position.originalPosition =
        planeMesh.geometry.attributes.position.array;

      // color attribute addition
      for (
        let index = 0;
        index < planeMesh.geometry.attributes.position.count;
        index++
      ) {
        colors.push(vertexR, vertexG, vertexB);
      }

      // add new attribute
      planeMesh.geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(colors), 3)
      );
    }
    let more = 50;
    let less = 20;
    gui.add(world.plane, "width", PlaneWidth).onChange(generatePlane);
    gui.add(world.plane, "height", PlaneHeight).onChange(generatePlane);
    gui
      .add(
        world.plane,
        "widthSegments",
        PlaneWidthSegments - less,
        PlaneWidthSegments + more
      )
      .onChange(generatePlane);
    gui
      .add(
        world.plane,
        "heightSegments",
        PlaneHeightSegments - less,
        PlaneHeightSegments + more
      )
      .onChange(generatePlane);

    // Raycaster
    const raycaster = new THREE.Raycaster();

    // Create the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    // no BACKGROUND on the canva
    // const renderer = new THREE.WebGLRenderer({ alpha: true });
    // renderer.setClearColor(0x000000, 0);

    // width / height
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    mount.current.appendChild(renderer.domElement);

    // Orbite Controle
    new OrbitControls(camera, renderer.domElement);

    // Position the camera
    camera.position.z = 50;

    //  Create the Plane
    const planeGeometry = new THREE.PlaneGeometry(
      PlaneWidth,
      PlaneHeight,
      PlaneWidthSegments,
      PlaneHeightSegments
    );
    const planeMaterial = new THREE.MeshPhongMaterial({
      // color: "cyan",
      side: THREE.DoubleSide,
      flatShading: true,
      vertexColors: true,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);
    generatePlane();
    // light
    const light = new THREE.DirectionalLight("white", 1);
    light.position.set(0, 1, 1);
    scene.add(light);

    const backLight = new THREE.DirectionalLight("white", 1);
    backLight.position.set(0, 0, -1);
    scene.add(backLight);

    // HOVER get mouse position
    const mouse = {
      x: undefined,
      y: undefined,
    };
    window.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    let frame = 0;
    // Render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      frame += 0.01;
      // planeMesh.rotation.x += 0.01;
      renderer.render(scene, camera);
      raycaster.setFromCamera(mouse, camera);

      const { array, originalPosition, randomValues } =
        planeMesh.geometry.attributes.position;
      for (let index = 0; index < array.length; index += 3) {
        array[index] =
          originalPosition[index] +
          Math.cos(frame + randomValues[index]) * 0.01;
        array[index + 1] =
          originalPosition[index + 1] +
          Math.sin(frame + randomValues[index]) * 0.001;
      }
      planeMesh.geometry.attributes.position.needsUpdate = true;

      const intersects = raycaster.intersectObject(planeMesh);
      if (intersects.length > 0) {
        // HOVER change color
        const { color } = intersects[0].object.geometry.attributes;
        // vertice
        //  x [1, 0, 0]
        //  y [0, 1, 0]
        //  z [0, 0, 1]
        // color when not hover
        const initialColor = {
          r: vertexR,
          g: vertexG,
          b: vertexB,
        };
        // color when hover
        const hoverColor = {
          r: hoverColorR,
          g: hoverColorG,
          b: hoverColorB,
        };
        gsap.to(hoverColor, {
          r: initialColor.r,
          g: initialColor.g,
          b: initialColor.b,
          duration: 1,
          onUpdate: () => {
            // vertice 1
            color.setX(intersects[0].face.a, hoverColor.r);
            color.setY(intersects[0].face.a, hoverColor.g);
            color.setZ(intersects[0].face.a, hoverColor.b);
            // vertice 2
            color.setX(intersects[0].face.b, hoverColor.r);
            color.setY(intersects[0].face.b, hoverColor.g);
            color.setZ(intersects[0].face.b, hoverColor.b);
            // vertice 3
            color.setX(intersects[0].face.c, hoverColor.r);
            color.setY(intersects[0].face.c, hoverColor.g);
            color.setZ(intersects[0].face.c, hoverColor.b);
            color.needsUpdate = true;
          },
        });
      }
    };
    animate();
  }, []);
  const handleClick = () => {
    guiRef.destroy();
    console.log("oui");
  };
  return (
    <GlobalCont>
      <TextCont>
        <Title margin_top={0} padding_bot={0} title="THE_LEON" />
        <P>
          First Project Made in<Span> Electron </Span>with<Span> ThreeJS </Span>
          and<Span> React </Span>
        </P>
        <LinkCont>
          <StyledLink to="/choose_folder" onClick={handleClick}>
            START
          </StyledLink>
        </LinkCont>
      </TextCont>
      <CanvaCont ref={mount} />
    </GlobalCont>
  );
};

export default Home;
