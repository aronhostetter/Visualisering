// SCROLLKNAPPAR
const buttonRight = document.getElementById("slideright");
const buttonLeft = document.getElementById("slideleft");
const buttonList = document.getElementById("buttonlist");

// OM DEN HÖGRA PILEN KLICKAS SKA BUTTONLIST SCROLLAS HELA VÄGEN ÅT HÖGER (640px INRÄKNAT MARGINS OCH KNAPP-BREDDER).
buttonRight.onclick = function() {
    buttonList.scrollLeft += 640;
};

// OM DEN VÄNSTRA PILEN KLICKAS SKA BUTTONLIST SCROLLAS HELA VÄGEN ÅT VÄNSTER (640px INRÄKNAT MARGINS OCH KNAPP-BREDDER).
buttonLeft.onclick = function() {
    buttonList.scrollLeft -= 640;
};

// FUNKTIONEN KÖRS VID SCROLL AV FÖRÄLDERN buttonList. OM INTE DENNA FUNKTION FINNS KOMMER KNAPPARNA INTE ÄNDRAS NÄR ANVÄNDAREN SCROLLAR MANUELLT MED HJÄLP AV MUSPLATTAN.
buttonList.addEventListener("scroll", () => {
    if (buttonList.scrollLeft <= 0) {
        buttonLeft.classList.add("arrow-disabled");
        buttonRight.classList.remove("arrow-disabled");
    } else if (buttonList.scrollLeft >= 640) {
        buttonRight.classList.add("arrow-disabled");
        buttonLeft.classList.remove("arrow-disabled");
    } else {
        buttonLeft.classList.remove("arrow-disabled");
        buttonRight.classList.remove("arrow-disabled");
    }
});

// ASIDE
const aside = document.getElementById("aside");
const burger = document.getElementById("burger");

// KÖRS NÄR HAMBUGERMENYN TRYCKS PÅ.
burger.addEventListener("click", () => {
    aside.classList.toggle("aside-inactive");
    burger.classList.toggle("crossed_line");
});

// THREE.JS
let canvasHeight = window.innerHeight - 300;
let canvasWidth = window.innerWidth;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
    75,
    canvasWidth / canvasHeight,
    0.01,
    1000
);

// SKAPAR RENDERER. ALPHA SÄTTER BAKGRUNDEN TILL ICKE-TRANSPARENT. ANTIALIAS ÄR EN KANTUTJÄMNING PÅ OBJEKT.
let renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: true
});

let geometry;

renderer.setSize(canvasWidth, canvasHeight);
document.body.appendChild(renderer.domElement);


// VARENDA EN AV DESSA DELAR GÖR GEOMETRY TILL RESPEKTIVE OBJEKT NÄR KNAPPEN FÖR OBJEKTET TRYCKS. VISSA ÄR AV STANDARDMÅTT (INGA ARGUMENT) OCH VISSA HAR BESTÄMDA MÅTT SOM ÄNDRATS BEROENDE PÅ FORM.
// BOX
const box = document.getElementById("box");
box.addEventListener("click", () => {
    geometry = new THREE.BoxGeometry(2, 2, 2);
    updateGeometry();
});

// CONE
const cone = document.getElementById("cone");
cone.addEventListener("click", () => {
    geometry = new THREE.ConeGeometry(1.3, 2, 12);
    updateGeometry();
});

// ICOSAHEDRON
const icosahedron = document.getElementById("icosahedron");
icosahedron.addEventListener("click", () => {
    geometry = new THREE.IcosahedronGeometry(1.5, 0);
    updateGeometry();
});

// TORUS
const torus = document.getElementById("torus");
torus.addEventListener("click", () => {
    geometry = new THREE.TorusGeometry(1, 0.4, 15, 60);
    updateGeometry();
});

// CAPSULE
const capsule = document.getElementById("capsule");
capsule.addEventListener("click", () => {
    geometry = new THREE.CapsuleGeometry(1, 1.5, 2, 5);
    updateGeometry();
});

// PYRAMID
const pyramid = document.getElementById("pyramid");
pyramid.addEventListener("click", () => {
    geometry = new THREE.ConeGeometry(1.3, 2, 4);
    updateGeometry();
});

// DODECAHEDRON
const dodecahedron = document.getElementById("dodecahedron");
dodecahedron.addEventListener("click", () => {
    geometry = new THREE.DodecahedronGeometry(1.5, 1);
    updateGeometry();
});

// TORUSKNOT
const torusknot = document.getElementById("torusknot");
torusknot.addEventListener("click", () => {
    geometry = new THREE.TorusKnotGeometry();
    updateGeometry();
});

// LIFECYCLE FUNCTIONS
const objectColorPicker = document.getElementById("colorpicker_obj");
const lineColorpicker = document.getElementById("colorpicker_line");
const wireframeoption = document.getElementById("wireframeoption");

const lineoption = document.getElementById("lineoption");

const resetbutton = document.getElementById("resetbutton");

const xysection = document.getElementById("controlsection");
const xcontrol = document.getElementById("xcontrol");
const ycontrol = document.getElementById("ycontrol");

let objectColor = 0x444b59;
let lineColor = 0xffffff;

let material = new THREE.MeshLambertMaterial();
let object = new THREE.Mesh(geometry, material);
let light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
let line;

