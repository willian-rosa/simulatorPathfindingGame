var MovingObject = function(object){
	
	this.object = object;
	this.enabled = false;
	this.selected = false;
	this.origin = object.position;
	this.vector = {i:0, j:0};
	this.dest = {};

	this._listOpen = [];
	this._listClose = [];

	this.run = function(grid){
		if(this.enabled === true){

			var groupAdjacents = this._getAdjacent(grid);

			for(var key in groupAdjacents.normal){

				var adjacent = groupAdjacents.normal[key];

				adjacent.distance = 1 + this._heuristic(adjacent);

				var index = this._listOpen.indexOf(adjacent)

				if(index >= 0){
					this._listOpen[index] = adjacent;
				}else{
					this._listOpen.push(adjacent);
				}
			}
			/*
			for(var key in groupAdjacents.diagonal){

				var adjacent = groupAdjacents.diagonal[key];

				adjacent.distance = 1.4 + this._heuristic(adjacent);

				var index = this._listOpen.indexOf(adjacent)

				if(index >= 0){
					this._listOpen[index] = adjacent;
				}else{
					this._listOpen.push(adjacent);
				}
			}
			*/


			var lowerValue = this._listOpen[0];


			for(var key in this._listOpen){

				var item = this._listOpen[key];

				if(this._listClose.indexOf(item) === -1 && lowerValue.distance > item.distance){
					lowerValue = this._listOpen[key];
				}
			}


			if(lowerValue.distance<50){
				this.enabled = false;
			}
			
			console.log(lowerValue.distance)

			
			this.vector.i = getValueScalar(lowerValue.y);
    		this.vector.j = getValueScalar(lowerValue.x*-1);
			this.object.position.set(lowerValue.x, lowerValue.y, 0);
			this._listClose.push(lowerValue);





		}
	}

	this._heuristic = function(adjacent){

		var x = adjacent.x - this.dest.x;
		var y = adjacent.y - this.dest.y;

		return Math.sqrt((x*x)+(y*y));

	}

	this._getAdjacent = function(grid){

		var adjacents = {normal:[], diagonal: []};

		var vector = null;

		if(grid[this.vector.i-1] && grid[this.vector.i-1][this.vector.j-1] && grid[this.vector.i-1][this.vector.j-1].dirty == false){
			adjacents.diagonal.push(grid[this.vector.i-1][this.vector.j-1]);
		}

		if(grid[this.vector.i+1] && grid[this.vector.i+1][this.vector.j-1] && grid[this.vector.i+1][this.vector.j-1].dirty == false){
			adjacents.diagonal.push(grid[this.vector.i+1][this.vector.j-1]);
		}

		if(grid[this.vector.i-1] && grid[this.vector.i-1][this.vector.j+1] && grid[this.vector.i-1][this.vector.j+1].dirty == false){
			adjacents.diagonal.push(grid[this.vector.i-1][this.vector.j+1]);
		}

		if(grid[this.vector.i+1] && grid[this.vector.i+1][this.vector.j+1] && grid[this.vector.i+1][this.vector.j+1].dirty == false){
			adjacents.diagonal.push(grid[this.vector.i+1][this.vector.j+1]);
		}

		/////////////

		if(grid[this.vector.i]   && grid[this.vector.i][this.vector.j-1] && grid[this.vector.i][this.vector.j-1].dirty == false){
			adjacents.normal.push(grid[this.vector.i][this.vector.j-1]);
		}

		if(grid[this.vector.i-1] && grid[this.vector.i-1][this.vector.j]   && grid[this.vector.i-1][this.vector.j].dirty   == false){
			adjacents.normal.push(grid[this.vector.i-1][this.vector.j]);
		}

		if(grid[this.vector.i+1] && grid[this.vector.i+1][this.vector.j]   && grid[this.vector.i+1][this.vector.j].dirty   == false){
			adjacents.normal.push(grid[this.vector.i+1][this.vector.j]);
		}

		if(grid[this.vector.i]   && grid[this.vector.i][this.vector.j+1] && grid[this.vector.i][this.vector.j+1].dirty == false){
			adjacents.normal.push(grid[this.vector.i][this.vector.j+1] );
		}


		return adjacents;
	}

	//TODO lista aberta terá o objeto e dentro o vertice {custo = 10, vertice={vertices}}

	//this._



}