const dropdown = document.querySelectorAll('.dropdown');

dropdown.forEach((drop) => {
    const content = drop.nextElementSibling;
    const searchInput = content.querySelector(".search-input")

    drop.addEventListener('click', () => {
        content.classList.toggle('active');
        drop.querySelector("svg").classList.toggle('rotate-180');      
    })
    if (!searchInput) return;
    searchInput.addEventListener("keyup", () => {
        const filter = searchInput.value.trim().toLowerCase();
        const items = content.querySelectorAll(".dropdown-items");
        items.forEach(item => {
            let value = item.querySelector("label").innerHTML.toLowerCase();
            if (!filter || value.includes(filter)) {
                item.classList.remove("opacity-30");
            } else {
                item.classList.add("opacity-30");
            }            
        })
    })  
})