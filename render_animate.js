function render(){
    renderer.render( scene, camera );
}

function animate() {
        // if(animation){
        //     requestAnimationFrame( animate );
        // }

        render();

}


setInterval(function(){animate()}, 1000);


