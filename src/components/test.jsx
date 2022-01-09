import React from "react";
import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import CANNON from 'cannon'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
const gui = new dat.GUI()


const Vis = () => {
	const { useRef, useEffect, useState } = React;
	const mount = useRef(null);
	// const controls = useRef(null);

	useEffect(() => {


		// Sound
		
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		// Scene
		const scene = new THREE.Scene();
		//Models

		let mixer = null;
		let mixer1 = null;
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
				object.position.set(0, 0, 3);
				object.scale.set(0.007, 0.007, 0.007);
				scene.add(object);
			}
		);
        //adding the house
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            "/src/all models/House.gltf",
            function ( gltf ) {
                gltf.scene.position.set(-19,-5.5,-3.3)
                gltf.scene.scale.set(0.68, 0.6, 0.64);
                gltf.scene.rotation.set(0,2,0)
                scene.add( gltf.scene );
            
            },
        );
        //Road
        gltfLoader.load(
            "/src/all models/Road.gltf",
            function ( gltf ) {
                gltf.scene.position.set(1.6,-4.4,-2)
                gltf.scene.scale.set(0.79, 2.02, 0.59);
                gltf.scene.rotation.set(0,0.4,0)
                scene.add( gltf.scene );
               
            },
        );
        gltfLoader.load(
            "/src/all models/Road.gltf",
            function ( gltf ) {
                gltf.scene.position.set(2.4,-4.3,7.3)
                gltf.scene.scale.set(0.79, 2, 0.59);
                gltf.scene.rotation.set(0,-0.04,0)
                scene.add( gltf.scene );
            },
            );
            gltfLoader.load(
            "/src/all models/Road.gltf",
            function ( gltf ) {
                gltf.scene.position.set(3.1,-4.4,2.8)
                gltf.scene.scale.set(0.79, 2.02, 0.59);
                gltf.scene.rotation.set(0,0.11,0)
                scene.add( gltf.scene );
                
            },
        );
        gltfLoader.load(
            "/src/all models/Road.gltf",
            function ( gltf ) {
                gltf.scene.position.set(-2,-4.3,3.7)
                gltf.scene.scale.set(1.12, 2, 0.59);
                gltf.scene.rotation.set(0,1.005,0)
                scene.add( gltf.scene );
               
                
                
            },
        );
        //Rocks
        gltfLoader.load(
            "/src/all models/rock1.gltf",
            function ( gltf ) {
                gltf.scene.position.set(-18, -10.5, 14.3);
                gltf.scene.scale.set(0.7, 0.7, 0.7);     
                scene.add( gltf.scene );

            },
        );
        gltfLoader.load(
            "/src/all models/rock2.gltf",
            function ( gltf ) {
                console.log(gltf);
				gltf.scene.position.set(-15, -3, 24.9);
                gltf.scene.scale.set(0.8, 0.8, 0.8);  
                gltf.scene.rotation.set(17, 6, 0);  

                
                scene.add( gltf.scene );
                
            },
        );
        gltfLoader.load(
            "/src/all models/rock3.gltf",
            function ( gltf ) {
                console.log(gltf);
                gltf.scene.position.set(-58, 0, -29.6);
				gltf.scene.scale.set(3, 3, 3);

                
                scene.add( gltf.scene );
      
            },
        );
        //grass
        const grass=new THREE.Group()
                 scene.add(grass)
                 for(let i=0;i<1000;i++){
        gltfLoader.load(
            "/src/all models/grass1.gltf",
            function ( gltf ) {
                const angle=Math.random()*Math.PI*80
   const radius=3+Math.random()*100
                gltf.scene.position.set(Math.sin(angle)*radius,
                    0, Math.cos(angle)*radius);
				gltf.scene.scale.set(0.5, 0.5, 0.5);
                grass.add(gltf.scene)
                const cubeFolder1 = gui.addFolder('position')
                cubeFolder1.add(gltf.scene.position, 'x')
                cubeFolder1.add(gltf.scene.position, 'y')
                cubeFolder1.add(gltf.scene.position, 'z')
                cubeFolder1.open()
                const cubeFolder = gui.addFolder('scale')
                cubeFolder.add(gltf.scene.scale, 'x')
                cubeFolder.add(gltf.scene.scale, 'y')
                cubeFolder.add(gltf.scene.scale, 'z')
                cubeFolder.open()
                const cubeFolder2 = gui.addFolder('rotation')
                cubeFolder2.add(gltf.scene.rotation, 'x')
                cubeFolder2.add(gltf.scene.rotation, 'y')
                cubeFolder2.add(gltf.scene.rotation, 'z')
                cubeFolder2.open()
                
                scene.add( gltf.scene );
      
            },
        );}
       
