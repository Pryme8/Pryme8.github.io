Number.prototype.inRange = function(a,b){
	if((this) >= a && (this) < b){
	return true	
	}else{
	return false	
	}
};

Number.prototype.shiftRange = function(a,b,c,d){
	
	var or = (b - a);
	var nr, v;
	if (or == 0){
		nr = c;
	}else{
		nr = (d - c);		
	}	
	v = (((this - a) * nr) / or) + c;
	
	return v;
}