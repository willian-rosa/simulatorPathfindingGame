var MovingObject = function(object){
	
	this.object = object;
	this.enabled = false;
	this.selected = false;
	this.origin = object.position;
	this.vector = {i:0, j:0};
	this.dest = {};

	this._isPathFinding = false;

	this._listOpen = [];
	this._bestPath = [];

	this._countSearch = 0;

	this.run = function(grid){
		if(this.enabled === true){

			this._listOpen = [];
			
			this._countSearch = 0;

			var treeBestPath = this._getBestPath(grid);

			console.log('Busca feita em: ', this._countSearch);

			if(treeBestPath){

				this._bestPath = [];

				do{
					this._bestPath.unshift(treeBestPath);

					treeBestPath = treeBestPath.father;

				}while(treeBestPath);

				this._isPathFinding = true;
				this.enabled = false;
				this._move();
			}
		}else if(this._isPathFinding == true){
			this._move();

		}
	}

	this._move = function(){

		if(this._bestPath.length){

			var item = this._bestPath[0];

			this._bestPath.shift();

			this.vector.i = getValueScalar(item.y);
			this.vector.j = getValueScalar(item.x*-1);
			this.object.position.set(item.x, item.y, 0);

		}else{
			this._bestPath = [];
			this._isPathFinding = false;
		}



	}

	this._heuristic = function(adjacent){

		var x = adjacent.x - this.dest.x;
		var y = adjacent.y - this.dest.y;

		return Math.sqrt((x*x)+(y*y));

	}

	this._getBestPath = function(grid){

		this._listOpen = [];

		//Inicialize Q com o nó de busca (S) como única entrada;
		var pointStart = grid[this.vector.i][this.vector.j];
		pointStart.distanceStart = 0;
		pointStart.distance = 9999;
		this._listOpen.push(pointStart);

		//Se Q está vazio, interrompa. Se não, escolha o melhor elemento de Q;
		while(this._listOpen.length > 0 ){

			var item = this._listOpen[0];
			item.childs = [];

			//remove elemento
			this._listOpen.shift()

			//Se o estado (n) é um objetivo, retorne n;
			if(item.distance<50){
				return item;
				//TODO implementar		
				break;
			}

			this._countSearch++;

			var i = getValueScalar(item.y);
    		var j = getValueScalar(item.x*-1);

    		var groupAdjacents = this._getAdjacent(i, j, grid);

    		var adjacentShort = [];

    		for(var key in groupAdjacents.normal){

				var adjacent = groupAdjacents.normal[key].clone();

				if(!this._isTree(this._listOpen, adjacent)){

					item.childs.push(adjacent);

					adjacent.father = item;
					adjacent.distanceStart = item.distanceStart + 1;
					adjacent.distance = adjacent.distanceStart + this._heuristic(adjacent);

					adjacentShort.push(adjacent);

				}
			}
			/*
			for(var key in groupAdjacents.diagonal){

				var adjacent = groupAdjacents.normal[key].clone();

				if(!this._isTree(this._listOpen, adjacent)){
					item.childs.push(adjacent);

					adjacent.father = item;
					adjacent.distanceStart = item.distanceStart + 1.4;
					adjacent.distance = adjacent.distanceStart + this._heuristic(adjacent);

					adjacentShort.push(adjacent);

				}
			}
			*/

			var distance = 9999999;
			//ordenar
			for(var key in adjacentShort){
				if(distance >= adjacentShort[key].distance){
					distance = adjacentShort[key].distance;
					this._listOpen.push(adjacentShort[key]);
				}
	    	}


		}

		return null;

	}

	this._isTree = function(tree, search){

		if(tree && tree.length > 0){

			for(var key in tree){
				var item = tree[key];

				if(search.x === item.x && search.y === item.y){
					return item;
				}else{
					var itemFound = this._isTree(item, search);

					if(itemFound){
						return itemFound;
					}
				}
			}
		}

		return null;
	}

	this._getAdjacent = function(i, j, grid){

		var adjacents = {normal:[], diagonal: []};

		var vector = null;

		if(grid[i-1] && grid[i-1][j-1] && grid[i-1][j-1].dirty == false){
			adjacents.diagonal.push(grid[i-1][j-1]);
		}

		if(grid[i+1] && grid[i+1][j-1] && grid[i+1][j-1].dirty == false){
			adjacents.diagonal.push(grid[i+1][j-1]);
		}

		if(grid[i-1] && grid[i-1][j+1] && grid[i-1][j+1].dirty == false){
			adjacents.diagonal.push(grid[i-1][j+1]);
		}

		if(grid[i+1] && grid[i+1][j+1] && grid[i+1][j+1].dirty == false){
			adjacents.diagonal.push(grid[i+1][j+1]);
		}

		/////////////

		if(grid[i]   && grid[i][j-1] && grid[i][j-1].dirty == false){
			adjacents.normal.push(grid[i][j-1]);
		}

		if(grid[i-1] && grid[i-1][j]   && grid[i-1][j].dirty   == false){
			adjacents.normal.push(grid[i-1][j]);
		}

		if(grid[i+1] && grid[i+1][j]   && grid[i+1][j].dirty   == false){
			adjacents.normal.push(grid[i+1][j]);
		}

		if(grid[i]   && grid[i][j+1] && grid[i][j+1].dirty == false){
			adjacents.normal.push(grid[i][j+1] );
		}


		return adjacents;
	}

}