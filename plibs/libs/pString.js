String.prototype.toNumber = function(toInt){
    var sum = 0, i = 0;
	while(i < this.length){
		sum += Number(this.charCodeAt(i));
		i++;
	}
	if(toInt){sum = Math.floor(sum/this.length);}else{sum /= this.length;}
	return sum;
};