"use strict";

window.onload = function() {
    const stars = ['⋆', '｡', '°', '✩', '✧', '★', '☆', '✦', '❋', '✵', '✶'];

    function createStar() {
        const star = document.createElement('span');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.textContent = stars[Math.floor(Math.random() * stars.length)];
        document.body.appendChild(star);

        setTimeout(() => star.remove(), 7000);
    }
    setInterval(createStar, 200);  // Keep creating stars every 500 milliseconds
    
};
