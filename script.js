// Filters
const filterButtons = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        cards.forEach(card => {

            if (filter === "all" || card.dataset.category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".previous");

let currentIndex = 0;
function getVisibleCards() {
    return [...document.querySelectorAll(".card")].filter(card => {
        return window.getComputedStyle(card).display !== "none";
    });
}
cards.forEach(card => {

    card.addEventListener("click", () => {

        const visibleCards = getVisibleCards();

        currentIndex = visibleCards.indexOf(card);

        const img = card.querySelector("img");

        lightbox.style.display = "flex";
        lightboxImg.src = img.src;

    });

});


nextBtn.addEventListener("click", () => {

    const visibleCards = getVisibleCards();

    currentIndex++;

    if (currentIndex >= visibleCards.length) {
        currentIndex = 0;
    }

    lightboxImg.src =
        visibleCards[currentIndex].querySelector("img").src;

});



prevBtn.addEventListener("click", () => {

    const visibleCards = getVisibleCards();

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleCards.length - 1;
    }

    lightboxImg.src =
        visibleCards[currentIndex].querySelector("img").src;

});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});


lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }

});

document.addEventListener("keydown", (e) => {

    if (lightbox.style.display === "flex") {

        if (e.key === "ArrowRight") {
            nextBtn.click();
        }

        if (e.key === "ArrowLeft") {
            prevBtn.click();
        }

        if (e.key === "Escape") {
            closeBtn.click();
        }

    }

});