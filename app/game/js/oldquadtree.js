 /*
	  * QuadTree Constructor
	  * @param Object bounds		bounds of the node, object with x, y, width, height
	  * @param Integer max_objects		(optional) max objects a node can hold before splitting into 4 subnodes (default: 10)
	  * @param Integer max_levels		(optional) total max levels inside root QuadTree (default: 4) 
	  * @param Integer level		(optional) deepth level, required for subnodes  
	  */
	function QuadTree( bounds, max_objects, max_levels, level ) {
		
		this.max_objects	= max_objects || 10;
		this.max_levels		= max_levels || 4;
		
		this.level 		= level || 0;
		this.bounds 		= bounds;
		
		this.objects 		= [];
		this.nodes 		= [];
	};
	
	
	/*
	 * Split the node into 4 subnodes
	 */
	QuadTree.prototype.split = function() {
		
		var nextLevel	= this.level + 1,
			subWidth	= Math.round( this.bounds.width / 2 ),
			subHeight 	= Math.round( this.bounds.height / 2 ),
			x 		= Math.round( this.bounds.x ),
			y 		= Math.round( this.bounds.y );		
	 
	 	//top right node
		this.nodes[0] = new QuadTree({
			x	: x + subWidth, 
			y	: y, 
			width	: subWidth, 
			height	: subHeight
		}, this.max_objects, this.max_levels, nextLevel);
		
		//top left node
		this.nodes[1] = new QuadTree({
			x	: x, 
			y	: y, 
			width	: subWidth, 
			height	: subHeight
		}, this.max_objects, this.max_levels, nextLevel);
		
		//bottom left node
		this.nodes[2] = new QuadTree({
			x	: x, 
			y	: y + subHeight, 
			width	: subWidth, 
			height	: subHeight
		}, this.max_objects, this.max_levels, nextLevel);
		
		//bottom right node
		this.nodes[3] = new QuadTree({
			x	: x + subWidth, 
			y	: y + subHeight, 
			width	: subWidth, 
			height	: subHeight
		}, this.max_objects, this.max_levels, nextLevel);
	};
	
	
	/*
	 * Determine which node the object belongs to
	 * @param Object pRect		bounds of the area to be checked, with x, y, width, height
	 * @return Integer		index of the subnode (0-3), or -1 if pRect cannot completely fit within a subnode and is part of the parent node
	 */
	QuadTree.prototype.getIndex = function( pRect ) {
		
		var 	index 			= -1,
			verticalMidpoint 	= this.bounds.x + (this.bounds.width / 2),
			horizontalMidpoint 	= this.bounds.y + (this.bounds.height / 2),
	 
			//pRect can completely fit within the top quadrants
			topQuadrant = (pRect.position.y < horizontalMidpoint && pRect.position.y + pRect.size.y < horizontalMidpoint),
			
			//pRect can completely fit within the bottom quadrants
			bottomQuadrant = (pRect.position.y > horizontalMidpoint);
		 

		 
		//pRect can completely fit within the left quadrants
		if( pRect.position.x < verticalMidpoint && pRect.position.x + pRect.size.x < verticalMidpoint ) {
			if( topQuadrant ) {
				index = 1;
			} else if( bottomQuadrant ) {
				index = 2;
			}
			
		//pRect can completely fit within the right quadrants	
		} else if( pRect.position.x > verticalMidpoint ) {
			if( topQuadrant ) {
				index = 0;
			} else if( bottomQuadrant ) {
				index = 3;
			}
		}
		
		return index;
	};
	
	
	/*
	 * Insert the object into the node. If the node
	 * exceeds the capacity, it will split and add all
	 * objects to their corresponding subnodes.
	 * @param Object pRect		bounds of the object to be added, with x, y, width, height
	 */
	QuadTree.prototype.insert = function( pRect ) {
		
		var 	i = 0,
	 		index;
	 	
	 	if((pRect.position.x) > (this.bounds.x+this.bounds.width) || (pRect.position.x+pRect.size.x) <= this.bounds.x || (pRect.position.y) > (this.bounds.y+this.bounds.height) || (pRect.position.y+pRect.size.y) <= this.bounds.y)
	 	//if(!pRect.inView)return false;

	 	//if we have subnodes ...
		if( typeof this.nodes[0] !== 'undefined' ) {
			index = this.getIndex( pRect );
	 
		  	if( index !== -1 ) {
				this.nodes[index].insert( pRect );	 
			 	return;
			}
		}
	 	
	 	this.objects.push( pRect );
		
		if( this.objects.length > this.max_objects && this.level < this.max_levels ) {
			
			//split if we don't already have subnodes
			if( typeof this.nodes[0] === 'undefined' ) {
				this.split();
			}
			
			//add all objects to there corresponding subnodes
			while( i < this.objects.length ) {
				
				index = this.getIndex( this.objects[ i ] );
				
				if( index !== -1 ) {					
					this.nodes[index].insert( this.objects.splice(i, 1)[0] );
				} else {
					i = i + 1;
			 	}
		 	}
		}
	 };
	 
	 
	/*
	 * Return all objects that could collide with the given object
	 * @param Object pRect		bounds of the object to be checked, with x, y, width, height
	 * @Return Array		array with all detected objects
	 */

	QuadTree.prototype.retrieve = function( pRect ) {
	 	
		var 	index = this.getIndex( pRect ),
			returnObjects = this.objects;
			
		//if we have subnodes ...
		if( typeof this.nodes[0] !== 'undefined' ) {
			
			//if pRect fits into a subnode ..
			if( index !== -1 ) {
				returnObjects = returnObjects.concat( this.nodes[index].retrieve( pRect ) );
				
			//if pRect does not fit into a subnode, check it against all subnodes
			} else {
				for( var i=0; i < this.nodes.length; i=i+1 ) {
					returnObjects = returnObjects.concat( this.nodes[i].retrieve( pRect ) );
				}
			}
		}
	 	

		return returnObjects;
	};
	
	
	/*
	 * Clear the quadtree
	 */
	QuadTree.prototype.clear = function() {
		
		this.objects = [];
	 
		for( var i=0; i < this.nodes.length; i=i+1 ) {
			if( typeof this.nodes[i] !== 'undefined' ) {
				this.nodes[i].clear();
		  	}
		}

		this.nodes = [];
	};

	/*
	UPDATE TREE
	*/
	QuadTree.prototype.Update=function(){
		this.bounds.x = g_Level.viewport.x;
		this.bounds.y = g_Level.viewport.y;
		this.clear();
		for(var i = 0, len = g_Level.children.length; i < len; i++)this.insert( g_Level.children[i] );
		for(var i = 0, len = g_Enemies.length; i < len; i++){
			this.insert( g_Enemies[i] );
			for(var j = 0, len2 = g_Enemies[i].coins.length; j < len2; j++){
				this.insert(g_Enemies[i].coins[j]);
			}
		}
		this.insert(g_Player);
	};















