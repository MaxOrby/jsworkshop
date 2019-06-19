//Задаем переменную - можно let, const и var, Var - не лучший выбор. Let и Const - появилось в ES-6 2015
const searchForm = document.querySelector('#searc-form');      
const movie = document.querySelector('#movies');       

function apiSearch(event) {
    event.preventDefault(); // чтоб небыло перезагрузки на странице
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=e0022bd1f11362a8599bb614756465dd&language=ru&query=' + searchText;
    requestApi(server);
    // console.log(requestApi(server));
}

//Обработчик события на функцию

searchForm.addEventListener('submit', apiSearch);
// функция обращения к серверу

function requestApi(url) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send(); //ждем ответ от сервера
                                                 // стрелочная функция ()=>
    request.addEventListener('readystatechange', function() {
        if (request.readyState !== 4) return;


        if (request.status !== 200) {
            console.log('error: ' + request.status);
            return;
        }
        
        const output = JSON.parse(request.responseText)


        let inner = '';

        output.results.forEach(function(item) {
            let nameItem = item.name || item.title;
            let dateItem = item.first_air_date || item.release_date;
            let posterItem = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + item.poster_path || item.backdrop_path;
            let mediatypeItem = item.media_type;
            let descriptionItem = item.overview;



            if (posterItem == 'https://image.tmdb.org/t/p/w185_and_h278_bestv2null') {

                posterItem = '//via.placeholder.com/185x278.png?text=Нет изображения';
                
              } else if (posterItem =='https://image.tmdb.org/t/p/w185_and_h278_bestv2undefined') {
                
                posterItem = '//via.placeholder.com/185x278.png?text=Нет изображения';
               
            }

            console.log(nameItem);
            inner += '<div class="row justify-content-start mb-5"><div class="col-3"><img src="' + posterItem + '"></div><div class="col-6"><h2>' + nameItem +'</h2> <br><span class="alert-info p-2">' + dateItem  + '</span><br><small class="p-2">'+ mediatypeItem+ '</small><br><p class="mt-3 text-truncate">'+descriptionItem+'<p></div></div>';
        });

        movie.innerHTML = inner;
        console.log(output);
    });


}