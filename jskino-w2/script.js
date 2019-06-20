//Задаем переменную - можно let, const и var, Var - не лучший выбор. Let и Const - появилось в ES-6 2015
const searchForm = document.querySelector('#searc-form');      
const movie = document.querySelector('#movies');       

function apiSearch(event) {
    event.preventDefault(); // чтоб небыло перезагрузки на странице
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=e0022bd1f11362a8599bb614756465dd&language=ru&query=' + searchText;
    movie.innerHTML = 'Загрузка';

    fetch(server)
        .then(function (value) {
            return value.json();
        })
        .then(function (output) {
            let inner = '';
            output.results.forEach(function (item) {
                let nameItem = item.name || item.title;
                let dateItem = item.first_air_date || item.release_date;
                let posterItem = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + item.poster_path || item.backdrop_path;
                let mediatypeItem = item.media_type;
                let descriptionItem = item.overview;
    
    
                if (posterItem == 'https://image.tmdb.org/t/p/w185_and_h278_bestv2null') {
    
                    posterItem = '//via.placeholder.com/185x278.png?text=Нет изображения';
                    
                } else if (posterItem == 'https://image.tmdb.org/t/p/w185_and_h278_bestv2undefined') {
                    
                    posterItem = '//via.placeholder.com/185x278.png?text=Нет изображения';
                   
                }
    
                const btnshow = document.querySelector('.btnshow');
    
               
                inner += '<div class="row justify-content-start mb-5"><div class="col-3 md-12"><img src="' + posterItem + '"></div><div class="col-6"><h2>' + nameItem + '</h2> <br><span class="alert-info p-2">' + dateItem + '</span><br><small class="p-2">' + mediatypeItem + '</small><br><p class="mt-3 text-truncate">' + descriptionItem + '<p><br><a  class="link" href="#test-popup"  onclick="myFunction()" data-ahoy="yohoho" >Посмотреть</a> <div class="vid"><div class="btnshow" data-title="' + nameItem + '"></div>  <script src="//yohoho.cc/yo.js"></script></div></div></div>';
            
            });
            movie.innerHTML = inner;
        })
        .catch(function (reason) {
            movie.innerHTML = 'Error';
            console.log('error: ' + request.status);
        });
}
      

searchForm.addEventListener('submit', apiSearch);

