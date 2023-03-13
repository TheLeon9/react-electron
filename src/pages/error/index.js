import React, { useRef, useEffect } from "react";
import {
  GlobalCont,
  CanvaCont,
  TextCont,
  StyledLink,
  LinkCont,
  P,
  Span,
  Text,
  Title,
  TitleSpan,
} from "./style/error.js";

import * as THREE from "three";
import gsap from "gsap";
import Image from "./img/background.png";

const Error = () => {  
  useEffect(() => {
    const canvasCont = document.querySelector("#canvasCont");
    // Create the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      canvasCont.offsetWidth / canvasCont.offsetHeight,
      0.1,
      1000
    );
    // Position the camera
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.querySelector("canvas"),
    });
    // width / height
    renderer.setSize(canvasCont.offsetWidth, canvasCont.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // mount.current.appendChild(renderer.domElement);

    // texture
    const earthUV = new THREE.TextureLoader().load("./assets/img/earth.jpeg");
    // create sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50),
      // new THREE.MeshBasicMaterial({
      //   map: earthTexture,
      // })
      new THREE.ShaderMaterial({
        vertexShader: `
        varying vec2 vertexUV;
        varying vec3 vertexNormal;
          void main() {
            vertexUV = uv;
            vertexNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
          }
          
        `,
        fragmentShader: `
          uniform sampler2D earthTexture;
          varying vec2 vertexUV;
          varying vec3 vertexNormal;
          void main() {
            float intensity = 1.05 - dot(vertexNormal, vec3(0, 0, 1));
            vec3 atmosphere = vec3(0.2, 0.6 , 1) * pow(intensity, 1.5);
            gl_FragColor = vec4(atmosphere + texture2D(earthTexture, vertexUV).xyz, 1.0);
          }
        `,
        uniforms: {
          earthTexture: {
            value: earthUV,
          },
        },
      })
    );

    // create atmosphere
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader: `
        varying vec3 vertexNormal;
          void main() {
            vertexNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
          }
          
        `,
        fragmentShader: `
          varying vec3 vertexNormal;
          void main() {
            float intensity = pow(0.8 - dot(vertexNormal, vec3(0, 0, 1)), 2.0);
            gl_FragColor = vec4(0.2, 0.6, 1, 1) * intensity;
          }
        `,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      })
    );
    scene.add(atmosphere);
    atmosphere.scale.set(1.2, 1.2, 1.2);

    // group creation
    const group = new THREE.Group();
    group.add(sphere);
    scene.add(group);

    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
    });

    const starVertices = [];
    for (let index = 0; index < 2000; index++) {
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
    // Render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      sphere.rotation.y += 0.002;
      gsap.to(group.rotation, {
        x: -mouse.y * 0.3,
        y: mouse.x * 0.5,
        duration: 2,
      });
    };
    animate();
  }, []);
  return (
    <GlobalCont>
      <TextCont img={Image}>
        <Text>
          <Title><TitleSpan>4</TitleSpan>04</Title>
          <P>
            Sorry the page you are looking for as been <Span> Lost </Span>in
            <Span> Space </Span>
          </P>
          <LinkCont>
            <StyledLink to="/">HOME</StyledLink>
          </LinkCont>
        </Text>
      </TextCont>
      <CanvaCont id="canvasCont">
        <canvas></canvas>
      </CanvaCont>
    </GlobalCont>
  );
};

export default Error;
