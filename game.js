function updateRaycaster(event){

    event.preventDefault();

    var positonScrollY = renderer.domElement.offsetTop-(document.body.scrollTop || document.documentElement.scrollTop);
    var positonScrollX = renderer.domElement.offsetLeft-document.documentElement.scrollLeft;

    mouse.x = ((event.clientX-positonScrollX) / canvasWidth ) * 2 - 1;
    mouse.y = - ((event.clientY-positonScrollY) / canvasHeight ) * 2 + 1;


    raycaster.setFromCamera( mouse, camera );

}

function createEarth(){
	var earthMaterial = new THREE.MeshLambertMaterial( { color: 0xaaaaaa, map: new THREE.TextureLoader().load( "textures/dirt.png" ) } );
    var earthGeo = new THREE.BoxGeometry( 50, 50, 1 );
    
    var obstacle = new THREE.Mesh( earthGeo, earthMaterial );
    obstacle.position.set(-475, 475, 1);
    objects.push(obstacle)
    scene.add( obstacle );
    
    var obstacle = new THREE.Mesh( earthGeo, earthMaterial );
    obstacle.position.set(-425, 475, 1);
    objects.push(obstacle)
    scene.add( obstacle );
    
    var obstacle = new THREE.Mesh( earthGeo, earthMaterial );
    obstacle.position.set(-475, 425, 1);
    objects.push(obstacle)
    scene.add( obstacle );
    
    var obstacle = new THREE.Mesh( earthGeo, earthMaterial );
    obstacle.position.set(-425, 425, 1);
    objects.push(obstacle)
    scene.add( obstacle );
}

function addObstacle(intersect){

	var obstacle = new THREE.Mesh( obstaclesGeo, obstaclesMaterial );
    obstacle.position.copy( intersect.point ).add( intersect.face.normal );

    obstacle.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

    objects.push(obstacle)

    scene.add( obstacle );
}

function addWarrior(){
    var textureWarrior = new THREE.Texture();

        var loaderImageWarrior = new THREE.ImageLoader();
        loaderImageWarrior.load( 'models/warrior.png', function ( image ) {

            textureWarrior.image = image;
            textureWarrior.needsUpdate = true;

        } );

        var loaderWarrior = new THREE.OBJLoader();

        // load a resource
         loaderWarrior.load(
            // resource URL
            'models/warrior.obj',
            // Function when resource is loaded
            function ( object ) {


                object.traverse( function ( child ) {

                    if ( child instanceof THREE.Mesh ) {
                        child.material.map = textureWarrior;

                    }

                } );

                object.scale.set(0.3, 0.3, 0.3);
                object.rotateX(Math.PI/2);
                object.position.set(-475, 475, 0);

                scene.add( object );
                objects.push( object );

                render();

            }
        );
}


function onDocumentMouseDown( event ) {
	updateRaycaster(event)

	
	var intersects = raycaster.intersectObjects( objects );

	if ( intersects.length > 0 ) {

		var intersect = intersects[ 0 ];

		//limitando para não colocar obstaculos em cima de outro
		if(intersect.point.z === 0){

			if(estadoJogo === 'criacaoMuro'){
				addObstacle(intersect);
			}


			render();
		}
	}



}