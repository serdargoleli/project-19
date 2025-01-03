"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const HumanModel = ({ modelRef }) => {
  const threeContainerRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) return;

    const MODEL_PATH = "/stacy_lightweight.glb";

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe9ecef);
    sceneRef.current = scene;

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      10,
      threeContainerRef.current.clientWidth /
      threeContainerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 12);

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(
      threeContainerRef.current.clientWidth,
      threeContainerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    threeContainerRef.current.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scene.add(dirLight);

    // GLTFLoader - Model Load
    const loader = new GLTFLoader();
    loader.load(
      MODEL_PATH,
      (gltf) => {
        const model = gltf.scene;
        model.traverse((o) => {
          if (o.isMesh) {
            o.material = new THREE.MeshStandardMaterial({
              color: 0xf1f1f1,
              roughness: 0.6,
              metalness: 0.1
            });
            o.castShadow = true;
            o.receiveShadow = true;
          }
          if (o.isBone && o.name === "mixamorigNeck") {
            modelRef.current.neck = o;
          }
          if (o.isBone && o.name === "mixamorigSpine") {
            modelRef.current.waist = o;
          }
          if (o.isBone && o.name === "mixamorigChest") {
            modelRef.current.chest = o;
          }
          if (o.isBone && o.name === "mixamorigHips") {
            modelRef.current.hips = o;
          }
        });

        model.scale.set(1, 1, 1);
        model.position.set(0, -1, 0);
        scene.add(model);
        modelRef.current.model = model;
      },
      undefined,
      (error) => console.error(error)
    );

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <div
      className="three-container overflow-hidden border border-gray-200 rounded-xl cursor-grab"
      ref={threeContainerRef}
      style={{ height: "700px", background: "transparent" }}
    ></div>
  );
};

export default HumanModel;
