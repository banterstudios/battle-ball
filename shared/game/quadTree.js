//(function(w) {
  'use strict';
  //SPATIAL PARTITIONING!
  var DEFAULT_POWER_OF_TWO = 5;
  
  function makeKeysFn(shift) {
    return function(obj) {
      var sx = obj.position.x-1 >> shift,
        sy = obj.position.y-1 >> shift,
        ex = (obj.position.x + obj.size.x+1) >> shift,
        ey = (obj.position.y + obj.size.y+1) >> shift,
        x, y, keys = [];
      for(y=sy;y<=ey;y++) {
        for(x=sx;x<=ex;x++) {
          keys.push("" + x + ":" + y);
        }
      }
      return keys;
    };
  }  
  
  /**
  * @param {number} power_of_two - how many times the rects should be shifted
  *                                when hashing
  */
  function QuadTree(power_of_two) {
    if (!power_of_two) {
      power_of_two = DEFAULT_POWER_OF_TWO;
    }
    this.getKeys = makeKeysFn(power_of_two);
    this.hash = {};
    this.list = [];
    this._lastTotalCleared = 0;
  }
  
  QuadTree.prototype.clear = function() {
    var key;
    for (key in this.hash) {
      if (this.hash[key].length === 0) {
        delete this.hash[key];
      } else {
        this.hash[key].length = 0;
      }
    }
    this.list.length = 0;
  };
  
  QuadTree.prototype.getNumBuckets = function() {
    var key, count = 0;
    for (key in this.hash) {
      if (this.hash.hasOwnProperty(key)) {
        if (this.hash[key].length > 0) {
          count++;
        }
      }
    }
    return count;
  };
  
  QuadTree.prototype.insert = function(obj, rect) {
    var keys = this.getKeys(rect || obj), key, i;
    this.list.push(obj);
    for (i=0;i<keys.length;i++) {
      key = keys[i];
      if (this.hash[key]) {
        this.hash[key].push(obj);
      } else {
        this.hash[key] = [obj];
      }
    }
  };
  
  QuadTree.prototype.retrieve = function(obj, rect) {
    return [];
    var ret = [], keys, i, key;
    if (!obj && !rect) {
      return this.list;
    }
    keys = this.getKeys(rect || obj);
    for (i=0;i<keys.length;i++) {
      key = keys[i];
      if (this.hash[key]) {
        ret = ret.concat(this.hash[key]);
      }
    }
    return ret;
  };

 
  QuadTree.prototype.Update=function(){
    /*this.clear();
      for(var i = 0, len = g_Level.children.length; i < len; i++)this.insert( g_Level.children[i] );
      for(var i = 0, len = g_Enemies.length; i < len; i++){
        this.insert( g_Enemies[i] );
        for(var j = 0, len2 = g_Enemies[i].coins.length; j < len2; j++){
          this.insert(g_Enemies[i].coins[j]);
        };
      };
      this.insert(g_Player);*/
  };
  
/*  var g_QuadTree = new QuadTree();
  self.addEventListener('message', function(e) {
    
    self.postMessage(e.data);
  }, false);*/

//})(this);