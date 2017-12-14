var currentPage = -1;
var PAGES = {};
PAGES.Search = 0;
PAGES.AddSong = 1;
PAGES.Artist = 2;
PAGES.Album = 3;
PAGES.Library = 4;
PAGES.Playlists = 5;
PAGES.SpecificPlaylist = 6;
PAGES.Queue = 7;


var showSearch = function () {
	currentPage = PAGES.Search;
	$("#main-header").html(`<div>
	<div class="song-view">
			<input id="song-searcher" type="text">
	</div>
</div>`);
	songSelection = new SongSelection();
	var searchJQ = $('#song-searcher');
	searchJQ.on('input', function () {
		songSelection = new SongSelection(library.search(searchJQ.val()));
	});
}

var showAddSong = function () {
	currentPage = PAGES.AddSong;
	$("#main-header").html(
		`<h1 class="white_header">Add New Song</h1>`
	)
	$("#song-list").html(
		`<form id="addSongForm" class="jumbotron">
		    Title:
		    <input id = "title_input" type = 'text'><br />
		    Artist:
		    <input id = "artist_input" type = 'text'><br />
		    Album:
		    <input id = "album_input" type = 'text'><br />
		    Genre:
		    <input id = "genre_input" type = 'text'><br />
		    URL:
		    <input id = "url_input" type = 'text'><br />
		    <button id = "submit-song"> Add Song </button>
		</form>`
	);
	$("#addSongForm").on('submit', function (e) {
		e.preventDefault();

		var title = $("#title_input").val();
		var artist = $("#artist_input").val();
		var album = $("#album_input").val();
		var genre = $("#genre_input").val();
		var song_url = $("#url_input").val();
		var user = user_id_global;

		var url = "PHP/AddNewSong.php";

		var data = { title: title, artist: artist, album: album, genre: genre, song_url: song_url, user: user };
		var newSong = JSON.parse(JSON.stringify(data));
		newSong.url = newSong.song_url;

		// setup the ajax request
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			dataType: 'JSON',
			success: function (result) {
				alert(success);
				alert(result);
			},
			error: function (result) {
				console.log(result);
			}
		});
		library.addToLibrary(newSong);
		showLibrary();
	});
}

var showAlbum = function (albumName) {
	currentPage = PAGES.Album;
	setHeader(albumName);
	songSelection = new SongSelection(library.filterByParameter('album', albumName));
}

var showArtist = function (artistName) {
	currentPage = PAGES.Artist;
	setHeader(artistName);
	songSelection = new SongSelection(library.filterByParameter('artist', artistName));
}


var showLibrary = function () {
	currentPage = PAGES.Library;
	setHeader('Library', true);
	songSelection = new SongSelection(library.getSongs());
}

var showPlaylists = function () {
	currentPage = PAGES.Playlists;
	setHeader('Playlists');
	songSelection = new SongSelection();
	var jqParent = $("#song-list");
	library.getPlaylists().forEach(function (playlist) {
		let newElement = RatWorks.appendNewComponent('playlist-entry', playlist.toRatData(), jqParent);
		newElement.find('.playlist-name').on('click', function () {
			showSpecificPlaylist(playlist);
		});
	});
}

var showSpecificPlaylist = function (playlist) {
	currentPage = PAGES.SpecificPlaylist;
	setHeader(playlist.name);
	songSelection = new SongSelection(playlist.getSongs());
}

var showQueue = function () {
	currentPage = PAGES.Queue;
	setHeader('Queue');
	$("#main-header").find('button').remove();
	songSelection = new SongSelection(player.getQueuedSongs(), true);
	$('.queue-next-button').remove();
	$('.queue-end-button').remove();
	$('.song-view').find('.song-name').off('click');
	$('.song-view').find('.song-name').removeClass('hover');
}

var showAddSongPrompt = function () {
	NOTIMPLEMENTED();
}

var setHeader = function (name, isLibrary) {
	let jqHeader = $("#main-header");
	jqHeader.html('');
	RatWorks.appendNewComponent('play-header', { name: name, isLibrary: isLibrary }, jqHeader);
}

var updateCurrentSong = function (song) {
	if (song) {
		$("#current-song").html('<h4>' + song.title + '</h4><span id="current-song-artist" class="hover">' + song.artist + '</span><span> | </span><span id="current-song-album" class="hover">' + song.album + '</span>');
		$("#current-song-artist").on('click', function () {
			showArtist(song.artist);
		});
		$("#current-song-album").on('click', function () {
			showArtist(song.album);
		});
	}
	else {
		$("#current-song").html('');
	}
}
