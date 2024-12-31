"use client";
import React, { useEffect, useRef } from "react";
import { useCustomFormik } from "@/helpers/FormikHelpers";
import { FormikProvider } from "formik";
import InputBox from "@/components/FormItems/InputBox";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const bodyMeasurementsInitial = {
  height: 165,
  weight: 50,
  chest: 90,
  waist: 70,
  hips: 95
};

const Dashboard = () => {
  const threeContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const modelRef = useRef({
    neck: null,
    waist: null,
    chest: null,
    mixer: null,
    model: null
  });

  const handleFormikSubmit = (values) => {
    const { height, weight, chest, waist, hips } = values;

    if (modelRef.current.model) {
      const model = modelRef.current.model;

      // Göğüs genişliği
      if (modelRef.current.chest) {
        const chestScale = 1 + (chest - 90) / 100 + weight * 0.002; // Göğüs genişliği
        modelRef.current.chest.scale.x = chestScale; // Genişlik
        modelRef.current.chest.scale.z = chestScale; // Derinlik
      }

      // Bel genişliği
      if (modelRef.current.waist) {
        const waistScale = 1 + (waist - 70) / 100 + weight * 0.0015; // Bel genişliği
        modelRef.current.waist.scale.x = waistScale; // Genişlik
        modelRef.current.waist.scale.z = waistScale; // Derinlik
      }

      // Kalça genişliği
      if (modelRef.current.hips) {
        const hipsScale = 1 + (hips - 95) / 100 + weight * 0.002; // Kalça genişliği
        modelRef.current.hips.scale.x = hipsScale; // Genişlik
        modelRef.current.hips.scale.z = hipsScale; // Derinlik
      }

      // Boy uzunluğu
      const heightScale = height / 165; // Boy oranı
      model.scale.set(1, heightScale, 1); // Boy uzunluğu
    }
  };

  useEffect(() => {
    if (sceneRef.current) return;

    const MODEL_PATH = "/stacy_lightweight.glb";

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = "0xf3f3f3"; // Arka plan kaldırıldı
    sceneRef.current = scene;

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      10,
      threeContainerRef.current.clientWidth /
      threeContainerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 12); // Kamera pozisyonu

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
              color: 0xf0c090, // Ten rengine yakın bir renk
              roughness: 0.6,
              metalness: 0.1
            });
            o.castShadow = true;
            o.receiveShadow = true;
          }
          if (o.isBone && o.name === "mixamorigNeck") {
            modelRef.current.neck = o; // Sadece kafa için
          }
          if (o.isBone && o.name === "mixamorigSpine") {
            modelRef.current.waist = o; // Bel
          }
          if (o.isBone && o.name === "mixamorigChest") {
            modelRef.current.chest = o; // Göğüs
          }
          if (o.isBone && o.name === "mixamorigHips") {
            modelRef.current.hips = o; // Kalça
          }
        });

        model.scale.set(1, 1, 1); // Başlangıç boyutu normal
        model.position.set(0, -1, 0); // Model pozisyonu
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

  const formik = useCustomFormik(bodyMeasurementsInitial, handleFormikSubmit);

  return (
    <div className="home-page grid grid-cols-3 gap-8">
      <div className="col-span-1">
        <div className="form-group p-12 bg-white border border-gray-200 rounded-xl">
          <h1 className="text-2xl font-semibold mb-8">Vücut ölçülerinizi Giriniz</h1>
          <FormikProvider value={formik}>
            <InputBox label="Boy (cm)" inputName="height" type="number" />
            <InputBox label="Kilo (kg)" inputName="weight" type="number" />

            <InputBox label="Göğüs Çevresi (mm)" inputName="chest" type="number" />
            <InputBox label="Bel Çevresi (mm)" inputName="waist" type="number" />
            <InputBox label="Kalça Çevresi (mm)" inputName="hips" type="number" />

            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    onClick={() => formik.handleSubmit()}>
              Güncelle
            </button>
          </FormikProvider>
        </div>
      </div>
      <div className="col-span-2">
        <div className="three-container" ref={threeContainerRef} style={{ height: "700px", background: "transparent" }}
        ></div>
      </div>
    </div>
  );
};

export default Dashboard;
