import *  as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// INIT CAMERA
camera.position.z = 60;
camera.position.x = 3;
camera.position.y = 20;
camera.lookAt(0, 0, -50)

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// RESIZE HAMDLER
export function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// INIT HEMISPHERE LIGHT
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// SCENE
scene.background = new THREE.Color(0xffffff);

// FLOOR
for (var i = -50; i <= 50; i += 5) {
    for (var j = -50; j <= 50; j += 5) {
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5, 1), new THREE.MeshPhongMaterial({ color: 0x0a7d15 }));
        plane.position.x = i;
        plane.position.z = j;
        plane.rotation.x = - Math.PI / 2
        plane.receiveShadow = true
        scene.add(plane);
    }
}


// DIRECTIONAL LIGHT
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.x += 20
// directionalLight.position.y += 20
// directionalLight.position.z += 20
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.width = 4096;
// directionalLight.shadow.mapSize.height = 4096;
// const d = 25;
// directionalLight.shadow.camera.left = - d;
// directionalLight.shadow.camera.right = d;
// directionalLight.shadow.camera.top = d;
// directionalLight.shadow.camera.bottom = - d;
// scene.add(directionalLight);

// scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

// SPOT LIGHT
// const spotLight = new THREE.SpotLight( 0xffffff );
// spotLight.position.set( 20, 15, 20 );
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 4096;
// spotLight.shadow.mapSize.height = 4096;
// scene.add(spotLight)

// POINT LIGHT
const light1 = new THREE.PointLight( 0xff6666, 1, 100 );
light1.castShadow = true;
light1.shadow.mapSize.width = 4096;
light1.shadow.mapSize.height = 4096;
scene.add( light1 );

const light2 = new THREE.PointLight( 0x33ff33, 1, 100 );
light2.castShadow = true;
light2.shadow.mapSize.width = 4096;
light2.shadow.mapSize.height = 4096;
scene.add( light2 );

// TEXT
var textMesh1: THREE.Mesh;

const loader = new THREE.FontLoader();
loader.load('./fonts/optimer_bold.typeface.json', function (font) {
    const geometry = new THREE.TextGeometry('three.js', {
        font: font,
        size: 5,
        height: 1,
        curveSegments: 10,
        bevelEnabled: false,
        bevelOffset: 0,
        bevelSegments: 1,
        bevelSize: 0.3,
        bevelThickness:1
    });
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0xff6600}), // front
        new THREE.MeshPhongMaterial({ color: 0x0000ff }) // side
    ];
    textMesh1 = new THREE.Mesh(geometry, materials);
    textMesh1.castShadow = true
    textMesh1.position.y += 10
    textMesh1.position.x -= 6
    textMesh1.rotation.y = 0.25    
    scene.add(textMesh1)
});


// ANIMATE
function animate() {
    const now = Date.now() / 1000;
    light1.position.y = 15;
    light1.position.x = Math.cos(now) * 20;
    light1.position.z = Math.sin(now) * 20;

    light2.position.y = 15;
    light2.position.x = Math.sin(now) * 20;
    light2.position.z = Math.cos(now) * 20;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();