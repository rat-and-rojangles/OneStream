Number.prototype.isInteger = function () {
	return Math.round(this) === this;
}

Array.prototype.validIndex = function (index) {
	return index.isInteger() && index >= 0 && index < this.length;
}
Array.prototype.randomElement = function () {
	return this[Math.floor(Math.random() * this.length)];
}

Math.lerp = function (a, b, t) {
	return (1 - t) * a + t * b;
}

String.prototype.isAlphaNumeric = function () {
	for (var x = 0; x < this.length; x++) {
		var cc = this.charCodeAt(x);
		if ((cc >= 48 && cc <= 57) || (cc >= 65 && cc <= 90) || (cc >= 97 && cc <= 122)) {
			return false;
		}
	}
	return true;
}

String.prototype.equalsIgnoreCase = function (other) {
	return this.toLowerCase() == other.toLowerCase();
}
String.prototype.includesIgnoreCase = function (other) {
	return this.toLowerCase().includes(other.toLowerCase());
}

var stripLinkForYouTubeID = function (youtubeLink) {
	if (youtubeLink.includes('youtu.be/')) {
		var video_id = (" " + youtubeLink).split('youtu.be/')[1];
		var questionPosition = video_id.indexOf('?');
		if (questionPosition != -1) {
			video_id = video_id.substring(0, questionPosition);
		}
	}
	else if (youtubeLink.includes('v=')) {
		var video_id = youtubeLink.split('v=')[1];
		var ampersandPosition = video_id.indexOf('&');
		if (ampersandPosition != -1) {
			video_id = video_id.substring(0, ampersandPosition);
		}
	}
	else {
		return;
	}
	return video_id;
}

Number.prototype.clamped = function (min, max) {
	if (this < min) {
		return min;
	}
	else if (this > max) {
		return max;
	}
	return this;
};

Number.prototype.clampedLower = function (min) {
	if (this < min) {
		return min;
	}
	return this;
};

Number.prototype.clampedUpper = function (max) {
	if (this > max) {
		return max;
	}
	return this;
};
