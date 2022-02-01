import React, { useState } from "react";
import Challenges from "./Challenges/Challenges.jsx";
import Game2 from "./Challenges/Game2.jsx";
import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import CANNON, { Vec3 } from "cannon";
import "../style/test.css";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { Link } from "react-router-dom";
import "../style/test.css";
import DnD from "./Challenges/dragAndDrop/DnD.jsx";
import DnDEnglish from "./Challenges/English_challenge/DnD-eng.jsx";
import axios from "axios";
import DnDBasket from "./Challenges/dragAndDrop/dndBasket/BasketChallenge.jsx";
import CubeTowerGame from "./CubeTowerGame"

// import EngDnD from "./Challenges/English_challenge/DnD.jsx"
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// const gui = new dat.GUI();
const Vis = () => {
	const { useRef, useEffect, useState, useMemo } = React;
	const mount = useRef(null);
	const [user, setUser] = useState(null);
	const [image, setImage] = useState(1);

	const session = () =>
		JSON.parse(localStorage.getItem("user"))
			? setUser(JSON.parse(localStorage.getItem("user")))
			: setUser(null);

	const logout = () => {
		localStorage.removeItem("user");
		setUser(null);
	};
	// const controls = useRef(null);
	const [task, settask] = useState("zero");
  const [level, setlevel] = useState(0);

	function close() {
		settask(true);
		// console.log(task);
	}
	useMemo(() => {
		if (!user) {
			session();
		}
	});

	useEffect(() => {
		
		var carPositionX;
		var carPositionz;
		var currentlevel = user.level;
		if (currentlevel === 1) {
			carPositionX = 24;
			carPositionz = 16.66;
		} else if (currentlevel === 2) {
			carPositionX = 69.07;
			carPositionz = -53.2;
		} else if (currentlevel === 3) {
			carPositionX = 6.15;
			carPositionz = -109.2;
		}

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
		// Scene
		const scene = new THREE.Scene();
		//Models

		let mixer = null;
		let mixer1 = null;
		let mixer2 = null;
		let mixer3 = null;
		let mixer4 = null;
		let mixer5 = null;
		let mixer6 = null;
		let mixer7 = null;
		let mixer8 = null;
		let mixer9 = null;
		let mixer10 = null;
		let mixer11 = null;
		let mixer12 = null;
		let mixer13 = null;
		let mixer14 = null;
		let mixer15 = null;
		let mixer16 = null;
		let mixer17 = null;
		let mixer18 = null;

		// Models
		//adding the old man
		const loader = new FBXLoader();
		loader.load(
			"/src/components/static/models/Look Around.fbx",
			function (object) {
				mixer1 = new THREE.AnimationMixer(object);
				const action = mixer1.clipAction(object.animations[0]);
				action.play();

				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.set(46, 0, -7.1);
				object.scale.set(0.01, 0.01, 0.01);
				object.rotation.set(0, 11, 0);
				scene.add(object);
				// const cubeFolder1 = gui.addFolder('position')
				// cubeFolder1.add(object.position, 'x')
				// cubeFolder1.add(object.position, 'y')
				// cubeFolder1.add(object.position, 'z')
				// cubeFolder1.open()
				// const cubeFolder = gui.addFolder('scale')
				// cubeFolder.add(object.rotation, 'x')
				// cubeFolder.add(object.rotation, 'y')
				// cubeFolder.add(object.rotation, 'z')
				// cubeFolder.open()
				// const cubeFolder2 = gui.addFolder('rotation')
				// cubeFolder2.add(object.rotation, 'x')
				// cubeFolder2.add(object.rotation, 'y')
				// cubeFolder2.add(object.rotation, 'z')
				// cubeFolder2.open()
			}
		);
		loader.load(
			"/src/components/static/models/Dwarf Idle.fbx",
			function (object) {
				mixer4 = new THREE.AnimationMixer(object);
				const action = mixer4.clipAction(object.animations[0]);
				action.play();

				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.set(70, 0, -55);
				object.scale.set(0.01, 0.01, 0.01);
				object.rotation.set(0, 12, 0);
				scene.add(object);
			}
		);
		loader.load(
			"/src/components/static/models/Old Man Idle.fbx",
			function (object) {
				mixer3 = new THREE.AnimationMixer(object);
				const action = mixer3.clipAction(object.animations[0]);
				action.play();

				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.set(5, 0, -111);
				object.scale.set(0.02, 0.02, 0.02);
				object.rotation.set(0, 13, 0);
				scene.add(object);
			}
		);
		loader.load(
			"/src/components/static/models/Angry.fbx",
			function (object) {
				mixer6 = new THREE.AnimationMixer(object);
				const action = mixer6.clipAction(object.animations[0]);
				action.play();

				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.set(-117, 0, -147);
				object.scale.set(0.02, 0.02, 0.02);
				object.rotation.set(0, 7, 0);
				scene.add(object);
			}
		);
		loader.load(
			"/src/components/static/models/sailor.fbx",
			function (object) {
				mixer5 = new THREE.AnimationMixer(object);
				const action = mixer5.clipAction(object.animations[0]);
				action.play();

				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.set(20, 0, -177);
				object.scale.set(0.015, 0.015, 0.015);
				object.rotation.set(0, 5.5, 0);
				scene.add(object);
			}
		);
		loader.load(
			"/src/components/static/models/jerryExcited.fbx",
			function (object) {
				mixer7 = new THREE.AnimationMixer(object);
				const action = mixer7.clipAction(object.animations[0]);
				action.play();

				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.set(-81, 0, -63);
				object.scale.set(0.02, 0.02, 0.02);
				object.rotation.set(0, 10, 0);
				scene.add(object);
			}
		);
		loader.load(
			"/src/components/static/models/jerryhiphop.fbx",
			function (object) {
				mixer8 = new THREE.AnimationMixer(object);
				const action = mixer8.clipAction(object.animations[0]);
				action.play();

				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.set(-116, 0, -55);
				object.scale.set(0.02, 0.02, 0.02);
				object.rotation.set(0, 8, 0);
				scene.add(object);
			}
		);
		loader.load(
			"/src/components/static/models/jerryyamyel.fbx",
			function (object) {
				mixer9 = new THREE.AnimationMixer(object);
				const action = mixer9.clipAction(object.animations[0]);
				action.play();

				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.set(-134, 0, -88);
				object.scale.set(0.02, 0.02, 0.02);
				object.rotation.set(0, 7, 0);
				scene.add(object);
			}
		);
		// loader.load(
		// 	"/src/components/static/models/jerryyamyel.fbx",
		// 	function (object) {
		// 		mixer10 = new THREE.AnimationMixer(object);
		// 		const action = mixer10.clipAction(object.animations[0]);
		// 		action.play();

		// 		object.traverse(function (child) {
		// 			if (child.isMesh) {
		// 				child.castShadow = true;
		// 				child.receiveShadow = true;
		// 			}
		// 		});
		// 		object.position.set(-95, 0, -106);
		// 		object.scale.set(0.02, 0.02, 0.02);
		// 		object.rotation.set(0, 6, 0);
		// 		scene.add(object);
		// 		// const cubeFolder1 = gui.addFolder('position')
		// 		// cubeFolder1.add(object.position, 'x')
		// 		// cubeFolder1.add(object.position, 'y')
		// 		// cubeFolder1.add(object.position, 'z')
		// 		// cubeFolder1.open()
		// 		// const cubeFolder = gui.addFolder('scale')
		// 		// cubeFolder.add(object.scale, 'x')
		// 		// cubeFolder.add(object.scale, 'y')
		// 		// cubeFolder.add(object.scale, 'z')
		// 		// cubeFolder.open()
		// 		// const cubeFolder2 = gui.addFolder('rotation')
		// 		// cubeFolder2.add(object.rotation, 'x')
		// 		// cubeFolder2.add(object.rotation, 'y')
		// 		// cubeFolder2.add(object.rotation, 'z')
		// 		// cubeFolder2.open()
		// 	}
		// );
		loader.load(
			"/src/components/static/models/ARROWRED.fbx",
			function (object) {
				mixer11 = new THREE.AnimationMixer(object);
				const action = mixer11.clipAction(object.animations[0]);
				action.play();
				
				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
        object.position.set(70, -0.5, -55);
				object.scale.set(0.01, 0.01, 0.01);
				object.rotation.set(0, 6, 0);
				scene.add(object);
				// const cubeFolder1 = gui.addFolder("position");
				// cubeFolder1.add(object.position, "x");
				// cubeFolder1.add(object.position, "y");
				// cubeFolder1.add(object.position, "z");
				// cubeFolder1.open();
				// const cubeFolder = gui.addFolder("scale");
				// cubeFolder.add(object.scale, "x");
				// cubeFolder.add(object.scale, "y");
				// cubeFolder.add(object.scale, "z");
				// cubeFolder.open();
				// const cubeFolder2 = gui.addFolder("rotation");
				// cubeFolder2.add(object.rotation, "x");
				// cubeFolder2.add(object.rotation, "y");
				// cubeFolder2.add(object.rotation, "z");
				// cubeFolder2.open();
			}
		);
    loader.load(
			"/src/components/static/models/ARROW.fbx",
			function (object) {
				mixer12 = new THREE.AnimationMixer(object);
				const action = mixer12.clipAction(object.animations[1]);
				action.play();
				
				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.x = 46;
				object.position.z = -7.1;
				object.position.y = -0.5;
				object.scale.set(0.01, 0.01, 0.01);
				object.rotation.set(0, 6, 0);
				scene.add(object);
			}
		);
    loader.load(
			"/src/components/static/models/ARROW.fbx",
			function (object) {
				mixer13 = new THREE.AnimationMixer(object);
				const action = mixer13.clipAction(object.animations[1]);
				action.play();
				
				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
        object.position.set(5, 0.5, -111);
				object.scale.set(0.01, 0.01, 0.01);
				object.rotation.set(0, 7, 0);
				scene.add(object);
			}
		);
    loader.load(
			"/src/components/static/models/ARROWRED.fbx",
			function (object) {
				mixer14 = new THREE.AnimationMixer(object);
				const action = mixer14.clipAction(object.animations[0]);
				action.play();
				
				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.set(-81, 0.5, -63);
				object.scale.set(0.01, 0.01, 0.01);
				object.rotation.set(0, 7, 0);
				scene.add(object);
    
			}
		);
    
    loader.load(
			"/src/components/static/models/ARROW.fbx",
			function (object) {
				mixer15 = new THREE.AnimationMixer(object);
				const action = mixer15.clipAction(object.animations[1]);
				action.play();
				
				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
        object.position.set(-116, 0.5, -55);
				object.scale.set(0.01, 0.01, 0.01);
				object.rotation.set(0, 7, 0);
				scene.add(object);
			}
		);
    loader.load(
			"/src/components/static/models/ARROWRED.fbx",
			function (object) {
				mixer16 = new THREE.AnimationMixer(object);
				const action = mixer16.clipAction(object.animations[0]);
				action.play();
			
				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.set(-134, 0.5, -88);
				object.scale.set(0.01, 0.01, 0.01);
				object.rotation.set(0, 7, 0);
				scene.add(object);
    
			}
		);
    loader.load(
			"/src/components/static/models/ARROW.fbx",
			function (object) {
				mixer17 = new THREE.AnimationMixer(object);
				const action = mixer17.clipAction(object.animations[1]);
				action.play();
				
				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
        object.position.set(-117, 0.9, -147);
				object.scale.set(0.01, 0.01, 0.01);
				object.rotation.set(0, 7, 0);
				scene.add(object);
  
			}
		);
    loader.load(
			"/src/components/static/models/ARROWRED.fbx",
			function (object) {
				mixer18 = new THREE.AnimationMixer(object);
				const action = mixer18.clipAction(object.animations[0]);
				action.play();
				
				object.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				object.position.set(20, 0.7, -177);
				object.scale.set(0.01, 0.01, 0.01);
				object.rotation.set(0, 8, 0);
				scene.add(object)
			}
		);
		// function passmesh(mesh){
		//     mixer2.push(mesh)
		//     console.log(mixer2);}
		// loader.load(
		// 	"/src/components/static/models/offroadcar.fbx",
		// 	function (object) {
		//         mixer2=object
		//         object.scale.set(0.007, 0.007, 0.007);
		//         mixer2=object
		// 		scene.add(object);
		//         passmesh(object)
		// 	}
		// );

		//adding the scene
		const gltfLoader = new GLTFLoader();
		gltfLoader.load("/src/all models/wholescene.glb", function (gltf) {
			gltf.scene.position.set(0, 0, 3);
			gltf.scene.scale.set(1, 1, 1);
			gltf.scene.traverse(function (child) {
				if (child.isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
			gltf.scene.traverse((child) => {
				if (child.type == "SkinnedMesh") {
					child.frustumCulled = false;
				}
			});
			scene.add(gltf.scene);
		});
		//adding the car
		gltfLoader.load(
			"/src/components/static/models/car.glb",
			function (gltf) {
				mixer2 = gltf.scene;
				gltf.scene.position.copy(box.position);
				gltf.scene.rotation.y = 102.1;

				// object.rotateY(-Math.PI/2)
				gltf.scene.scale.set(1, 1, 1);
				scene.add(gltf.scene);
				// const cubeFolder1 = gui.addFolder('position')
				// cubeFolder1.add(object.position, 'x')
				// cubeFolder1.add(object.position, 'y')
				// cubeFolder1.add(object.position, 'z')
				// cubeFolder1.open()
				// const cubeFolder = gui.addFolder('scale')
				// cubeFolder.add(object.rotation, 'x')
				// cubeFolder.add(object.rotation, 'y')
				// cubeFolder.add(object.rotation, 'z')
				// cubeFolder.open()
				// const cubeFolder2 = gui.addFolder('rotation')
				// cubeFolder2.add(object.rotation, 'x')
				// cubeFolder2.add(object.rotation, 'y')
				// cubeFolder2.add(object.rotation, 'z')
				// cubeFolder2.open()
			}
		);
		//grass
		// gltfLoader.load(
		//     "/src/all models/floor.glb",
		//     function ( gltf ) {
		//         gltf.scene.position.set(0, 0.2, 3);
		//         gltf.scene.scale.set(1, 1, 1);
		//         const cubeFolder1 = gui.addFolder('position')
		//         cubeFolder1.add(gltf.scene.position, 'x')
		//         cubeFolder1.add(gltf.scene.position, 'y')
		//         cubeFolder1.add(gltf.scene.position, 'z')
		//         cubeFolder1.open()
		//         const cubeFolder = gui.addFolder('scale')
		//         cubeFolder.add(gltf.scene.scale, 'x')
		//         cubeFolder.add(gltf.scene.scale, 'y')
		//         cubeFolder.add(gltf.scene.scale, 'z')
		//         cubeFolder.open()
		//         const cubeFolder2 = gui.addFolder('rotation')
		//         cubeFolder2.add(gltf.scene.rotation, 'x')
		//         cubeFolder2.add(gltf.scene.rotation, 'y')
		//         cubeFolder2.add(gltf.scene.rotation, 'z')
		//         cubeFolder2.open()
		//         scene.add( gltf.scene );

		//     },)
		//village
		//  gltfLoader.load(
		//     "/src/all models/village.glb",
		//     function ( gltf ) {
		//         gltf.scene.position.set(65, 0, 0);
		//         gltf.scene.scale.set(0.5, 0.5, 0.5);
		//         const cubeFolder1 = gui.addFolder('position')
		//         cubeFolder1.add(gltf.scene.position, 'x')
		//         cubeFolder1.add(gltf.scene.position, 'y')
		//         cubeFolder1.add(gltf.scene.position, 'z')
		//         cubeFolder1.open()
		//         const cubeFolder = gui.addFolder('scale')
		//         cubeFolder.add(gltf.scene.scale, 'x')
		//         cubeFolder.add(gltf.scene.scale, 'y')
		//         cubeFolder.add(gltf.scene.scale, 'z')
		//         cubeFolder.open()
		//         const cubeFolder2 = gui.addFolder('rotation')
		//         cubeFolder2.add(gltf.scene.rotation, 'x')
		//         cubeFolder2.add(gltf.scene.rotation, 'y')
		//         cubeFolder2.add(gltf.scene.rotation, 'z')
		//         cubeFolder2.open()
		//         scene.add( gltf.scene );

		//     },)
		//Road
		// gltfLoader.load(
		//     "/src/all models/Road.gltf",
		//     function ( gltf ) {
		//         gltf.scene.position.set(1.6,-4.4,-2)
		//         gltf.scene.scale.set(0.79, 2.02, 0.59);
		//         gltf.scene.rotation.set(0,0.4,0)
		//         scene.add( gltf.scene );

		//     },
		// );
		// gltfLoader.load(
		//     "/src/all models/Road.gltf",
		//     function ( gltf ) {
		//         gltf.scene.position.set(2.4,-4.3,7.3)
		//         gltf.scene.scale.set(0.79, 2, 0.59);
		//         gltf.scene.rotation.set(0,-0.04,0)
		//         scene.add( gltf.scene );
		//     },
		//     );
		//     gltfLoader.load(
		//     "/src/all models/Road.gltf",
		//     function ( gltf ) {
		//         gltf.scene.position.set(3.1,-4.4,2.8)
		//         gltf.scene.scale.set(0.79, 2.02, 0.59);
		//         gltf.scene.rotation.set(0,0.11,0)
		//         scene.add( gltf.scene );

		//     },
		// );
		// gltfLoader.load(
		//     "/src/all models/Road.gltf",
		//     function ( gltf ) {
		//         gltf.scene.position.set(-2,-4.3,3.7)
		//         gltf.scene.scale.set(1.12, 2, 0.59);
		//         gltf.scene.rotation.set(0,1.005,0)
		//         scene.add( gltf.scene );

		//     },
		// );
		// //Rocks
		// gltfLoader.load(
		//     "/src/all models/rock1.gltf",
		//     function ( gltf ) {
		//         gltf.scene.position.set(-18, -10.5, 14.3);
		//         gltf.scene.scale.set(0.7, 0.7, 0.7);
		//         scene.add( gltf.scene );

		//     },
		// );
		// gltfLoader.load(
		//     "/src/all models/rock2.gltf",
		//     function ( gltf ) {
		//         console.log(gltf);
		// 		gltf.scene.position.set(-15, -3, 24.9);
		//         gltf.scene.scale.set(0.8, 0.8, 0.8);
		//         gltf.scene.rotation.set(17, 6, 0);

		//         scene.add( gltf.scene );

		//     },
		// );
		// gltfLoader.load(
		//     "/src/all models/rock3.gltf",
		//     function ( gltf ) {
		//         console.log(gltf);
		//         gltf.scene.position.set(-58, 0, -29.6);
		// 		gltf.scene.scale.set(3, 3, 3);

		//         scene.add( gltf.scene );

		//     },
		// );
		// //mountain
		// gltfLoader.load(
		//     "/src/all models/mountain.glb",
		//     function ( gltf ) {
		//         console.log(gltf);
		//         gltf.scene.position.set(-55, 2, 39.5);
		// 		gltf.scene.scale.set(1, 1, 1);
		//         gltf.scene.rotation.set(0,13,0)

		//         scene.add( gltf.scene );

		//     },
		// );
		//grass
		const grass = new THREE.Group();
		scene.add(grass);
		for (let i = 0; i < 1000; i++) {
			gltfLoader.load("/src/all models/grass.gltf", function (gltf) {
				const angle = Math.random() * Math.PI * 80;
				const radius = 3 + Math.random() * 100;
				gltf.scene.position.set(
					Math.sin(angle) * radius,
					0,
					Math.cos(angle) * radius
				);
				gltf.scene.scale.set(0.5, 0.5, 0.5);
				grass.add(gltf.scene);
			});
		}
		//flowers
		const flowers = new THREE.Group();
		scene.add(flowers);
		for (let i = 0; i < 1000; i++) {
			gltfLoader.load("/src/all models/flowers1.gltf", function (gltf) {
				const angle = Math.random() * Math.PI * 80;
				const radius = 3 + Math.random() * 100;
				gltf.scene.position.set(
					Math.sin(angle) * radius,
					0,
					Math.cos(angle) * radius
				);
				gltf.scene.scale.set(0.5, 0.5, 0.5);
				grass.add(gltf.scene);
			});
		}
		//mushroms
		const mushroms = new THREE.Group();
		scene.add(mushroms);
		for (let i = 0; i < 300; i++) {
			gltfLoader.load("/src/all models/mushrom.gltf", function (gltf) {
				const angle = Math.random() * Math.PI * 80;
				const radius = 3 + Math.random() * 100;
				gltf.scene.position.set(
					Math.sin(angle) * radius,
					0,
					Math.cos(angle) * radius
				);
				gltf.scene.scale.set(0.3, 0.3, 0.3);
				grass.add(gltf.scene);
			});
		}

		// trees
		gltfLoader.load("/src/all models/trees1.gltf", function (gltf) {
			gltf.scene.position.set(32, 0, 19.6);
			gltf.scene.scale.set(1, 1, 1);

			scene.add(gltf.scene);
		});

		gltfLoader.load("/src/all models/trees2.glb", function (gltf) {
			gltf.scene.position.set(0, 0, 3);
			gltf.scene.scale.set(1, 1, 1);

			scene.add(gltf.scene);
			//           const cubeFolder1 = gui.addFolder('position')
			// cubeFolder1.add(gltf.scene.position, 'x')
			// cubeFolder1.add(gltf.scene.position, 'y')
			// cubeFolder1.add(gltf.scene.position, 'z')
			// cubeFolder1.open()
			// const cubeFolder = gui.addFolder('scale')
			// cubeFolder.add(gltf.scene.scale, 'x')
			// cubeFolder.add(gltf.scene.scale, 'y')
			// cubeFolder.add(gltf.scene.scale, 'z')
			// cubeFolder.open()
			// const cubeFolder2 = gui.addFolder('rotation')
			// cubeFolder2.add(gltf.scene.rotation, 'x')
			// cubeFolder2.add(gltf.scene.rotation, 'y')
			// cubeFolder2.add(gltf.scene.rotation, 'z')
			// cubeFolder2.open()
		});
		//a little scene
		gltfLoader.load("/src/all models/littleScene.glb", function (gltf) {
			gltf.scene.position.set(4, 0, -24.8);
			gltf.scene.scale.set(1, 1, 1);

			scene.add(gltf.scene);
		});
		//ruins
		// gltfLoader.load(
		//     "/src/all models/ruins.glb",
		//     function ( gltf ) {

		//         gltf.scene.position.set(-15, 0, 58.1);
		// 		gltf.scene.scale.set(1, 1, 1);

		//                   scene.add( gltf.scene );
		//     },
		// );
		//offroad car
		// loaderG.load(
		// 	"/src/components/static/models/offroadcar.fbx",
		// 	function (object) {
		// 		mixer2 = object;
		// 		object.position.copy(player.position);
		// 		// object.rotateY(-Math.PI/2)
		// 		object.scale.set(0.003, 0.003, 0.003);
		// 		scene.add(object);
		// 	}
		// );

		//texture
		// Sky background
		var sky = new Sky();
		sky.scale.setScalar(450000);
		scene.add(sky);

		var sun = new THREE.Vector3();

		const effectController = {
			turbidity: 10,
			rayleigh: 3,
			mieCoefficient: 0.005,
			mieDirectionalG: 0.7,
			elevation: 2,
			azimuth: 180,
			exposure: renderer.toneMappingExposure,
		};

		function guiChanged() {
			const uniforms = sky.material.uniforms;
			uniforms["turbidity"].value = effectController.turbidity;
			uniforms["rayleigh"].value = effectController.rayleigh;
			uniforms["mieCoefficient"].value = effectController.mieCoefficient;
			uniforms["mieDirectionalG"].value =
				effectController.mieDirectionalG;

			const phi = THREE.MathUtils.degToRad(
				90 - effectController.elevation
			);
			const theta = THREE.MathUtils.degToRad(effectController.azimuth);

			sun.setFromSphericalCoords(1, phi, theta);

			uniforms["sunPosition"].value.copy(sun);

			renderer.toneMappingExposure = effectController.exposure;
		}
		// gui.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
		// gui.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
		// gui.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
		// gui.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
		// gui.add( effectController, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
		// gui.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
		// gui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );
		guiChanged();

		/**
		 * Object
		 */
		const textureLoader = new THREE.TextureLoader();

		const grassNormalTexture = textureLoader.load(
			"/src/all models/wassim.jfif"
		);
		grassNormalTexture.repeat.set(50, 50);
		grassNormalTexture.wrapT = THREE.RepeatWrapping;
		grassNormalTexture.wrapS = THREE.RepeatWrapping;

		// floor
		const floor = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(380, 380),
			new THREE.MeshStandardMaterial({
				map: grassNormalTexture,
			})
		);
		floor.geometry.setAttribute(
			"uv2",
			new THREE.Float32BufferAttribute(
				floor.geometry.attributes.uv.array,
				2
			)
		); //for aoMap to work

		floor.rotation.x = -Math.PI / 2;
		floor.position.y = 0;
		floor.receiveShadow = true;
		scene.add(floor);

		//testfloor

		//bushes

		/**
		 * Sizes
		 */
		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		window.addEventListener("resize", () => {
			// Update sizes
			sizes.width = window.innerWidth;
			sizes.height = window.innerHeight;

			// Update camera
			camera.aspect = sizes.width / sizes.height;
			camera.updateProjectionMatrix();

			// Update renderer
			renderer.setSize(sizes.width, sizes.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		});

		//light

		////////ambiant
		const light = new THREE.AmbientLight("#b9d5ff", 0.8);

		/////////directionnal
		const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.5);
		moonLight.position.set(4, 5, -2);
		moonLight.castShadow = true;
		// 		var side = 500;
		// moonLight.shadow.camera.top = side;
		// moonLight.shadow.camera.bottom = -side;
		// moonLight.shadow.camera.left = side;
		// moonLight.shadow.camera.right = -side;
		scene.add(moonLight, light);

		function between(x, min, max) {
			return x >= min && x <= max;
		}

		// var oldman = false;
		document.onkeyup = function (e) {
			if (
				e.keyCode === 13 &&
				// oldman === false &&
				between(box.position.x, 38.39, 52.11) &&
				between(box.position.z, -13.67, 0.92)
			) {
       
				setlevel(1);
				// const talk = new Audio(
				// 	"/src/components/static/Enregistrement.m4a"
				// );

				// talk.play();

				// oldman = true;
				// if (oldman === true) {
				// 	setTimeout(() => {
				// 		oldman = false;
				// 	}, 6000);
				// }
			}
      if (
				e.keyCode === 13 &&
				between(box.position.x, 63.92, 73.72) &&
				between(box.position.z, -57.65, -48.32)
			) {
				setlevel(2);
				settask("two")}
        if (
          e.keyCode === 13 &&
          between(box.position.x, 1.65, 13.12) &&
          between(box.position.z, -133.43, -99.76)
        ) {
          setlevel(3);
		settask("three")
		}
          if (
            e.keyCode === 13 &&
            between(box.position.x, -88.34, -78.16) &&
            between(box.position.z, -70.44, -58.82)
          ) {
            setlevel(4);
			settask("four")}
            if (
              e.keyCode === 13 &&
              between(box.position.x, -121.52, -110.52) &&
              between(box.position.z, -61.23, -51.97)
            ) {
              setlevel(5);
			  settask("five")}
              if (
                e.keyCode === 13 &&
                between(box.position.x, -138.05, -127.58) &&
                between(box.position.z, -92.07, -80.76)
              ) {
                setlevel(6);
				settask("six")}
		};
    //second level
  
		// Controls

		// const horses = [];
		const storks = [];
		const flamingos = [];
		const parrots = [];
		mixer = new THREE.AnimationMixer(scene);
		function addMorph(
			mesh,
			clip,
			speed,
			duration,
			x,
			y,
			z,
			fudgeColor,
			type
		) {
			mesh = mesh.clone();
			mesh.material = mesh.material.clone();

			if (fudgeColor) {
				mesh.material.color.offsetHSL(
					0,
					Math.random() * 0.5 - 0.25,
					Math.random() * 0.5 - 0.25
				);
			}

			mesh.speed = speed;

			mixer
				.clipAction(clip, mesh)
				.setDuration(duration)
				// to shift the playback out of phase:
				.startAt(-duration * Math.random())
				.play();
			mesh.scale.set(0.01, 0.01, 0.01);
			mesh.position.set(x, y, z);
			mesh.rotation.y = Math.PI / 2;

			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add(mesh);
			if (type === "horses") horses.push(mesh);
			if (type === "flamingos") flamingos.push(mesh);
			if (type === "storks") storks.push(mesh);
			if (type === "parrots") parrots.push(mesh);
		}

		const gltfloader = new GLTFLoader();

		// gltfloader.load(
		// 	"/src/components/static/models/Horse.glb",
		// 	function (gltf) {
		// 		const mesh = gltf.scene.children[0];
		// 		const clip = gltf.animations[0];

		// 		addMorph(mesh, clip, 7, 1, 1, 0, -30, true, "horses");
		// 		addMorph(mesh, clip, 7, 1, 8, 0, -30, true, "horses");
		// 		addMorph(mesh, clip, 7, 1, 7, 0, -30, true, "horses");
		// 		addMorph(mesh, clip, 7, 1, 3, 0, -30, true, "horses");
		// 	}
		// );

		gltfloader.load(
			"/src/components/static/models/Flamingo.glb",
			function (gltf) {
				const mesh = gltf.scene.children[0];
				const clip = gltf.animations[0];
				addMorph(mesh, clip, 7, 1, 4, 5, 3, true, "flamingos");
				// addMorph(mesh, clip, 7, 1, 4, 5, 4, true, "flamingos");
				// addMorph(mesh, clip, 7, 1, 4, 5.5, 5, true, "flamingos");
				// addMorph( mesh, clip, 7, 1, 0, 6, 2,true );
				// addMorph( mesh, clip, 7, 1, 2, 7, 0.5,true );
			}
		);

		gltfloader.load(
			"/src/components/static/models/Stork.glb",
			function (gltf) {
				const mesh = gltf.scene.children[0];
				const clip = gltf.animations[0];
				addMorph(mesh, clip, 7, 1, 3, 5, 3, true, "storks");
				// addMorph(mesh, clip, 7, 1, 4, 5, 3, true, "storks");
				// addMorph(mesh, clip, 7, 1, 4, 5.5, 4, true, "storks");
			}
		);

		gltfloader.load(
			"/src/components/static/models/Parrot.glb",
			function (gltf) {
				const mesh = gltf.scene.children[0];
				const clip = gltf.animations[0];
				// addMorph(mesh, clip, 7, 1, 4, 5, 3, true, "parrots");
				// addMorph(mesh, clip, 7, 1, 4, 5.5, 4, true, "parrots");
				addMorph(mesh, clip, 7, 1, 4, 6, 5, true, "parrots");
			}
		);

		//physics
		var world = new CANNON.World();
		world.broadphase = new CANNON.SAPBroadphase(world);
		world.gravity.set(0, -10, 0);
		world.defaultContactMaterial.friction = 0;
		//Material

		const defaultMaterial = new CANNON.Material("default");

		const defaultContactMaterial = new CANNON.ContactMaterial(
			defaultMaterial,
			defaultMaterial,
			{
				friction: 0.3,
				restitution: 0.7,
			}
		);
		// world.addContactMaterial(defaultContactMaterial)
		// world.defaultContactMaterial=defaultContactMaterial
		//box test

		// house physics (test)
		// const houseshape= new CANNON.Box(new CANNON.Vec3(1.75,5,2.04))
		// const housebody=new CANNON.Body({
		//     mass:0,
		//     position: new CANNON.Vec3(-11.5,0,2),
		//     shape:houseshape,
		//     material:defaultMaterial
		// })
		// world.addBody(housebody)
		// const boxGeometry=new THREE.BoxBufferGeometry(1, 1, 1)
		// const boxMaterial=  new THREE.MeshStandardMaterial({
		// 	metalness:0.3,
		// 	roughness:0.4,
		// })
		// const boxtest = new THREE.Mesh(boxGeometry,boxMaterial )
		// boxtest.scale.set(1.75,2.04,3.27)
		// boxtest.castShadow=true
		// boxtest.position.copy(housebody.position)
		// boxtest.scale.copy(housebody.scale)

		// const cubeFolder1 = gui.addFolder('Cube')
		// cubeFolder1.add(housebody.quaternion, 'x')
		// cubeFolder1.add(housebody.quaternion, 'y')
		// cubeFolder1.add(housebody.quaternion, 'z')
		// cubeFolder1.open()
		// const cubeFolder = gui.addFolder('scale')
		// cubeFolder.add(housebody.scale, 'x')
		// cubeFolder.add(housebody.scale, 'y')
		// cubeFolder.add(housebody.scale, 'z')
		// cubeFolder.open()
		// scene.add(boxtest)
		var carRotation = -(2 * Math.PI) / 3;
		var groundMaterial = new CANNON.Material("groundMaterial");
		var wheelMaterial = new CANNON.Material("wheelMaterial");
		var wheelGroundContactMaterial = new CANNON.ContactMaterial(
			wheelMaterial,
			groundMaterial,
			{
				friction: 0.3,
				restitution: 0,
				contactEquationStiffness: 1000,
			}
		);

		world.addContactMaterial(wheelGroundContactMaterial);

		// car physics body
		var chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.3, 2));
		var chassisBody = new CANNON.Body({ mass: 150 });
		chassisBody.addShape(chassisShape);
		chassisBody.position.set(carPositionX, 0.2, carPositionz);
		chassisBody.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), carRotation);
		chassisBody.angularVelocity.set(0, 0, 0); // initial velocity

		// car visual body
		var geometry = new THREE.BoxGeometry(0.5, 0.2, 2); // double chasis shape
		var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
		var box = new THREE.Mesh(geometry, material);
		scene.add(box);

		// parent vehicle object
		var vehicle = new CANNON.RaycastVehicle({
			chassisBody: chassisBody,
			indexRightAxis: 0, // x
			indexUpAxis: 1, // y
			indexForwardAxis: 2, // z
		});

		// wheel options
		var options = {
			radius: 0.4,
			directionLocal: new CANNON.Vec3(0, -1, 0),
			suspensionStiffness: 45,
			suspensionRestLength: 0.4,
			frictionSlip: 5,
			dampingRelaxation: 2.3,
			dampingCompression: 4.5,
			maxSuspensionForce: 200000,
			rollInfluence: 0.01,
			axleLocal: new CANNON.Vec3(-1, 0, 0),
			chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
			maxSuspensionTravel: 0.25,
			customSlidingRotationalSpeed: -30,
			useCustomSlidingRotationalSpeed: true,
		};

		var axlewidth = 0.7;

		//positioning the wheels
		options.chassisConnectionPointLocal.set(axlewidth, 0, -1);
		vehicle.addWheel(options);

		options.chassisConnectionPointLocal.set(-axlewidth, 0, -1);
		vehicle.addWheel(options);

		options.chassisConnectionPointLocal.set(axlewidth, 0, 1);
		vehicle.addWheel(options);

		options.chassisConnectionPointLocal.set(-axlewidth, 0, 1);
		vehicle.addWheel(options);

		vehicle.addToWorld(world);

		// car wheels
		var wheelBodies = [],
			wheelVisuals = [];
		vehicle.wheelInfos.forEach(function (wheel) {
			var shape = new CANNON.Cylinder(
				wheel.radius,
				wheel.radius,
				wheel.radius / 2,
				20
			);
			var body = new CANNON.Body({ mass: 1, material: wheelMaterial });
			var q = new CANNON.Quaternion();
			q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			body.addShape(shape, new CANNON.Vec3(), q);
			wheelBodies.push(body);
			// wheel visual body
			var geometry = new THREE.CylinderGeometry(
				wheel.radius,
				wheel.radius,
				0.4,
				32
			);
			var material = new THREE.MeshPhongMaterial({
				color: 0x292929,
				// emissive: 0xaa0000,
				side: THREE.DoubleSide,
				flatShading: true,
			});
			var cylinder = new THREE.Mesh(geometry, material);
			cylinder.geometry.rotateZ(Math.PI / 2);
			wheelVisuals.push(cylinder);
			scene.add(cylinder);
		});

		// update the wheels to match the physics
		world.addEventListener("postStep", function () {
			for (var i = 0; i < vehicle.wheelInfos.length; i++) {
				vehicle.updateWheelTransform(i);
				var t = vehicle.wheelInfos[i].worldTransform;
				// update wheel physics
				wheelBodies[i].position.copy(t.position);
				wheelBodies[i].quaternion.copy(t.quaternion);
				// update wheel visuals
				wheelVisuals[i].position.copy(t.position);
				wheelVisuals[i].quaternion.copy(t.quaternion);
			}
		});

		const floorShape = new CANNON.Plane();
		const floorBody = new CANNON.Body();
		// floorBody.material=defaultMaterial
		floorBody.mass = 0;
		floorBody.addShape(floorShape);
		floorBody.quaternion.setFromAxisAngle(
			new CANNON.Vec3(-1, 0, 0),
			Math.PI / 2
		);
		// floorBody.material(groundMaterial)
		world.addBody(floorBody);
		/**
		 * Main
		 **/

		function updatePhysics() {
			world.step(1 / 60);
			// update the chassis position
			box.position.copy(chassisBody.position);
			box.quaternion.copy(chassisBody.quaternion);
		}

		var musicStatus = false;
		function navigate(e) {
			if (e.type != "keydown" && e.type != "keyup");
			var keyup = e.type == "keyup";

			var engineForce = 2000,
				maxSteerVal = 0.5;
			switch (e.keyCode) {
				case 38: // forward
					vehicle.applyEngineForce(keyup ? 0 : -engineForce, 2);
					vehicle.applyEngineForce(keyup ? 0 : -engineForce, 3);
					if(musicStatus===false){
						var music=new Audio("/src/components/static/soundTruck.mp3")

						music.play()
						music.Loop=true
						musicStatus=true
						music.volume=0.01
						if(musicStatus===true){
							setTimeout(()=>{musicStatus=false},2222222)
						}
					}

					break;

				case 40: // backward
					vehicle.applyEngineForce(keyup ? 0 : engineForce, 2);
					vehicle.applyEngineForce(keyup ? 0 : engineForce, 3);
					
        
					break;

				case 39: // right
					vehicle.setSteeringValue(keyup ? 0 : -maxSteerVal, 2);
					vehicle.setSteeringValue(keyup ? 0 : -maxSteerVal, 3);
					break;

				case 37: // left
					vehicle.setSteeringValue(keyup ? 0 : maxSteerVal, 2);
					vehicle.setSteeringValue(keyup ? 0 : maxSteerVal, 3);
					break;

				case 32:
					vehicle.setBrake(10, 0);
					vehicle.setBrake(10, 1);
					vehicle.setBrake(10, 2);
					vehicle.setBrake(10, 3);
			}
		}
		window.addEventListener("keydown", navigate);
		window.addEventListener("keyup", navigate);
		// * Camera
		// // */
		// // Base camera
		//

		// 	/**
		//  * Camera
		//  */
		// third person camera
		var camera, goal;
		var test = 4; //camera disctance from the car
		var temp = new THREE.Vector3();
		camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.5,
			1000
		);
		camera.position.set(0, test, -10);
		camera.lookAt(scene.position);
		goal = new THREE.Object3D();
		box.add(goal);
		goal.position.set(0, test, -10);

		//world physics ghassen

		const createBox = (width, height, depth, position, rotation) => {
			const btry = new THREE.BoxBufferGeometry(1, 1, 1);
			const bl = new THREE.MeshStandardMaterial();
			//threejs mesh
			const mesh = new THREE.Mesh(btry, bl);
			mesh.scale.set(width, height, depth);
			mesh.position.copy(position);
			mesh.rotation.set(rotation.x, rotation.y, rotation.z);

			// const cubeFolder2 = gui.addFolder('size')
			// cubeFolder2.add(mesh.scale, 'x').step(0.05)
			// cubeFolder2.add(mesh.scale, 'y').step(0.05)
			// cubeFolder2.add(mesh.scale, 'z').step(0.05)
			// const cubeFolder1 = gui.addFolder('Cube')
			// cubeFolder1.add(mesh.position, 'x').step(0.1)
			// cubeFolder1.add(mesh.position, 'y').step(0.1)
			// cubeFolder1.add(mesh.position, 'z').step(0.1)
			// cubeFolder1.open()
			// const cubeFolder = gui.addFolder('rotation')
			// cubeFolder.add(mesh.rotation, 'x').step(0.001)
			// cubeFolder.add(mesh.rotation, 'y').step(0.001)
			// cubeFolder.add(mesh.rotation, 'z').step(0.001)
			// cubeFolder.open()

			// cubeFolder2.open()

			scene.add(mesh);
			//cannon js body
			const shape = new CANNON.Box(
				new CANNON.Vec3(width / 2, height / 2, depth / 2)
			);
			const body = new CANNON.Body({
				mass: 0,
				position: new CANNON.Vec3(position.x, position.y, position.z),
				shape,
			});
			body.quaternion.copy(mesh.quaternion);

			world.addBody(body);

			mesh.visible = false;
			scene.remove(mesh);
		};
	

		// const createBoxPhysics=(width,height,depth,position,rotation)=>{
		// 	const shape= new CANNON.Box(new CANNON.Vec3(width/2,height/2,depth/2))
		//     const body=new CANNON.Body({
		//         mass:0,
		//         position: new CANNON.Vec3(position.x,position.y,position.z),
		//         shape,
		//         material:defaultMaterial
		//     })
		//     body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),rotation.y)
		// 	body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),rotation.x)
		// 	body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,0,1),rotation.z)

		//     world.addBody(body)

		// }
		// createBoxPhysics(30,3,0.5,{x:65,y:0,z:-31.3},{x:3.1,y:-1.2,z:3.1})

		/**
		 * Renderer
		 */

		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor("#cyan");

		

		/**
		 * Animate
		 */
		const clock = new THREE.Clock();
		var oldElaspsedTime = 0;
		const tick = () => {
			const elapsedTime = clock.getElapsedTime();
			var deltaTime = elapsedTime - oldElaspsedTime;
			oldElaspsedTime = elapsedTime;
			

			if (mixer) {
				mixer.update(deltaTime);
			}
			mixer.update(deltaTime);

			// for (let i = 0; i < horses.length; i++) {
			// 	const horse = horses[i];

			// 	horse.position.x += horse.speed * deltaTime;
			//
			// 	if (horse.position.x > 200) {
			// 		horse.position.x = -200;
			// 	}
			// }
			for (let i = 0; i < flamingos.length; i++) {
				const flamingo = flamingos[i];

				flamingo.position.x += flamingo.speed * deltaTime;

				if (flamingo.position.x > 150) {
					flamingo.position.x = -150;
				}
			}
			for (let i = 0; i < storks.length; i++) {
				const stork = storks[i];

				stork.position.x += stork.speed * deltaTime;
				stork.position.z = 5;

				if (stork.position.x > 300) {
					stork.position.x = -300;
				}
			}
			for (let i = 0; i < parrots.length; i++) {
				const parrot = parrots[i];

				parrot.position.x += parrot.speed * deltaTime;
				parrot.position.z = -5;

				if (parrot.position.x > 500) {
					parrot.position.x = -500;
				}
			}
			if (mixer1) {
				mixer1.update(deltaTime);
			}
			if (mixer2) {
				mixer2.position.set(
					box.position.x,
					box.position.y - 0.55,
					box.position.z
				);
				mixer2.rotation.copy(box.rotation);
			}
			if (mixer3) {
				mixer3.update(deltaTime);
			}
			if (mixer4) {
				mixer4.update(deltaTime);
			}
			if (mixer5) {
				mixer5.update(deltaTime);
			}
			if (mixer6) {
				mixer6.update(deltaTime);
			}
			if (mixer7) {
				mixer7.update(deltaTime);
			}
			if (mixer8) {
				mixer8.update(deltaTime);
			}
			if (mixer9) {
				mixer9.update(deltaTime);
			}
			if (mixer10) {
				mixer10.update(deltaTime);
			}
			if (mixer11) {
				mixer11.update(deltaTime);
			}
      if (mixer12) {
				mixer12.update(deltaTime);
			}
      if (mixer13) {
				mixer13.update(deltaTime);
			}
      if (mixer14) {
				mixer14.update(deltaTime);
			}
      if (mixer15) {
				mixer15.update(deltaTime);
			}
      if (mixer16) {
				mixer16.update(deltaTime);
			}
      if (mixer17) {
				mixer17.update(deltaTime);
			}
      if (mixer18) {
				mixer18.update(deltaTime);
			}
			// console.log(box.position);
			// Update controls
			renderer.clear();
			// controls.update()
			// Render
			renderer.render(scene, camera);
			temp.setFromMatrixPosition(goal.matrixWorld);
			camera.position.lerp(temp, 0.2);
			camera.lookAt(box.position);
			updatePhysics();
			// Call tick again on the next frame
			window.requestAnimationFrame(tick);
		};
		tick();

		mount.current.appendChild(renderer.domElement);
	}, []);

	function quests() {
		if (task === "one")
			return <DnD close={close} user={user} setUser={setUser} />;
      if (task === "two")
			return <Challenges close={close} user={user} setUser={setUser} />;
      if (task === "three")
			return <DnDEnglish close={close} user={user} setUser={setUser} />;
      if (task === "four")
      return < Game2 close={close} />
      if (task === "five")
      return < DnDBasket close={close} />
      if (task === "six")
      return < CubeTowerGame close={close} />
	}
  
	document.onkeydown = function (e) {
		if (e.keyCode === 13 && level === 1) {settask("one");
		setlevel(0);
	}
    if (e.keyCode === 13 && level === 2) {settask("two");
	
	
	setlevel(0);}
  if (e.keyCode === 13 && level === 3) {settask("three");
 
	
	setlevel(0);}
  if (e.keyCode === 13 && level === 4) {settask("four");
	setlevel(0);}
  if (e.keyCode === 13 && level === 5) {settask("five");
	setlevel(0);}
  if (e.keyCode === 13 && level === 6) {settask("six");
	setlevel(0);}
	};
	

	function changeImagevariable() {
		setImage(2);
	}
	function removeImagevariable() {
		setImage(3);
	}

	function changeImage() {
		if (image === 1) {
			return (
				<img
					onClick={changeImagevariable}
					className='image'
					src='https://cdn.discordapp.com/attachments/902991650727538769/931741300213047306/wassim.png'
				/>
			);
		} else if (image === 2) {
			return (
				<img
					onClick={removeImagevariable}
					className='image'
					src='https://media.discordapp.net/attachments/902991650727538769/931741299965591592/elfen.png?width=1040&height=585'
				/>
			);
		}
	}
	return (
		<div>
			<div className='vis' ref={mount} />
			{changeImage()}
			{quests()}
			{user ? (
				<div className='infocardContainer'>
					<div className='user-avatar'>
						<img src={user.loginpic}></img>
					</div>
					<div id='textbois'>
						<h4>Name : {user.username}</h4>
						<h4>Level : {user.level} </h4>
						<h4>Badge : {user.badge} </h4>
						<Link to='/'>
							{" "}
							<button className='logoutBTN' onClick={logout}>
								Logout
							</button>{" "}
						</Link>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Vis;
