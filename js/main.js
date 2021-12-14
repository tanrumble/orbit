//set-up
const G = 0.01; //constant gravity
const EM = 10; //earth mass
var diagonal = 0;
var unitX = 0;
var unitY = 0;
var unitZ = 0;
var acceleration = 0;
var velocity = 0;
var momentum = 0; //keep the orbit stabil
var mDif = 0; //check momentum difference

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// //light
const light = new THREE.PointLight( 0xffffff, 5, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

//earth
const geometryEarth = new THREE.SphereGeometry();
const materialEarth = new THREE.MeshStandardMaterial( { color: 0x00ff00} );
const sphereEarth = new THREE.Mesh( geometryEarth, materialEarth);
scene.add( sphereEarth );
camera.position.z = 10;

//moon
const geometryMoon = new THREE.SphereGeometry(0.2);
const materialMoon = new THREE.MeshStandardMaterial( { color: 0xFFFFFF} );
const sphereMoon = new THREE.Mesh( geometryMoon, materialMoon);
scene.add( sphereMoon );
sphereMoon.position.x = 5;

//orbit camera
const controls = new THREE.OrbitControls(camera, renderer.domElement);

//orbit velocity
diagonal = Math.sqrt(sphereMoon.position.x ** 2 + sphereMoon.position.y ** 2 + sphereMoon.position.z ** 2 );
velocity = Math.sqrt(G * EM / diagonal);

//momentum
momentum = velocity * diagonal;

function animate() {
    //physic
        //vector unit
        diagonal = Math.sqrt(sphereMoon.position.x ** 2 + sphereMoon.position.y ** 2 + sphereMoon.position.z ** 2 );
        unitX = sphereMoon.position.x / diagonal;
        unitY = sphereMoon.position.y / diagonal;
        unitZ = sphereMoon.position.z / diagonal;

        //gravity
        acceleration = G * EM / diagonal ** 2;
        
        //attraction
            //check condition where is moon not collide
            if (diagonal > 1.2 ) {
                sphereMoon.position.x -= unitX * acceleration;
                sphereMoon.position.y -= unitY * acceleration;
                sphereMoon.position.z -= unitZ * acceleration;
            }
        
        //orbiting
        mdif = velocity * diagonal - momentum;
        console.log(mdif);
        sphereMoon.position.y += unitX * velocity;
        sphereMoon.position.x -= unitY * velocity;

        

    //render stuff
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}
animate();
