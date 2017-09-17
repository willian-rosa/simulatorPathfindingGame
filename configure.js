var contentInterface = document.getElementById('content-interface');
var renderer, camera, scene, font, prepareNewVertex, prepareNewEdge = null;

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster()
var intersection = new THREE.Vector3();

//canvas
var canvasWidth = 900, canvasHeight = 600;


//objetos
var loader = new THREE.TextureLoader();
var plane = new THREE.Plane(),
	planeBackground;


