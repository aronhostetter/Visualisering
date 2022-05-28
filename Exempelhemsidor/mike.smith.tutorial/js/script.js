var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .01, 1000);

// controls = new THREE.OrbitControls(camera);
// controls.addEventListener('change', renderer);

var renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF
});
var cube = new THREE.Mesh(geometry, material);
var light = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 1);
scene.add(cube);
scene.add(light);

camera.position.z = 5

var mx = 0;
var my = 0;

function saveMouse(event) {
    mx = event.clientX;
    my = event.clientY;
}

document.onmousemove = saveMouse;

window.addEventListener('resize', () => {
    renderer.setSize((window.innerWidth /*-55*/ ), (window.innerHeight /*-55*/ ));
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.y = mx / 150;
    cube.rotation.x = my / 150;

    renderer.render(scene, camera);
}
animate()