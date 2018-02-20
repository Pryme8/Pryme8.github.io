Date.prototype.getDateRange = function(stopDate){
	var _r = new Array();
	var cd = this;
	if(cd < stopDate){	
		while(cd <= stopDate){
			_r.push(new Date(cd));
			cd = cd.addDays(1);
		}
	}else{
		while(cd >= stopDate){
			_r.push(new Date(cd));
			cd = cd.addDays(-1);
		}
	}	
	return _r;
};

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

Date.prototype.daysInMonth= function(){
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
};

Date.prototype.monthName = function(short){
	if(!short){short=0}else{short=1};
	var monthNames = [
	['January', 'Jan'],
	['Feburary', 'Feb'],
	['March', 'Mar'],
	['April', 'Apr'],
	['May', 'May'],
	['June', 'Jun'],
	['July', 'Jul'],	
	['August', 'Aug'],	
	['September', 'Sep'],
	['October', 'Oct'],
	['November', 'Nov'],	
	['December', 'Dec']];			
    return monthNames[this.getMonth()][short];
}