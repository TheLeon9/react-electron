import React, { useRef, useEffect, useState } from "react";
import {
  CanvaCont,
  GlobalCont,
  TextCont,
  FadingTextCont,
} from "./style/home.js";
import * as THREE from "three";
import * as dat from "dat.gui";
import gsap from "gsap";
import TextComposant from "./textComposant.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [guiRef, setGui] = useState();
  const [showText, setShowText] = useState(true);
  const [linkClick, setLinkClick] = useState(false);
  const navigate = useNavigate();

  const mount = useRef(null);

  useEffect(() => {
    // GUI
    // DATA GUI = controls on top right of your windows
    const gui = new dat.GUI();
    setGui(gui);
    const SizeFolder = gui.addFolder("Size");
    const ColorFolder = gui.addFolder("Plane Color");
    const HoverColorFolder = gui.addFolder("Hover Color");
    let PlaneWidth = 400;
    let PlaneHeight = 400;
    let PlaneWidthSegments = 50;
    let PlaneHeightSegments = 50;
    const world = {
      // plane size
      plane: {
        widthSegments: PlaneWidthSegments,
        heightSegments: PlaneHeightSegments,
      },
      // initial color
      initialColorGui: {
        Red: 0,
        Green: 0,
        Blue: 0.4,
      },
      // color when hover
      hoverColorGui: {
        Red: 0.1,
        Green: 0.4,
        Blue: 1,
      },
    };

    // change when change gui
    function generatePlane() {
      planeMesh.geometry.dispose();
      planeMesh.geometry = new THREE.PlaneGeometry(
        PlaneWidth,
        PlaneHeight,
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
      // color for vertex
      const colors = [];
      // color attribute addition
      for (
        let index = 0;
        index < planeMesh.geometry.attributes.position.count;
        index++
      ) {
        colors.push(
          world.initialColorGui.Red,
          world.initialColorGui.Green,
          world.initialColorGui.Blue
        );
      }

      // add new attribute
      planeMesh.geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(colors), 3)
      );
    }
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
    // Position the camera
    camera.position.z = 50;
    const renderer = new THREE.WebGLRenderer();

    // width / height
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.current.appendChild(renderer.domElement);

    //  Create the Plane
    const planeGeometry = new THREE.PlaneGeometry(
      PlaneWidth,
      PlaneHeight,
      PlaneWidthSegments,
      PlaneHeightSegments
    );
    const planeMaterial = new THREE.MeshPhongMaterial({
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

    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
    });

    const starVertices = [];
    for (let index = 0; index < 4000; index++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const stars = new THREE.Points(starGeometry, starMaterial);
    stars.rotation.x = 2;
    scene.add(stars);

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
          r: world.initialColorGui.Red,
          g: world.initialColorGui.Green,
          b: world.initialColorGui.Blue,
        };
        // color when hover
        const hoverColor = {
          r: world.hoverColorGui.Red,
          g: world.hoverColorGui.Green,
          b: world.hoverColorGui.Blue,
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
    // size folder
    let more = 20;
    let less = 20;
    SizeFolder.add(
      world.plane,
      "widthSegments",
      PlaneWidthSegments - less,
      PlaneWidthSegments + more
    ).onChange(generatePlane);
    SizeFolder.add(
      world.plane,
      "heightSegments",
      PlaneHeightSegments - less,
      PlaneHeightSegments + more
    ).onChange(generatePlane);
    SizeFolder.open()
    // color folder
    ColorFolder.add(world.initialColorGui, "Red", 0, 1).onChange(generatePlane);
    ColorFolder.add(world.initialColorGui, "Green", 0, 1).onChange(generatePlane);
    ColorFolder.add(world.initialColorGui, "Blue", 0, 1).onChange(generatePlane);
    ColorFolder.open()
    // hover color folder
    HoverColorFolder.add(world.hoverColorGui, "Red", 0, 1).onChange();
    HoverColorFolder.add(world.hoverColorGui, "Green", 0, 1).onChange();
    HoverColorFolder.add(world.hoverColorGui, "Blue", 0, 1).onChange();
    HoverColorFolder.open()

    const handleClickAnimationCamera = () => {
      gsap.to(camera.rotation, {
        duration: 2,
        x: 1.5,
        onComplete: () => {
          gsap.to(camera.position, {
            duration: 2,
            y: 400,
          });
        },
      });
    };

    document.getElementById("Button").addEventListener("click", handleClickAnimationCamera);
  }, []);

  useEffect(() => {
    if (linkClick) {
      // destroy GUI = control panel
      guiRef.destroy();
      setShowText(false);
      const delayTime = 3800;
      setTimeout(() => {
        navigate("/choose_folder");
      }, delayTime);
    }
  }, [linkClick, guiRef, navigate]);

  return (
    <GlobalCont>
      {showText ? (
        <TextCont show={showText}>
          <TextComposant
            setLinkClick={setLinkClick}
          />
        </TextCont>
      ) : (
        <FadingTextCont>
          <TextComposant />
        </FadingTextCont>
      )}
      <CanvaCont ref={mount} />
    </GlobalCont>
  );
};

export default Home;
