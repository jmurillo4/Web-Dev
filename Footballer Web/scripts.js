const track = document.querySelector(".carousel-images");
let images = Array.from(track.children);
const prevButton = document.querySelector(".prevbutton");
const nextButton = document.querySelector(".nextbutton");

//Clone First and last images
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, images[0]);

//Re-select images to include cloens
images = track.querySelectorAll("img");
let currentIndex = 1;
let slideWidth = track.offsetWidth;
function updateCarousel(instant = false) {
    track.style.transition = instant ? 'none' : 'transform 0.3s ease-in-out';
    track.style.transform = `translateX(-${currentIndex *imageWidth}px)`;
}

function goToNext(){
    currentIndex++;
    updateCarousel();
}

function goToPrev(){
    currentIndex--;
    updateCarousel();
}

track.addEventListener('transitionend', () => {
    if (currentIndex >= images.length -1){
        currentIndex = 1;
        updateCarousel(true);
    } else if(currentIndex <= 0){
        currentIndex = images.length -2;
        updateCarousel(true);
    }
});

nextButton.addEventListener('click', goToNext);
prevButton.addEventListener('click', goToPrev);

window.addEventListener('resize', () => {
    imageWidth = images[0].clientWidth;
    updateCarousel(true);
});

window.addEventListener('load', () => {
    imageWidth = images[0].clientWidth;
    updateCarousel(true);
});