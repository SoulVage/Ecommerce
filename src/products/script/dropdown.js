const dropdown = document.querySelectorAll('.dropdown');

dropdown.forEach((drop) => {
    const content = drop.nextElementSibling;
    drop.addEventListener('click', () => {
        content.classList.toggle('active');
        drop.querySelector("svg").classList.toggle('rotate-180');
    })
})