/**
 * QuadTree object.
 *
 * The quadrant indexes are numbered as below:
 *     |
 *  1  |  0
 * —-+—-
 *  2  |  3
 *     |
 */
/*
function QuadTree(boundBox, lvl) {
	var maxObjects = 10;
	this.bounds = boundBox || {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	var objects = [];
	this.nodes = [];
	var level = lvl || 0;
	var maxLevels = 5;
	
	this.clear = function() {
		objects = [];
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].clear();
		}
		this.nodes = [];
	};

	this.getAllObjects = function(returnedObjects) {
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].getAllObjects(returnedObjects);
		}
		for (var i = 0, len = objects.length; i < len; i++) {
			returnedObjects.push(objects[i]);
		}
		return returnedObjects;
	};
	
	this.findObjects = function(returnedObjects, obj) {
		if (typeof obj === "undefined") {
			console.log("UNDEFINED OBJECT");
			return;
		}
		var index = this.getIndex(obj);
		if (index != -1 && this.nodes.length) {
			this.nodes[index].findObjects(returnedObjects, obj);
		}
		for (var i = 0, len = objects.length; i < len; i++) {
			returnedObjects.push(objects[i]);
		}
		return returnedObjects;
	};
	
	this.insert = function(obj) {

		if (typeof obj === "undefined") {
			return;
		}
		if (obj instanceof Array) {
			for (var i = 0, len = obj.length; i < len; i++) {
				this.insert(obj[i]);
			}
			return;
		}
		if (this.nodes.length) {
			var index = this.getIndex(obj);
			// Only add the object to a subnode if it can fit completely
			// within one
			if (index != -1) {
				this.nodes[index].insert(obj);
				return;
			}
		}
		objects.push(obj);
		// Prevent infinite splitting
		if (objects.length > maxObjects && level < maxLevels) {
			if (this.nodes[0] == null) {
				this.split();
			}
			var i = 0;
			while (i < objects.length) {
				var index = this.getIndex(objects[i]);
				if (index != -1) {
					this.nodes[index].insert((objects.splice(i,1))[0]);
				}
				else {
					i++;
				}
			}
		}
	};
	
	this.getIndex = function(obj) {
		var index = -1;
		var verticalMidpoint = this.bounds.x + this.bounds.width / 2;
		var horizontalMidpoint = this.bounds.y + this.bounds.height / 2;
		// Object can fit completely within the top quadrant
		var topQuadrant = (obj.position.y < horizontalMidpoint && obj.position.y + obj.size.y < horizontalMidpoint);
		// Object can fit completely within the bottom quandrant
		var bottomQuadrant = (obj.position.y > horizontalMidpoint);
		// Object can fit completely within the left quadrants
		if (obj.position.x < verticalMidpoint &&
				obj.position.x + obj.size.x < verticalMidpoint) {
			if (topQuadrant) {
				index = 1;
			}
			else if (bottomQuadrant) {
				index = 2;
			}
		}
		// Object can fix completely within the right quandrants
		else if (obj.position.x > verticalMidpoint) {
			if (topQuadrant) {
				index = 0;
			}
			else if (bottomQuadrant) {
				index = 3;
			}
		}
		return index;
	};
	
	this.split = function() {
		// Bitwise or [html5rocks]
		var subWidth = (this.bounds.width / 2) | 0;
		var subHeight = (this.bounds.height / 2) | 0;
		this.nodes[0] = new QuadTree({
			x: this.bounds.x + subWidth,
			y: this.bounds.y,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[1] = new QuadTree({
			x: this.bounds.x,
			y: this.bounds.y,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[2] = new QuadTree({
			x: this.bounds.x,
			y: this.bounds.y + subHeight,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[3] = new QuadTree({
			x: this.bounds.x + subWidth,
			y: this.bounds.y + subHeight,
			width: subWidth,
			height: subHeight
		}, level+1);
	};

	this.Update=function(){
		this.bounds.x = g_Level.viewport.x;
		this.bounds.y = g_Level.viewport.y;

		this.clear();
		this.insert(g_Level.collisionChildren);
	}
}
window.objj = [];
QuadTree.detectCollision=function(quadTree, _elem, _cp) {

	quadTree.findObjects(obj = [], _elem);
	if(_elem.type==='Player'){window.objj = obj; console.log(obj.length);}

	for (y = 0, length = obj.length; y < length; y++) {
		// DETECT COLLISION ALGORITHM
		if(_elem.type==='Deer'&&obj[y].enemylayer&&obj[y].enemylayer!==10 || this.type==='Elf'&&obj[y].enemylayer&&obj[y].enemylayer!==10)continue;
		if(boundingBoxCollision(_elem,obj[y],_cp)){
			return (y+1); //plus one so we know it will return true;
		}
	}
};*/