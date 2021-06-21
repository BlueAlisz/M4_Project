const base_url = "https://api.jikan.moe/v3";


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

function hideAll(){
    searchResults.style.display = 'none'
}

document.getElementById('fav').addEventListener('click', (event) => {
    hideAll()
})
document.getElementById('find').addEventListener('click', (event) => {
    searchResults.style.display = 'block'
})
