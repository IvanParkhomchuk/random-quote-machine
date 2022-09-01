const text = document.getElementById('text');
const author = document.getElementById('author');
const button = document.getElementById('new-quote');
const body = document.body;

const TIMEOUT = 500;
const AMOUNT_SYMBOLS_IN_HEX = 6;

const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

const requestURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function sendRequest(method, url) {
    const xhr = new XMLHttpRequest();
    
    xhr.open(method, url);
    
    xhr.responseType = 'json';
    
    function changeQuote() {
        let randomQuote = [Math.floor(Math.random() * xhr.response['quotes'].length)];

        text.textContent = xhr.response['quotes'][randomQuote]['quote'];
        author.textContent = '- ' + xhr.response['quotes'][randomQuote]['author'];
    }

    function changeText() {
        invisibleText()

        return setTimeout(() => {
            changeQuote()
            visibleText()
        }, TIMEOUT);
    }

    xhr.onload = () => {    
        changeQuote();
        randomColor();

        button.addEventListener('click', function() {
            changeText()
            randomColor();
        });
    };
    
    xhr.send();
}

function randomColor() {
    let color = '#';

    for (let i = 0; i < AMOUNT_SYMBOLS_IN_HEX; i++) {
        color += hex[getRandomNumber()];
    }

    text.style.color = color;
    author.style.color = color;
    body.style.background = color;
    button.style.background = color;
}

function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}

function visibleText() {
    text.classList.remove('invisible-text');
    author.classList.remove('invisible-text');
}

function invisibleText() {
    text.classList.add('invisible-text');
    author.classList.add('invisible-text');
}

sendRequest('GET', requestURL);