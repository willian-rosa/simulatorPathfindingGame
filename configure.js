var contentInterface = document.getElementById('content-interface');
var renderer, camera, scene, font, prepareNewVertex, prepareNewEdge = null;

var intersection = new THREE.Vector3();

//canvas
var canvasWidth = 900, canvasHeight = 600;


//luz
var ambientLight;

//movimentação
var mouse, raycaster;

//objetos
var loader = new THREE.TextureLoader();
var plane,
	cubeGeo,
	cubeMaterial,
	objects = [];


