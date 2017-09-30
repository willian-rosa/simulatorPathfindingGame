function render(updateObjects){

	if(updateObjects){

		for(var key in movingObject){
			var obj = movingObject[key];

			obj.run(gridMovement);
		}

	}

    renderer.render( scene, camera );
}

function animate() {
        // if(animation){
        //     requestAnimationFrame( animate );
        // }

        render(true);

}


setInterval(function(){animate()}, 1000);


