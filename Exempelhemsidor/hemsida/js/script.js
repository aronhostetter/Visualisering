var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({
    color: 0x3A75BE
});
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

var light = new THREE.PointLight(0xFFFFFF, 1, 500)
light.position.set(10, 0, 25);
scene.add(light);

var render = function() {
    requestAnimationFrame(render)

    renderer.render(scene, camera);
}

function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 - 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectsObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {

        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.rotation, .5, { y: Math.PI * .5, ease: Expo.easeOut }, "=-1.5")
    }
}

window.addEventListener('mousemove', onMouseMove);

render();

const rightbutton = document.getElementById('right')
const leftbutton = document.getElementById('left')
const upbutton = document.getElementById('up')
const downbutton = document.getElementById('down')

function right() {
    //vrid kamera 45 grader åt höger
}

function left() {
    //vrid kamera 45 grader åt vänster
}

function up() {
    //vrid kamera 45 grader uppåt
}

function down() {
    //vrid kamera 45 grader neråt
}

rightbutton.addEventListener('click', right)
rightbutton.addEventListener('click', left)
rightbutton.addEventListener('click', up)
rightbutton.addEventListener('click', down)