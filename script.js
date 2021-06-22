const base_url = "https://api.jikan.moe/v3";
const movieList = document.querySelector('.movie-list');
const searchList = document.querySelector('.searchList');

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
      let confirmAdd = confirm(`Do youwant to add "${movie.title}" to your list?`)
      if(comfirmAdd){
        addSearchToDB(movie)
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



fetch('https://se104-project-backend.du.r.appspot.com/movies/632110337')
.then((response) => {
  return response.json();
})
.then((json) => {
  const movies = json;
  movies.forEach((movie) => {
      
    const pro = document.createElement('div');
    pro.classList.add('pro');

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

    const idText = document.createElement('p');
    idText.classList.add('username');
    idText.innerHTML = movie.id;

    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type','button')
    button.innerText = 'delete'
    button.addEventListener('click',function() {
      let confirms = confirm(`ท่านต้องการลบเรื่อง ${movie.title} หรือไม่`)
      if (confirms){
      deleteStudent(movie.id)
      }
  })

    pro.append(avatarImg, fullnameText,idText,button);
    movieList.append(pro);
  });
})
.catch((error) => {
  console.log(error.message);
});

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
          location.reload();
  }).catch( error => 
          { alert(`movie name ${movie.title} is't deleted`) 
          
  })
}

function addFav(){
    
  if (confirm("Add to Favorite list?")) {
    addMovieToDB(anime)
  } else {
    
  }
}

function addMovieToDB(movies){
  let body=`{"url":"${movies.url}","image_url":"${movies.image_url}","title":"${movies.title}","synopsis":"${movies.synopsis}","type":"${movies.type}","episodes":"${movies.episodes}","score":"${movies.score}","rated":"${movies.rated}","id":"${id}"}`
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
  }).then(movie=>{
    alert('Success')
  }).catch(error=>{
    alert('Error')
  })
}

function pageLoaded(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded);

var searchResults = document.getElementById('search-results')
var movieLists = document.getElementById('movielists')

function hideAll(){
    searchResults.style.display = 'none'
    movieLists.style.display='none'
}

document.getElementById('fav').addEventListener('click', (event) => {
    
    listAnime()
    movieLists.style.display = 'block'
    
})
document.getElementById('find').addEventListener('click', (event) => {
  hideAll()
  searchResults.style.display = 'block'
})

document.getElementById('add').addEventListener('dblclick',function(){
  let confirmAdd = confirm(`Do you want`)
})

