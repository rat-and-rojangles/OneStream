var generateSongEntry = function (data) {
	var html = '<div class="song-entry><li>';
	html += data.title + '</li><ul>'
	html += '<li>' + data.album + '</li>'
	html += '</ul></div>';
	return html;
}
RatWorks.registerComponent('song-entry', generateSongEntry);
