var Library = function(){
	this.populateFromDB = function(){
		$.ajax({
			//
			success : function(){
				//
			}
		});
	}
	
	// first checks the link to see if it's valid.
	this.addToLibrary = function(link){ NOTIMPLEMENTED() }
}

var Song = function(){
	this.title = "title not set";
	this.artist = "artist not set";
	this.album = "album not set";
	this.genre = "genre not set";
	this.tags = [];
	
	this.link = "link not set";
	var fromYT = undefined;
	
	// SC uses milliseconds
	// YT uses seconds
	var startTime = 0;
	var endTime = 0;
	
	this.getStartTimeSeconds = function(){
		return fromYT ? startTime : startTime * 1000;
	}
	this.setStartTimeSeconds = function(seconds){
		startTime = fromYT ? seconds : seconds * 1000;
	}
}
