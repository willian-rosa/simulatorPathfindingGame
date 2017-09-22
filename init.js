function init(){
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( canvasWidth, canvasHeight );
    renderer.setClearColor( 0xdddddd, 1);

    contentInterface.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 45, canvasWidth / canvasHeight, 1, 10000);
    camera.lookAt( new THREE.Vector3() );
    camera.position.set(0, -650, 1200);
    camera.rotateX(0.4)

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    //colocando luz no ambiente
    ambientLight = new THREE.AmbientLight( 0xffffff);
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    scene.add( directionalLight );





    ////////////////////////////////////////////////////////////////////////////////////////


    //plano background
    loader.load( 'textures/background.jpg', function ( texture ) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 5, 5 );
        texture.anisotropy = 16;

        var geometry = new THREE.PlaneGeometry( 1100, 1100, 4 );
        var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 1 } );
        var planeBackground = new THREE.Mesh( geometry, material );
        planeBackground.position.z = -10;

        scene.add(planeBackground);

    } );

    //Criando grade visivel
    var size = 500, step = 50;
    var geometry = new THREE.Geometry();

    for ( var i = - size; i <= size; i += step ) {

        geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
        geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

        geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

    }

    var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );

    var line = new THREE.LineSegments( geometry, material );
    line.rotateX(Math.PI/2);
    scene.add( line );


    var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
    plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
    scene.add( plane );
    objects.push( plane );

    //Criando dados 
    obstaclesGeo = new THREE.BoxGeometry( 50, 50, 50 );
    obstaclesMaterial = new THREE.MeshLambertMaterial( { color: 0xaaaaaa, map: new THREE.TextureLoader().load( "textures/wall.png" ) } );



    document.getElementById('content-interface').addEventListener( 'mousedown', onDocumentMouseDown, false );


    render();
   
}