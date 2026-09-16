(function(){
	// Daftar nama file lagu yang tersedia di folder asset/music
	const playlist = [
		'Fabio Asher - Rumah Singgah.mp3',
		'Ungu - Cinta Dalam Hati.mp3',
		'Ed Sheeran - Happier.mp3',
		'Yovie & Nuno - Manusia Biasa.mp3'
	];
	let currentTrack = 0;

	// Membuat elemen audio utama untuk memutar lagu
	const song = document.createElement('audio');
	song.id = 'song';
	song.preload = 'auto';
	// Lagu berpindah otomatis saat selesai melalui event "ended" di bawah
	song.loop = false;
	const normalVolume = 1;
	song.volume = normalVolume;

	// Membuat popup music player dan tombol-tombolnya
	const musicPlayer = document.createElement('div');
	musicPlayer.className = 'music-player is-hidden';
	musicPlayer.id = 'musicPlayer';
	musicPlayer.setAttribute('aria-label', 'Pemutar musik');
	musicPlayer.innerHTML = `
		<div class="music-info">
			<span class="music-title" id="musicTitle"></span>
			<span class="music-status" id="musicStatus">Jeda</span>
		</div>
		<div class="music-controls">
			<button id="musicPrevious" type="button" aria-label="Lagu sebelumnya">&#9664;&#9664;</button>
			<button id="musicToggle" type="button" aria-label="Putar lagu">Play</button>
			<button id="musicNext" type="button" aria-label="Lagu berikutnya">&#9654;&#9654;</button>
		</div>
	`;
	document.body.append(song, musicPlayer);

	// Mengambil elemen kontrol music player
	const musicTitle = document.getElementById('musicTitle');
	const musicToggle = document.getElementById('musicToggle');
	const musicPrevious = document.getElementById('musicPrevious');
	const musicNext = document.getElementById('musicNext');
	const musicStatus = document.getElementById('musicStatus');

	// Memilih lagu, memperbarui judul, dan memulai lagu jika diminta
	function setTrack(index, shouldPlay){
		currentTrack = (index + playlist.length) % playlist.length;
		const fileName = playlist[currentTrack];
		song.src = 'asset/music/' + encodeURIComponent(fileName).replace(/%2F/g, '/');
		musicTitle.textContent = fileName.replace(/\.[^/.]+$/, '');
		song.load();
		if(shouldPlay) song.play().catch(()=>{});
		updateMusicControls();
	}

	// Menyamakan teks tombol dan status dengan kondisi audio
	function updateMusicControls(){
		const isPlaying = !song.paused;
		musicToggle.textContent = isPlaying ? 'Jeda' : 'Play';
		musicToggle.setAttribute('aria-label', isPlaying ? 'Jedaikan lagu' : 'Putar lagu');
		musicStatus.textContent = isPlaying ? 'Sedang diputar' : 'Jeda';
	}

	// Tombol play atau jeda lagu
	musicToggle.addEventListener('click', ()=>{
		if(song.paused) song.play().catch(()=>{});
		else song.pause();
		updateMusicControls();
	});
	// Tombol lagu sebelumnya dan lagu berikutnya
	musicPrevious.addEventListener('click', ()=> setTrack(currentTrack - 1, true));
	musicNext.addEventListener('click', ()=> setTrack(currentTrack + 1, true));
	song.addEventListener('play', updateMusicControls);
	song.addEventListener('pause', updateMusicControls);
	song.addEventListener('ended', ()=> setTrack(currentTrack + 1, true));
	// Memilih lagu awal secara acak saat halaman dibuka
	setTrack(Math.floor(Math.random() * playlist.length), false);

	// Fungsi yang dipanggil index.html setelah tombol utama ditekan
	window.playMusic = function(){
		musicPlayer.classList.remove('is-hidden');
		song.play().catch(()=>{});
		updateMusicControls();
	};

})();
