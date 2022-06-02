// SCROLLKNAPPAR
const buttonRight = document.getElementById('slideright');
const buttonLeft = document.getElementById('slideleft');
const buttonlist = document.getElementById('buttonlist')

buttonRight.onclick = function() {
    buttonlist.scrollLeft += 640;
};

buttonLeft.onclick = function() {
    buttonlist.scrollLeft -= 640;
};


// THREE.JS

const canvasheight = window.innerHeight - 300
const canvaswidth = window.innerWidth

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, canvaswidth / canvasheight, .01, 1000);

// controls = new THREE.OrbitControls(camera, domElement);
// controls.addEventListener('change', renderer);

var renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: true
});
renderer.setSize(canvaswidth, canvasheight);
document.body.appendChild(renderer.domElement);

var geometry;

// GEOMETRIES

// BOX
const box = document.getElementById('box');
box.addEventListener('click', () => {
    console.log("box");
    geometry = new THREE.BoxGeometry(2, 2, 2);
    updateGeometry();
})

// CONE
const cone = document.getElementById('cone');
cone.addEventListener('click', () => {
    console.log("cone");
    geometry = new THREE.ConeGeometry(1.31, 2, 12);
    updateGeometry();
})

// ICOSAHEDRON
const icosahedron = document.getElementById('icosahedron');
icosahedron.addEventListener('click', () => {
    console.log("icosahedron");
    geometry = new THREE.IcosahedronGeometry(1.5, 0);
    updateGeometry();
})

// TORUS
const torus = document.getElementById('torus');
torus.addEventListener('click', () => {
    console.log("torus");
    geometry = new THREE.TorusGeometry(1, 0.4, 15, 60);
    updateGeometry();
})

// CAPSULE
const capsule = document.getElementById('capsule');
capsule.addEventListener('click', () => {
    console.log("capsule");
    geometry = new THREE.CapsuleGeometry(1, 1.5, 2, 5);
    updateGeometry();
})

// PYRAMID
const pyramid = document.getElementById('pyramid');
pyramid.addEventListener('click', () => {
    console.log("pyramid");
    // geometry = new THREE.TetrahedronGeometry();
    geometry = new THREE.ConeGeometry(1.3, 2, 4);
    updateGeometry();
})

// DODECAHEDRON
const dodecahedron = document.getElementById('dodecahedron');
dodecahedron.addEventListener('click', () => {
    console.log("dodecahedron");
    geometry = new THREE.DodecahedronGeometry(1.5, 1);
    updateGeometry();
})

// TORUSKNOT
const torusknot = document.getElementById('torusknot');
torusknot.addEventListener('click', () => {
    console.log("torusknot");
    geometry = new THREE.TorusKnotGeometry();
    updateGeometry();
})

const objectcolorpicker = document.getElementById('colorpicker_obj');
var objectcolor = 0x444B59;

const linecolorpicker = document.getElementById('colorpicker_line')
var linecolor = 0xFFFFFF;

function updateColors() {
    console.log("colorupdate")
    objectcolor = objectcolorpicker.value;
    linecolor = linecolorpicker.value;
    // linecolor = 0xFFFFFF;
    // objectcolor = 0x444B59;
}

var material = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF
});
var object = new THREE.Mesh(geometry, material);
var light = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 1);
var edges = new THREE.EdgesGeometry(geometry);
var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: linecolor }));
object.add(line);

function updateGeometry() {

    updateColors();

    object.remove(line);
    scene.remove(object);
    scene.remove(light);

    material = new THREE.MeshLambertMaterial({
        color: objectcolor
    });
    object = new THREE.Mesh(geometry, material);
    edges = new THREE.EdgesGeometry(geometry);
    line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: linecolor }));

    // if sats för line och light med variabel från checkboxes
    updateLines();
    scene.add(object);
    scene.add(light);
}

var lineoption = document.getElementById('lineoption');

function updateLines() {
    if (lineoption.checked == true) {
        object.remove(line);
    } else {
        object.add(line);
    }
}

const resetbutton = document.getElementById('resetbutton');
resetbutton.addEventListener('click', () => {
    scene.remove(light);
    object.remove(line);
    scene.remove(object);
    linecolor = 0xFFFFFF;
    objectcolor = 0x444B59;
    console.log("reset");
})

camera.position.z = 5;
object.position.y = -1;


var mx = 0;
var my = 0;

function saveMouse(event) {
    mx = event.clientX;
    my = event.clientY;
}

document.onmousemove = saveMouse;

window.addEventListener('resize', () => {
    renderer.setSize((window.innerWidth), (window.innerHeight));
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate() {
    requestAnimationFrame(animate);

    object.rotation.y = (mx / 150);
    object.rotation.x = (my / 150) - 1000;

    renderer.render(scene, camera);
}
animate();