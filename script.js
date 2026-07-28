const totalPages = 11;

let currentPage = 0;
let isVideo = false;

const pageImage = document.getElementById("pageImage");
const pageVideo = document.getElementById("pageVideo");

const startButton = document.getElementById("startButton");
const animateButton = document.getElementById("animateButton");
const nextButton = document.getElementById("nextButton");

const restartButton = document.getElementById("restartButton");
const coverButton = document.getElementById("coverButton");


// показать обложку
function showCover() {

    currentPage = 0;
    isVideo = false;

    pageVideo.pause();
    pageVideo.style.display = "none";

    pageImage.src = "images/cover.png";
    pageImage.style.display = "block";

    hideAllButtons();

    startButton.style.display = "block";
}


// начать книгу
startButton.onclick = function(){

    currentPage = 1;

    showPage();

};


// показать страницу
function showPage(){

    isVideo = false;

    pageVideo.pause();
    pageVideo.removeAttribute("src");
    pageVideo.load();
    pageVideo.style.display = "none";

    pageImage.src = `images/page${currentPage}.png`;
    pageImage.style.display = "block";

    hideAllButtons();

    animateButton.style.display = "block";

}


// оживить страницу
animateButton.onclick = function(){

    isVideo = true;

    pageImage.style.display = "none";

    pageVideo.src = `video/page${currentPage}.mp4`;

    pageVideo.style.display = "block";

    pageVideo.load();
    
    pageVideo.play();

    hideAllButtons();

    nextButton.style.display = "block";

};


// следующая страница
nextButton.onclick = function(){

    currentPage++;

    if(currentPage <= totalPages){

        showPage();

    } else {

        showFinalVideo();

    }

};


// финальное видео
function showFinalVideo(){

    hideAllButtons();

    pageImage.style.display = "none";

    pageVideo.src = "video/coverBack.mp4";

    pageVideo.style.display = "block";

    pageVideo.play();

    restartButton.style.display = "block";
    coverButton.style.display = "block";

}


// читать заново
restartButton.onclick = function(){

    currentPage = 1;

    showPage();

};


// на обложку
coverButton.onclick = function(){

    showCover();

};


// спрятать кнопки
function hideAllButtons(){

    startButton.style.display = "none";
    animateButton.style.display = "none";
    nextButton.style.display = "none";
    restartButton.style.display = "none";
    coverButton.style.display = "none";

}


// запуск при открытии сайта
showCover();
