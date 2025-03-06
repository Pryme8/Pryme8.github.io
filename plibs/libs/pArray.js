Array.prototype.last = function(){
	return this[this.length-1];
};

Array.prototype.add = function(a, ignoreLength){
	var x,y;
	if(this.length>=a.length){
		x = this; y = a;
	}else{
		x = a; y = this;
	}
		
	var r = [];	
	for(var i=0; i<x.length; i++){
		if(!ignoreLength && i==y.length){
			return r;
		}
		if(i>=y.length){
			r.push(x[i]);
		}else{
			r.push(x[i]+y[i]);
		}
	}	
	return r;	
};


//Thank you @Adam for this solution!
//http://www.html5gamedevs.com/profile/4289-adam/
Array.prototype.cross = function(a){
	var x,y,z = [];
	if(this.length>=a.length){x=this;y=a;}else{x=a;y=this;}
	var xl = x.length;
	for(var i=0; i<xl; i++){
		 z[i] = parseFloat(x[(i + xl - 2) % xl] * y[(i + xl - 1) % xl] - x[(i + xl - 1) % xl] * y[(i + xl - 2) % xl]);
	}
	return z;
}