let mx = 0;
let my = 0;

// SÄTTER ALLA FÄRGER FÖR OBJEKTMATERIAL OCH KONTURLINJER TILL VÄRDENA PÅ FÄRGVÄLJARNA I OPTIONS-KATEGORIN.
function updateColors() {
    objectColor = objectColorPicker.value;
    lineColor = lineColorpicker.value;
}

// DENNA FUNKTION ÄNDRAR LINJERNA BEROENDE PÅ CHECKBOXEN FÖR BORTTAGNING AV KONTURLINJER.
function updateLines() {
    if (lineoption.checked) {
        object.remove(line);
    } else {
        object.add(line);
    }
}

// DENNA FUNKTION GER RÄTT MATERIAL BEROENDE PÅ OM WIREFRAME-INSTÄLLNINGEN ÄR IKRYSSAD. WIREFRAME BETER SIG SOM ETT MATERIAL OCH DET ÄR DÄRFÖR DET BILDAS SKUGGOR FÖR LINJERNA I BOTTEN PÅ OBJEKT. FÖR ATT SE DET KAN DU VÄLJA ETT OBJEKT, KRYSSA I WIREFRAME OCH TA BORT KONTURLINJER. NÄR OBJEKTET SEDAN ROTERAS SYNS LINJERNA EFTERSOM DET ENDA LJUSET ÄR UPPIFRÅN.
function setMaterial() {
    if (wireframeoption.checked) {
        material = new THREE.MeshLambertMaterial({
            wireframe: true,
        });
    } else {
        material = new THREE.MeshLambertMaterial({
            color: objectColor,
        });
    }
}

// DENNA FUNKTION SKAPAR OBJEKTET MED GEOMETRY OCH MATERIAL SOM ARGUMENT MED NYA INSTÄLLNINGAR EFTER ATT DET FÖRRA RENSATS HELT. DET SKER EFTER VARJE ÄNDRING AV INSTÄLLNINGAR.
// SE onchange="updateGeometry()" I HTML KODEN.
function updateGeometry() {
    updateColors();

    object.remove(line);
    scene.remove(object);
    scene.remove(light);

    setMaterial();

    object = new THREE.Mesh(geometry, material);
    let edges = new THREE.EdgesGeometry(geometry);
    line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: lineColor })
    );

    updateLines();
    scene.add(object);
    scene.add(light);
}

camera.position.z = 5;
object.position.y = -1;

// DEN HÄMTAR MUSENS KOORDINATER NÄR DEN RÖR PÅ SIG. HADE KUNNAT VARA EN EVENTLISTENER ISTÄLLET.
document.onmousemove = (event) => {
    mx = event.clientX;
    my = event.clientY;
};

// KOLLAR OM ENBART ROTATIONEN I X-LED SKA VARA 0 ELLER O.01 BEROENDE PÅ OM VERTICAL ROTATION ÄR IKRYSSAT.
function rotationX() {
    if (xcontrol.checked) {
        object.rotation.x += 0;
    } else {
        object.rotation.x += 0.01;
    }
}

// KOLLAR OM ENBART ROTATIONEN I Y-LED SKA VARA 0 ELLER O.01 BEROENDE PÅ OM HORIZONTAL ROTATION ÄR IKRYSSAT.
function rotationY() {
    if (ycontrol.checked) {
        object.rotation.y += 0;
    } else {
        object.rotation.y += 0.01;
    }
}

// DETTA ÄR MAIN FUNKTIONEN SOM RENDERAR ALLT INNEHÅLL PÅ HEMSIDAN. DEN KONTROLLERAR OCKSÅ HURUVIDA VISNINGEN AV OBJEKTET SKA SKE, GENOM MUSKONTROLL ELLER FAST ROTATION.
function animate() {
    requestAnimationFrame(animate);

    if (controloption.checked) {
        xysection.style.pointerEvents = "none";
        xysection.style.opacity = 0;
        xysection.style.transform = "scaleY(0)";
        xysection.style.height = "0";

        object.rotation.y = mx / 150;
        object.rotation.x = my / 150 - 1000;
    } else {
        xysection.style.pointerEvents = "initial";
        xysection.style.opacity = 1;
        xysection.style.transform = "scaleY(1)";
        xysection.style.height = "75px";

        rotationX();
        rotationY();
    }
    renderer.render(scene, camera);
}

// DETTA ÄR EN AV PROGRAMMETS VIKTIGASTE FUNKTIONER OCH DET DEN GÖR ÄR ATT ÄNDRA RENDERINGEN OCH KAMERANS STORLEK OM FÖNSTERSTORLEKEN ÄNDRAS. 
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, (window.innerHeight - 300));
    camera.aspect = window.innerWidth / (window.innerHeight - 300);
    camera.updateProjectionMatrix();
});

// DENNA FUNKTION STARTAR OM SIDAN FÖR ATT PÅ ETT SNABBT OCH ENKELT SÄTT NOLLSTÄLLA HELA <FORM> ELEMENTET OCH ÄVEN GEOMETRIES OCH MATERIAL EXEMPELVIS.
resetbutton.addEventListener("click", () => {
    window.location.reload(true);
});

// HÄR KÖRS HUVUDFUNKTIONEN OCH PROGRAMMET STARTAR.
animate();