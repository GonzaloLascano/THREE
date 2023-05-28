import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//-------------Building the scene

const frame = document.getElementsByClassName('frame')[0];
let hoveredFrame = false;

const scene = new THREE.Scene();
const camera =  new THREE.PerspectiveCamera(75, 
    1/1 , 0.1, 1000);//fov, aspect ratio, clipping start and clipping end
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(600, 600);
frame.appendChild(renderer.domElement);
const loader = new GLTFLoader();

//Loading Custom Assets
let helmetGLTF;

loader.load('./emojis.gltf', gltf => {
    helmetGLTF = gltf;
    scene.add(gltf.scene);
}, undefined, error => {
    console.log(error);
});

//tracking mouse possition over the canvas

const mousePosition = new THREE.Vector3();
mousePosition.z = 1
frame.addEventListener('mousemove', function(e){
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = ((e.clientY / window.innerHeight) * 2 - 1) * -1;
    hoveredFrame = true;
});
frame.addEventListener('mouseout', function(e){
    hoveredFrame = false;
})

//-------------Arranging 3d objects in the Scene:

//camera
camera.position.z = 2;
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.dampingFactor = 0.03;
orbit.enablePan = false;
orbit.enableZoom = false;

//lights
const light = new THREE.AmbientLight( 0x404040, 20 ); // soft white light
light.position.set( 3, 3, 0 );
scene.add( light );
const pointLight = new THREE.PointLight( 0x404040, 0, 100 );
pointLight.position.set( 3, 7, 0 );
scene.add( pointLight );

/* const geometry = new THREE.BoxGeometry(1 ,1 ,1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh(geometry, material); */

/* scene.add(cube); */

//-------------Animating and Rendering the Scene

function animate() {
	requestAnimationFrame( animate );
    if (hoveredFrame) {
        helmetGLTF.scene.lookAt(mousePosition);
    } else {
        orbit.reset();
        helmetGLTF.scene.rotation.x = 0;
        helmetGLTF.scene.rotation.z = 0;    
    }
    helmetGLTF.scene.rotation.y += 0.001;
    orbit.update();
    renderer.render( scene, camera );
}

animate();
