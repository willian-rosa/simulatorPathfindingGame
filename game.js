function updateRaycaster(event){

    event.preventDefault();
    
    var positonScrollY = renderer.domElement.offsetTop-(document.body.scrollTop || document.documentElement.scrollTop);
    var positonScrollX = renderer.domElement.offsetLeft-document.documentElement.scrollLeft;


    console.log(positonScrollX, positonScrollY)

    mouse.x = ((event.clientX-positonScrollX) / canvasWidth ) * 2 - 1;
    mouse.y = - ((event.clientY-positonScrollY) / canvasHeight ) * 2 + 1;

//    mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );


    raycaster.setFromCamera( mouse, camera );

}


function addObstacle(intersect){

	var obstacle = new THREE.Mesh( obstaclesGeo, obstaclesMaterial );
    obstacle.position.copy( intersect.point ).add( intersect.face.normal );

    obstacle.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

    objects.push(obstacle)

    scene.add( obstacle );
}


function onDocumentMouseDown( event ) {

	updateRaycaster(event)

	
	var intersects = raycaster.intersectObjects( objects );

	if ( intersects.length > 0 ) {
		var intersect = intersects[ 0 ];

		//limitando para não colocar obstaculos em cima de outro
		if(intersect.point.z === 0){
			addObstacle(intersect);

			render();
		}
	}



}