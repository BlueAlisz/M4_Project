const base_url = "https://api.jikan.moe/v3";
const userList = document.querySelector('.user-list');

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

    const searchResults = document.getElementById('search-results');
    console.log(data.results);

        searchResults.innerHTML = data.results.map(anime=>{
            return `
        <div class="product">
            <div class="pro">
                <div class="content" >
                <img width="320" height="400"  src="${anime.image_url}"ondblclick="addFav()">
                    <div infoPro>
                    <p>${anime.title}</p>
                    <a href="${anime.url}"><input type="button" value="FIND OUT" class="button" name="product1"></a>
        </div>
        </div>
        </div>
        </div>
            `
        }).join("");
}



fetch('https://se104-project-backend.du.r.appspot.com/movies/632110337')
.then((response) => {
  return response.json();
})
.then((json) => {
  const users = json;
  users.forEach((user) => {
      
    const pro = document.createElement('div');
    pro.classList.add('pro');

    const content = document.createElement('div');
    content.classList.add('content');

    const avatarImg = document.createElement('img');
    avatarImg.classList.add('image_url');
    avatarImg.src = user.image_url;

    const infoPro = document.createElement('div');
    infoPro.classList.add('infoPro');

    const fullnameText = document.createElement('p');
    fullnameText.classList.add('username');
    fullnameText.innerHTML = user.title;

    const idText = document.createElement('p');
    idText.classList.add('username');
    idText.innerHTML = user.id;

    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type','button')
    button.innerText = 'delete'
    button.addEventListener('click',function() {
      let confirms = confirm(`ท่านต้องการลบเรื่อง ${user.title} หรือไม่`)
      if (confirms){
      deleteStudent(user.id)
      }
  })

    pro.append(avatarImg, fullnameText,idText,button);
    userList.append(pro);
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
  }).then(user =>
          { alert(`movie name ${user.title} is now deleted`) 
          location.reload();
  }).catch( error => 
          { alert(`movie name ${user.title} is't deleted`) 
          
  })
}

function addFav(){
    
  if (confirm("Add to Favorite list?")) {
    
  } else {
    
  }
}

function pageLoaded(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded);

var searchResults = document.getElementById('search-results')
var userLists = document.getElementById('userlists')

function hideAll(){
    searchResults.style.display = 'none'
    userLists.style.display='none'
}

document.getElementById('fav').addEventListener('click', (event) => {
    
    listAnime()
    userLists.style.display = 'block'
    
})
document.getElementById('find').addEventListener('click', (event) => {
  hideAll()
  searchResults.style.display = 'block'
})
