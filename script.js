const base_url = "https://api.jikan.moe/v3";
const movieList = document.querySelector('.movie-list');
const searchList = document.querySelector('.searchList');
const favDes = document.querySelector('.favDes');

function searchAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");
    
    fetch(`${base_url}/search/anime?q=${query}`)
    .then(res=>res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(data){

    const searchTable = document.getElementById('search-results');
    searchTable.innerHTML = " "

    console.log(data.results);
    data.results.forEach((movie) =>{
      const pro = document.createElement('div');
    pro.classList.add('pro');

    const content = document.createElement('div');
    content.classList.add('content');

    const avatarImg = document.createElement('img');
    avatarImg.classList.add('image_url');
    avatarImg.src = movie.image_url;

    pro.addEventListener('dblclick',function(){
      let comfirmAdd = confirm(`Do youwant to add "${movie.title}" to your list?`)
      if(comfirmAdd){
        addMovieToDB(movie)
      }
    })

    const infoPro = document.createElement('div');
    infoPro.classList.add('infoPro');

    const fullnameText = document.createElement('p');
    fullnameText.classList.add('username');
    fullnameText.innerHTML = movie.title;

    pro.append(avatarImg, fullnameText);
    searchList.append(pro);
    })
}


function showFavList(){
fetch('https://se104-project-backend.du.r.appspot.com/movies/632110337')
.then((response) => {
  return response.json();
})
.then((json) => {
  const movies = json;
  const favTable = document.getElementById('movielists');
    favTable.innerHTML = " "
  movies.forEach((movie) => {
    
      
    const pro = document.createElement('div');
    pro.classList.add('pro','py-auto');

    const content = document.createElement('div');
    content.classList.add('content');

    const avatarImg = document.createElement('img');
    avatarImg.classList.add('image_url');
    avatarImg.src = movie.image_url;

    const infoPro = document.createElement('div');
    infoPro.classList.add('infoPro');

    const fullnameText = document.createElement('p');
    fullnameText.classList.add('username');
    fullnameText.innerHTML = movie.title;

    let detailBtn = document.createElement('button')
    detailBtn.classList.add('btn')
    detailBtn.classList.add('btn-outline-primary')
    detailBtn.classList.add('mx-5')
    detailBtn.setAttribute('type','button')
    detailBtn.innerText = 'detail'
    detailBtn.addEventListener('click',function() {
      hideAll()
      document.getElementById('favDes').style.display = 'block'
      showDes(movie.id)
      
  })

    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('btn')
    deleteBtn.classList.add('btn-outline-danger')
    detailBtn.classList.add('mx-5')
    deleteBtn.setAttribute('type','button')
    deleteBtn.innerText = 'delete'
    deleteBtn.addEventListener('click',function() {
      let confirms = confirm(`ท่านต้องการลบเรื่อง ${movie.title} หรือไม่`)
      if (confirms){
      deleteStudent(movie.id)
      }
  })

    pro.append(avatarImg, fullnameText,detailBtn,deleteBtn);
    movieList.append(pro);
  });
})
.catch((error) => {
  console.log(error.message);
});
}

function deleteStudent (id) { 
  fetch( `https://se104-project-backend.du.r.appspot.com/movie?id=632110337&&movieId=${id}`,{
       method: 'DELETE' 
  }).then(response => { 
      if (response.status === 200)
      { 
          return response.json() 
      }else{
           throw Error(response.statusText) }
  }).then(movie =>
          { alert(`movie name ${movie.title} is now deleted`) 
          //location.reload();
          showFavList()
  }).catch( error => 
          { alert(`movie name ${movie.title} is't deleted`) 
          
  })
}



function addMovieToDB(movie){
  let body=`{"url":"${movie.url}","image_url":"${movie.image_url}","title":"${movie.title}","synopsis":"${movie.synopsis}","type":"${movie.type}","episodes":"${movie.episodes}","score":"${movie.score}","rated":"${movie.rated}","id":" "}`
  fetch(`https://se104-project-backend.du.r.appspot.com/movies`,{
    method:'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: `{"id":"632110337","movie":${body}}`
  }).then(response=>{
    if(response.status == 200){
      return response.json()
    }else{
      throw Error(response.statusText)
    }
  }).then(data=>{
    alert('Success')
  }).catch(error=>{
    alert('Error')
  })
}

function showDes(movieID){
  fetch( `https://se104-project-backend.du.r.appspot.com/movie/632110337/${movieID}`,{
       method: 'GET' 
  }).then(response => { 
      if (response.status === 200)
      { 
          return response.json() 
      }else{
           throw Error(response.statusText) }
  }).then(movie =>{ 
    const favTable = document.getElementById('favDes');
    favTable.innerHTML = " "

    const card = document.createElement('div');
    card.classList.add('card','text-white','bg-dark','mx-auto','my-3');
    card.style.padding = '5px'
    card.style.height = '820px'
    card.style.width = '550px'

    const cardImgTop = document.createElement('img');
    cardImgTop.classList.add('card-img-top');
    cardImgTop.src = movie.image_url;

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerHTML = movie.title;

    const synopsisText = document.createElement('p');
    synopsisText.classList.add('card-text');
    synopsisText.innerHTML = "synopsis: "+movie.synopsis;
    
    const typeText = document.createElement('p');
    typeText.classList.add('card-text');
    typeText.innerHTML = "type: "+movie.type;

    const episodesText = document.createElement('p');
    episodesText.classList.add('card-text');
    episodesText.innerHTML = "episodes: "+movie.episodes;

    const scoreText = document.createElement('p');
    scoreText.classList.add('card-text');
    scoreText.innerHTML = "score: "+movie.score;

    const ratedText = document.createElement('p');
    ratedText.classList.add('card-text');
    ratedText.innerHTML = "rated: "+movie.rated;

    let closeBtn = document.createElement('button')
    closeBtn.classList.add('btn')
    closeBtn.classList.add('btn-outline-light')
    closeBtn.classList.add('mx-5')
    closeBtn.setAttribute('type','button')
    closeBtn.innerText = 'close'
    closeBtn.addEventListener('click',function() {
      hideAll()
      document.getElementById('movielists').style.display = 'block'
      showFavList()
  })
    
    card.append(cardImgTop,cardTitle,synopsisText,typeText,episodesText,scoreText,ratedText,closeBtn);
    favDes.append(card);
  }).catch((error) => {
    console.log(error.message);
          
  })
}
function pageLoaded(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded);

var searchResults = document.getElementById('search-results')
var movieLists = document.getElementById('movielists')
var favDess = document.getElementById('favDes')

function hideAll(){
    searchResults.style.display = 'none'
    movieLists.style.display='none'
    favDess.style.display='none'
}


document.getElementById('find').addEventListener('click', (event) => {
  hideAll()
  searchResults.style.display = 'block'
})

document.getElementById('fav').addEventListener('click', (event) => {
  hideAll()
  showFavList();
  movieLists.style.display = 'block'
})





