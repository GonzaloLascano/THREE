import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const frame = document.getElementsByClassName('frame')[0];

const scene = new THREE.Scene();
const camera =  new THREE.PerspectiveCamera(75, 
    1/1 , 0.1, 1000);//fov, aspect ratio, clipping start and clipping end
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(600, 600);
frame.appendChild(renderer.domElement);
const loader = new GLTFLoader();

// adding 3d objects to the Scene:
camera.position.z = 2;
const orbit = new OrbitControls(camera, renderer.domElement);

const light = new THREE.AmbientLight( 0x404040, 7 ); // soft white light
light.position.set( 3, 3, 0 );
scene.add( light );
const pointLight = new THREE.PointLight( 0x404040, 10, 100 );
pointLight.position.set( 3, 7, 0 );
scene.add( pointLight );

/* const geometry = new THREE.BoxGeometry(1 ,1 ,1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh(geometry, material); */

/* scene.add(cube); */

let helmetGLTF;

loader.load('./emojis.gltf', gltf => {
    helmetGLTF = gltf;
    scene.add(gltf.scene);
}, undefined, error => {
    console.log(error);
});


function animate() {
	requestAnimationFrame( animate );
    helmetGLTF.scene.rotation.y += 0.001
    renderer.render( scene, camera );
}

animate();
