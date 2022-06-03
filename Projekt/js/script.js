// SCROLLKNAPPAR
const buttonRight = document.getElementById('slideright');
const buttonLeft = document.getElementById('slideleft');
const buttonList = document.getElementById('buttonlist')

buttonRight.onclick = function() {
    buttonList.scrollLeft += 640;
};

buttonLeft.onclick = function() {
    buttonList.scrollLeft -= 640;
};

buttonList.addEventListener('scroll', () => {
    if (buttonList.scrollLeft <= 0) {
        buttonLeft.classList.add('arrow-disabled')
        buttonRight.classList.remove('arrow-disabled')
    } else if (buttonList.scrollLeft >= 640) {
        buttonRight.classList.add('arrow-disabled')
        buttonLeft.classList.remove('arrow-disabled')
    } else {
        buttonLeft.classList.remove('arrow-disabled')
        buttonRight.classList.remove('arrow-disabled')
    }
})

// ASIDE
const aside = document.getElementById('aside');
const burger = document.getElementById('burger');

function toggleAside() {
    aside.classList.toggle('aside-inactive');
    burger.classList.toggle('crossed_line');
}

burger.addEventListener('click', () => {
    toggleAside();
})


// THREE.JS
let canvasHeight = window.innerHeight - 300
let canvasWidth = window.innerWidth

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, .01, 1000);

// controls = new THREE.OrbitControls(camera, domElement);
// controls.addEventListener('change', renderer);

let renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: true
});

renderer.setSize(canvasWidth, canvasHeight);
// renderer.localClippingEnabled = true;
document.body.appendChild(renderer.domElement);

let geometry;

// GEOMETRIES

// BOX
const box = document.getElementById('box');
box.addEventListener('click', () => {
    geometry = new THREE.BoxGeometry(2, 2, 2);
    updateGeometry();
})

// CONE
const cone = document.getElementById('cone');
cone.addEventListener('click', () => {
    geometry = new THREE.ConeGeometry(1.31, 2, 12);
    updateGeometry();
})

// ICOSAHEDRON
const icosahedron = document.getElementById('icosahedron');
icosahedron.addEventListener('click', () => {
    geometry = new THREE.IcosahedronGeometry(1.5, 0);
    updateGeometry();
})

// TORUS
const torus = document.getElementById('torus');
torus.addEventListener('click', () => {
    geometry = new THREE.TorusGeometry(1, 0.4, 15, 60);
    updateGeometry();
})

// CAPSULE
const capsule = document.getElementById('capsule');
capsule.addEventListener('click', () => {
    geometry = new THREE.CapsuleGeometry(1, 1.5, 2, 5);
    updateGeometry();
})

// PYRAMID
const pyramid = document.getElementById('pyramid');
pyramid.addEventListener('click', () => {
    geometry = new THREE.ConeGeometry(1.3, 2, 4);
    updateGeometry();
})

// DODECAHEDRON
const dodecahedron = document.getElementById('dodecahedron');
dodecahedron.addEventListener('click', () => {
    geometry = new THREE.DodecahedronGeometry(1.5, 1);
    updateGeometry();
})

// TORUSKNOT
const torusknot = document.getElementById('torusknot');
torusknot.addEventListener('click', () => {
    geometry = new THREE.TorusKnotGeometry();
    updateGeometry();
})

const objectColorPicker = document.getElementById('colorpicker_obj');
let objectColor = 0x444B59;

const lineColorpicker = document.getElementById('colorpicker_line')
let lineColor = 0xFFFFFF;

function updateColors() {
    objectColor = objectColorPicker.value;
    lineColor = lineColorpicker.value;
}

let material = new THREE.MeshLambertMaterial();
let object = new THREE.Mesh(geometry, material);
let light = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 1);
let line;

const wireframeoption = document.getElementById('wireframeoption');

function setMaterial() {
    if (wireframeoption.checked) {
        material = new THREE.MeshLambertMaterial({
            wireframe: true

            // clippingPlanes: [localPlane]
        });
    } else {
        material = new THREE.MeshLambertMaterial({
            color: objectColor

        });
    }
}

function updateGeometry() {

    updateColors();

    object.remove(line);
    scene.remove(object);
    scene.remove(light);

    setMaterial()

    object = new THREE.Mesh(geometry, material);
    let edges = new THREE.EdgesGeometry(geometry);
    line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: lineColor }));

    updateLines();
    scene.add(object);
    scene.add(light);
}

const lineoption = document.getElementById('lineoption');

function updateLines() {
    if (lineoption.checked) {
        object.remove(line);
    } else {
        object.add(line);
    }
}

const resetbutton = document.getElementById('resetbutton');
resetbutton.addEventListener('click', () => {
    window.location.reload(true);
})

camera.position.z = 5;
object.position.y = -1;


let mx = 0;
let my = 0;

function saveMouse(event) {
    mx = event.clientX;
    my = event.clientY;
}

document.onmousemove = saveMouse;

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, (window.innerHeight - 300));
    camera.aspect = window.innerWidth / (window.innerHeight - 300);
    camera.updateProjectionMatrix();
});

const xysection = document.getElementById('controlsection');
const xcontrol = document.getElementById('xcontrol');
const ycontrol = document.getElementById('ycontrol');

function rotationX() {
    if (xcontrol.checked) {
        object.rotation.x += 0;
    } else {
        object.rotation.x += 0.01;
    }
}

function rotationY() {
    if (ycontrol.checked) {
        object.rotation.y += 0;
    } else {
        object.rotation.y += 0.01;
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (controloption.checked) {
        xysection.style.pointerEvents = 'none';
        xysection.style.opacity = 0;
        xysection.style.transform = 'scaleY(0)';
        xysection.style.height = '0';


        object.rotation.y = (mx / 150);
        object.rotation.x = (my / 150) - 1000;
    } else {
        xysection.style.pointerEvents = 'initial';
        xysection.style.opacity = 1;
        xysection.style.transform = 'scaleY(1)'
        xysection.style.height = '75px';

        rotationX();
        rotationY();
    };

    renderer.render(scene, camera);
}
animate();