const artistName = document.getElementById('artist-name');
const artistBorn = document.getElementById('artist-born');
const artistDied = document.getElementById('artist-died');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');

const submitArtist = document.getElementById('submit-artist');
const submitSong = document.getElementById('submit-song');

const artistDiv = document.getElementById('artistTableBody');
const songDiv = document.getElementById('songTableBody');

function onReady() {
    artistDiv.innerHTML = '';
    axios({
        method: 'GET',
        url: '/artist'
    }).then(function (response) {
            console.log(response);
            let artistsFromServer = response.data;
            for (let artist of artistsFromServer) {
                artistDiv.innerHTML += `
                <tr>
                    <td>${artist.name}</td>
                    <td>${artist.born}</td>
                    <td>${artist.died}</td>
                </tr>
            `;
            }
        }).catch(function (error) {
            console.log(error);
            alert('Something bad happened! Check the console for more details.');
        });
    songDiv.innerHTML ='';
    axios({
        method: 'GET',
        url: '/song'
    }).then(function (response) {
            console.log(response);
            let songsFromServer = response.data;
            for (let song of songsFromServer) {
                songDiv.innerHTML += `
                <tr>
                    <td>${song.title}</td>
                    <td>${song.artist}</td>
                </tr>
            `;
            }
        }).catch(function (error) {
            console.log(error);
            alert('Something bad happened! Check the console for more details.');
        });
}

function addSong(){
    let songForServer = {
        title: songTitle.value,
        artist: songArtist.value,
    };
    axios.post('/song', songForServer).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}
function addArtist(){
    let artistForServer = {
        name: artistName.value,
        born: artistBorn.value,
        died: artistDied.value,
    };
    axios.post('/artist', artistForServer).then((response) => {
        console.log(response);
        console.log(artistName.value);
    }).catch((error) => {
        console.log(error);
    });
    
}

onReady();

submitArtist.addEventListener('click', function (event){
    event.preventDefault();
    addArtist();
    onReady();
});

submitSong.addEventListener('click', function (event){
    event.preventDefault();
    addSong();
    onReady();
})
