// BASES
// Impedindo que o submit envie os dados | Para não perder os dados
document.querySelector('.busca').addEventListener('submit', async (event)=>{ // event = submit
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        showWarning('Carregando...')

        // Fazendo a requisição

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();
        
        if(json.cod === 200) { // Código 200 é porque achou | 404 = Não achou;
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempicon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()
            showWarning('Não foi possível encontrar esta localização :(')
        }

    } else {
        clearInfo()
    }

});


// FUNÇÕES

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>°C</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`


    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempicon}.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

    document.querySelector('.resultado').style.display = 'block';
}
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}



/*
    - (encodeURI("string")) Adapta a String para um URL;
    // A minha API key pode demorar até 3 horas para funcionar, a partir de quando feito o cadastro no site;

    - (&units=metric&lang=pt_br) Para adicionar parametros no url;

    ** 0 dentro de um JSON, significa que é um Array;

    - (.setAttribute('Disso', `Pra isso`)) Modifica o atributo do elemento;
*/