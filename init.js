function init(){
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( canvasWidth, canvasHeight );
    renderer.setClearColor( 0xdddddd, 1);

    contentInterface.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 45, canvasWidth / canvasHeight, 1, 10000);
    //camera.position.set( 500, 1000, 1000 );
    camera.lookAt( new THREE.Vector3() );
    camera.position.set(0, -650, 1200);
    camera.rotateX(0.4)



    //plano background
    var loaderBackground = new THREE.TextureLoader();
    loaderBackground.load( 'textures/background.jpg', function ( texture ) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 5, 5 );
        texture.anisotropy = 16;

        var geometry = new THREE.PlaneGeometry( 1100, 1100, 4 );
        var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 1 } );
        var planeBackground = new THREE.Mesh( geometry, material );
        planeBackground.position.z = -10;

        scene.add(planeBackground);

    } );


    gridHelper = new THREE.GridHelper( 1000, 30 );
    gridHelper.rotateX(Math.PI/2);

    scene.add( gridHelper );


    render();
   
}