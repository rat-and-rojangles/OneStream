var generateSongEntry = function (data) {
	var html = '<div class="song-entry"><li>';
	html += data.meta.title + '</li><ul>'
	html += '<li>' + data.meta.artist + ' | ' + data.meta.album + '</li>'
	html += '</ul></div>';
	return html;
}
RatWorks.registerComponent('song-entry', generateSongEntry);