const totalPages = 11;

let currentPage = 0;
let isVideo = false;

const pageImage = document.getElementById("pageImage");
const pageVideo = document.getElementById("pageVideo");
const loading = document.getElementById("loading");

const startButton = document.getElementById("startButton");
const animateButton = document.getElementById("animateButton");
const nextButton = document.getElementById("nextButton");

const restartButton = document.getElementById("restartButton");

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

    // заранее готовим первую страницу
    preloadImage(1);
    preloadVideo(1);
}


// начать книгу
startButton.onclick = function(){

    currentPage = 1;

    showPage();

};


// показать страницу
function showPage(){

    isVideo = false;

    hideAllButtons();

    loading.style.display = "block";


    pageVideo.pause();
    pageVideo.removeAttribute("src");
    pageVideo.load();
    pageVideo.style.display = "none";


    const img = new Image();


    img.onload = function(){

        pageImage.src = img.src;

        pageImage.style.display = "block";

        loading.style.display = "none";

        animateButton.style.display = "block";


        // готовим следующую страницу
        preloadNextPage();

    };


    img.src = `images/page${currentPage}.png`;

}


// оживить страницу
animateButton.onclick = function(){

    hideAllButtons();

    loading.style.display = "block";


    pageImage.style.display = "none";


    pageVideo.src = `video/page${currentPage}.mp4`;

    pageVideo.style.display = "block";

    pageVideo.load();


    pageVideo.oncanplaythrough = function(){

        loading.style.display = "none";

        pageVideo.play();

        nextButton.style.display = "block";

    };

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

}


// читать заново
restartButton.onclick = function(){

showCover();

};

// спрятать кнопки
function hideAllButtons(){

    startButton.style.display = "none";
    animateButton.style.display = "none";
    nextButton.style.display = "none";
    restartButton.style.display = "none";
}


// запуск при открытии сайта
showCover();
function preloadImage(page){

    if(page <= totalPages){

        const img = new Image();

        img.src = `images/page${page}.png`;

    }

}



function preloadVideo(page){

    if(page <= totalPages){

        const video = document.createElement("video");

        video.src = `video/page${page}.mp4`;

        video.preload = "auto";

    }

}



function preloadNextPage(){

    preloadImage(currentPage + 1);

    preloadVideo(currentPage + 1);

}