//graves
// const graves=new THREE.Group()
// scene.add(graves)

// const graveGeometry=new THREE.BoxBufferGeometry(0.6,0.8,0.2)
// const graveMatrial= new THREE.MeshStandardMaterial({color:'#b2b6b1'})
// for(let i=0;i<50;i++){
//     const angle=Math.random()*Math.PI*2
//     const radius=3+Math.random()*6
//     const x=Math.sin(angle)*radius
//     const z=Math.cos(angle)*radius
//     const grave=new THREE.Mesh(graveGeometry,graveMatrial)
//     grave.position.set(x,0.3,z)
//     grave.rotation.y=(Math.random()-0.5)*0.4
//     grave.rotation.z=(Math.random()-0.5)*0.4
//     grave.castShadow=true

//     graves.add(grave)
       // trees
       gltfLoader.load(
        "/src/all models/trees1.gltf",
        function ( gltf ) {
            console.log(gltf);
            gltf.scene.position.set(32, 0, 19.6);
            gltf.scene.scale.set(1, 1, 1);

                      scene.add( gltf.scene );

            
            
        },
    );
		//house

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
		var texture1 = new THREE.TextureLoader().load(
			"/src/components/static/sky.jpg"
		);
		scene.background = texture1;

		/**
		 * Object
		 */
		
		//floor
		const floor = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(1000, 1000),
			new THREE.MeshStandardMaterial({
			color:0xA4BD55
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
		scene.add(floor);

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
		const light = new THREE.AmbientLight("#b9d5ff", 0.7);

		/////////directionnal
		const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.5);
		moonLight.position.set(4, 5, -2);
		scene.add(light, moonLight);


		var oldman=false
					 document.onkeyup = function (e) {
						if (e.keyCode === 13 && oldman===false) {
							
							const talk = new Audio("/src/components/static/Enregistrement.m4a");
		
							talk.play();
							
							oldman=true
							if(oldman===true){ setTimeout(()=>{oldman=false;},6000)}

						 }}

	
		// Controls
		

		// const horses = [];
		// const storks = [];
		// const flamingos = [];
		// const parrots = [];
		// mixer = new THREE.AnimationMixer(scene);
		// function addMorph(
		// 	mesh,
		// 	clip,
		// 	speed,
		// 	duration,
		// 	x,
		// 	y,
		// 	z,
		// 	fudgeColor,
		// 	type
		// ) {
		// 	mesh = mesh.clone();
		// 	mesh.material = mesh.material.clone();

		// 	if (fudgeColor) {
		// 		mesh.material.color.offsetHSL(
		// 			0,
		// 			Math.random() * 0.5 - 0.25,
		// 			Math.random() * 0.5 - 0.25
		// 		);
		// 	}

		// 	mesh.speed = speed;

		// 	mixer
		// 		.clipAction(clip, mesh)
		// 		.setDuration(duration)
		// 		// to shift the playback out of phase:
		// 		.startAt(-duration * Math.random())
		// 		.play();
		// 	mesh.scale.set(0.01, 0.01, 0.01);
		// 	mesh.position.set(x, y, z);
		// 	mesh.rotation.y = Math.PI / 2;

		// 	mesh.castShadow = true;
		// 	mesh.receiveShadow = true;

		// 	scene.add(mesh);
		// 	if (type === "horses") horses.push(mesh);
		// 	if (type === "flamingos") flamingos.push(mesh);
		// 	if (type === "storks") storks.push(mesh);
		// 	if (type === "parrots") parrots.push(mesh);
		// }

		// const gltfloader = new GLTFLoader();

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

		// gltfloader.load(
		// 	"/src/components/static/models/Flamingo.glb",
		// 	function (gltf) {
		// 		const mesh = gltf.scene.children[0];
		// 		const clip = gltf.animations[0];
		// 		addMorph(mesh, clip, 7, 1, 4, 5, 3, true, "flamingos");
		// 		addMorph(mesh, clip, 7, 1, 4, 5, 4, true, "flamingos");
		// 		addMorph(mesh, clip, 7, 1, 4, 5.5, 5, true, "flamingos");
		// 		addMorph(mesh, clip, 7, 1, 4, 6.4, 6, true, "flamingos");
		// 		// addMorph( mesh, clip, 7, 1, 0, 6, 2,true );
		// 		// addMorph( mesh, clip, 7, 1, 2, 7, 0.5,true );
		// 	}
		// );

		// gltfloader.load(
		// 	"/src/components/static/models/Stork.glb",
		// 	function (gltf) {
		// 		const mesh = gltf.scene.children[0];
		// 		const clip = gltf.animations[0];
		// 		addMorph(mesh, clip, 7, 1, 3, 5, 3, true, "storks");
		// 		addMorph(mesh, clip, 7, 1, 4, 5, 3, true, "storks");
		// 		addMorph(mesh, clip, 7, 1, 4, 5.5, 4, true, "storks");
		// 		addMorph(mesh, clip, 7, 1, 4, 6, 5, true, "storks");
		// 	}
		// );

		// gltfloader.load(
		// 	"/src/components/static/models/Parrot.glb",
		// 	function (gltf) {
		// 		const mesh = gltf.scene.children[0];
		// 		const clip = gltf.animations[0];
		// 		addMorph(mesh, clip, 7, 1, 4, 5, 3, true, "parrots");
		// 		addMorph(mesh, clip, 7, 1, 4, 5.5, 4, true, "parrots");
		// 		addMorph(mesh, clip, 7, 1, 4, 6, 5, true, "parrots");
		// 	}
		// );

			//physics
			var world = new CANNON.World();
			world.broadphase = new CANNON.SAPBroadphase(world);
			world.gravity.set(0, -10, 0);
			world.defaultContactMaterial.friction = 10;
					//Material

const defaultMaterial= new CANNON.Material('default')

const defaultContactMaterial= new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction:0.1,
        restitution:0.7
    }
)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial=defaultContactMaterial
//box test

	//house physics (test)
	// const houseshape= new CANNON.Box(new CANNON.Vec3(1.75,5,2.04))
    // const housebody=new CANNON.Body({
    //     mass:0,
    //     position: new CANNON.Vec3(-11.5,0,2),
    //     shape:houseshape,
    //     material:defaultMaterial
    // })
	// world.addBody(housebody)
	// const gltfloader = new GLTFLoader();
	// const boxGeometry=new THREE.BoxBufferGeometry(1, 1, 1)
	// const boxMaterial=  new THREE.MeshStandardMaterial({ 
	// 	metalness:0.3,
	// 	roughness:0.4,
	// })
	// const boxtest = new THREE.Mesh(boxGeometry,boxMaterial )
	// boxtest.scale.set(1.75,2.04,3.27)
	// boxtest.castShadow=true
	// boxtest.position.copy(housebody.position)
	// const cubeFolder1 = gui.addFolder('Cube')
	// cubeFolder1.add(boxtest.position, 'x')
	// cubeFolder1.add(boxtest.position, 'y')
	// cubeFolder1.add(boxtest.position, 'z')
	// cubeFolder1.open()
    // const cubeFolder = gui.addFolder('scale')
	// cubeFolder.add(boxtest.scale, 'x')
	// cubeFolder.add(boxtest.scale, 'y')
	// cubeFolder.add(boxtest.scale, 'z')
	// cubeFolder.open()
	// scene.add(boxtest)
	
			var groundMaterial = new CANNON.Material('groundMaterial');
			var wheelMaterial = new CANNON.Material('wheelMaterial');
			var wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
				friction: 333,
				restitution: 0,
				contactEquationStiffness: 1000,
			});
			
			world.addContactMaterial(wheelGroundContactMaterial);
			
			// car physics body
			var chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.3, 2));
			var chassisBody = new CANNON.Body({mass: 150});
			chassisBody.addShape(chassisShape);
			chassisBody.position.set(0, 0.2, 0);
			chassisBody.angularVelocity.set(0, 0, 0); // initial velocity
			
			// car visual body
			var geometry = new THREE.BoxGeometry(1, 0.3, 2); // double chasis shape
			var material = new THREE.MeshBasicMaterial({color: 0xffff00});
			var box = new THREE.Mesh(geometry, material);
			scene.add(box);
			 
			// parent vehicle object
			var vehicle = new CANNON.RaycastVehicle({
			  chassisBody: chassisBody,
			  indexRightAxis: 0, // x
			  indexUpAxis: 1, // y
			  indexForwardAxis: 1, // z
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
			  rollInfluence:  0.01,
			  axleLocal: new CANNON.Vec3(-1, 0, 0),
			  chassisConnectionPointLocal: new CANNON.Vec3(1, 2, 0),
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
			vehicle.wheelInfos.forEach(function(wheel) {
			  var shape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
			  var body = new CANNON.Body({mass: 1, material: wheelMaterial});
			  var q = new CANNON.Quaternion();
			  q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			  body.addShape(shape, new CANNON.Vec3(), q);
			  wheelBodies.push(body);
			  // wheel visual body
			  var geometry = new THREE.CylinderGeometry( wheel.radius, wheel.radius, 0.4, 32 );
			  var material = new THREE.MeshPhongMaterial({
				color: 0xd0901d,
				emissive: 0xaa0000,
				side: THREE.DoubleSide,
				flatShading: true,
			  });
			  var cylinder = new THREE.Mesh(geometry, material);
			  cylinder.geometry.rotateZ(Math.PI/2);
			  wheelVisuals.push(cylinder);
			  scene.add(cylinder);
			});
			
			// update the wheels to match the physics
			world.addEventListener('postStep', function() {
			  for (var i=0; i<vehicle.wheelInfos.length; i++) {
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

			const floorShape= new CANNON.Plane()
			const floorBody=new CANNON.Body()
			// floorBody.material=defaultMaterial
			floorBody.mass=0
			floorBody.addShape(floorShape)
			floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1,0,0),Math.PI/2)
			world.addBody(floorBody)
/**
* Main
**/

function updatePhysics() {
	world.step(1/60);
	// update the chassis position
	box.position.copy(chassisBody.position);
	box.quaternion.copy(chassisBody.quaternion);
  }

var musicStatus=false
function navigate(e) {
	if (e.type != 'keydown' && e.type != 'keyup') ;
	var keyup = e.type == 'keyup';
  
	//optionnal
	vehicle.setBrake(0, 2);
	vehicle.setBrake(0, 1);
	vehicle.setBrake(0, 2);
	vehicle.setBrake(0, 3);
  
	var engineForce = 500,
		maxSteerVal = 0.7;
	switch(e.keyCode) {
  
	  case 38: // forward
		vehicle.applyEngineForce(keyup ? 0 : -engineForce, 0);
		vehicle.applyEngineForce(keyup ? 0 : -engineForce, 0);
		if(musicStatus===false){
			var music=new Audio("/src/components/static/soundTruck.mp3")

			music.play()
			music.Loop=true
			musicStatus=true
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
	    vehicle.setBrake(10,1)



	}
  
  }	
  window.addEventListener('keydown', navigate)
window.addEventListener('keyup', navigate)	
// * Camera
// */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set  (-3,3,3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping = true

	/**
		 * Camera
		 */
		// third person camera
		// var camera, goal;
		// var test = 5; //camera disctance from the car
		// var temp = new THREE.Vector3();
		// camera = new THREE.PerspectiveCamera(
		// 	75,
		// 	window.innerWidth / window.innerHeight,
		// 	0.1,
		// 	100
		// );
		// camera.position.set(0, test, -test);
		// camera.lookAt(scene.position);
		// goal = new THREE.Object3D();
		// box.add( goal );
		// goal.position.set(0, test, -test);

	
		
//truck



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

			// if (mixer) {
			// 	mixer.update(deltaTime);
			// }
			// mixer.update(deltaTime);

			// for (let i = 0; i < horses.length; i++) {
			// 	const horse = horses[i];

			// 	horse.position.x += horse.speed * deltaTime;

			// 	if (horse.position.x > 200) {
			// 		horse.position.x = -200;
			// 	}
			// }
			// for (let i = 0; i < flamingos.length; i++) {
			// 	const flamingo = flamingos[i];

			// 	flamingo.position.x += flamingo.speed * deltaTime;

			// 	if (flamingo.position.x > 80) {
			// 		flamingo.position.x = -80;
			// 	}
			// }
			// for (let i = 0; i < storks.length; i++) {
			// 	const stork = storks[i];

			// 	stork.position.x += stork.speed * deltaTime;
			// 	stork.position.z = 5;

			// 	if (stork.position.x > 150) {
			// 		stork.position.x = -150;
			// 	}
			// }
			// for (let i = 0; i < parrots.length; i++) {
			// 	const parrot = parrots[i];

			// 	parrot.position.x += parrot.speed * deltaTime;
			// 	parrot.position.z = -5;

			// 	if (parrot.position.x > 100) {
			// 		parrot.position.x = -100;
			// 	}
			// }
			if (mixer1) {
				mixer1.update(deltaTime);
			}
			// Update controls
			renderer.clear();
			controls.update()
			// Render
			renderer.render(scene, camera);
			// temp.setFromMatrixPosition(goal.matrixWorld);
			// camera.position.lerp(temp, 0.2);
			camera.lookAt(box.position);
			updatePhysics();
			// Call tick again on the next frame
			window.requestAnimationFrame(tick);
	

		};
		tick();

		mount.current.appendChild(renderer.domElement);
	}, []);

	return <div className='vis' ref={mount} />;
};

export default Vis;
