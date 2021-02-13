
// Get the input field
var searchText = document.getElementById("searchText");

// Execute a function when the user releases a key on the keyboard
searchText.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
   if (event.keyCode === 13) {
    // Cancel the default action, if needed
        event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("enterNow").click();
  }
});

const searchSong=()=>{
    const searchText=document.getElementById('searchText').value;
    displaySpinner();
    fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
    .then(response=>response.json())
    .then(data=>displaySong(data.data))
    .catch(error=>displayError('something is wrong please try later'))
    
}
const displaySong=songs=>{
    console.log(songs);
    const songDetailsDisplay=document.getElementById('songDetailsDisplay');
    songDetailsDisplay.innerText='';
    const songShowDisplay=document.getElementById('songShowDisplay')
    songShowDisplay.innerHTML='';
        songs.forEach(song =>{
            const songDiv=document.createElement('div');
            songDiv.innerHTML=`<div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="playSong('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
                <audio controls src="${song.preview}"></audio>
            </div>`;
            songShowDisplay.appendChild(songDiv);
            displaySpinner();
        })
    }
const playSong = async(artist,title) => {
    const url=`https://api.lyrics.ovh/v1/${artist}/${title}`;
    displaySpinner();
    try{
        const response= await fetch(url);
        const data =await response.json();
        playSongDetails(data);
    }
    catch(error){
        displayError('sorry something is wrong please try aging');
    }

}
const playSongDetails=data=>{
    const songDetailsDisplay=document.getElementById('songDetailsDisplay');
    songDetailsDisplay.innerText=data.lyrics;
    displaySpinner();
    
}
const displayError=error=>{
    const errorMessage=document.getElementById('errorMessage');
    errorMessage.innerText=error;
    
}

const displaySpinner=()=>{
    const loadingSpinner= document.getElementById('loadingSpinner');

    loadingSpinner.classList.toggle('d-none');
}