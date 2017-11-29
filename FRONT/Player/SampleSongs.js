// example of what a song object looks like
// retrieved from database

exampleParameter = {
	url: "soundcloud_or_youtube_URL",
	startTime: 0,
	endTime: 10000,
	meta: {
		title: "Song Name",
		artist: "Artist Name",
		album: "Album Name"
	}
}

// does not use boundaries
var FakeSong = function (url, title, artist) {
	this.url = url;
	this.startTime = 0;
	this.endTime = 99999;
	this.meta = {
		title: title,
		artist: artist,
		album: "Album Not Set"
	};
}

var sampleSongs = [];
sampleSongs.push(new FakeSong('https://soundcloud.com/moeshop/moshi-moshi-superstar', 'Superstar feat. Hentai Dude', 'Moe Shop'));
sampleSongs.push(new FakeSong('https://soundcloud.com/tsundere-alley/darling?in=tsundere-alley/sets/welcome-to-the-alley-ep', 'Darling', 'Tsundere Alley'));
sampleSongs.push(new FakeSong('https://soundcloud.com/ashmusiczone/sonic-3-knuckles-desert-palace-ashzone-remix', 'Desert Palace (AshZone Remix)', 'AshZone'));
sampleSongs.push(new FakeSong('https://www.youtube.com/watch?v=hcqoZZa3wVY&index=7&list=PL-WwL4yWuqkR8_vneC7jJwD1_P1YlujCn', 'Thank You', 'Sir J.'));
sampleSongs.push(new FakeSong('https://www.youtube.com/watch?v=nd-4DFm8hEA&index=24&list=PL-WwL4yWuqkR8_vneC7jJwD1_P1YlujCn', 'Rust (Beta)', 'El Huervo'));