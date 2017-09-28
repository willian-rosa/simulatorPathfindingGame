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
    objects.push(obstacle);
    scene.add( obstacle );
    
    var obstacle = new THREE.Mesh( earthGeo, earthMaterial );
    obstacle.position.set(-425, 425, 1);
    objects.push(obstacle);
    scene.add( obstacle );
}

function getValueScalar(a){
    var x = (((a-25)/50)/0.02);
    return ((500-x)/50)-1;

}

function addObstacle(intersect){

	var obstacle = new THREE.Mesh( obstaclesGeo, obstaclesMaterial );
    obstacle.position.copy( intersect.point ).add( intersect.face.normal );

    obstacle.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

    var i = getValueScalar(obstacle.position.y);
    var j = getValueScalar(obstacle.position.x*-1);

    gridMovement[i][j].dirty = true;



    objects.push(obstacle)

    scene.add( obstacle );
}

function addWarrior(){


    var warrior = objectWarrior.clone();
    warrior.children[0].name = "warrior_"+movingObject.length;

    scene.add( warrior );

    var movingObj = new MovingObject(warrior);
    movingObject.push(movingObj);
    objects.push(warrior)

    render(false);
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
			}else if(estadoJogo == 'selecionar'){
                for(var key in movingObject){
                    var obj = movingObject[key];
                    if(obj.selected){
                        obj.dest =  intersect.point.clone();
                        obj.dest.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
                        obj.enabled = true;
                    }
                }

            }

			render(false);

		}else{

            if(intersect.object.name == 'group_warrior'){

                var movingObjSelect = null;

                for (var key in movingObject) {
                    var movingObj = movingObject[key];
                    movingObj.selected = false;

                    if(movingObj.object === intersect.object){
                        movingObjSelect = movingObj;
                    }
                }

                if(movingObjSelect){
                    movingObjSelect.selected = true;
                    estadoJogo = 'selecionar'
                }
            }
        }
	}



}