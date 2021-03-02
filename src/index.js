// write your code here
const menu = document.querySelector("div#ramen-menu")

function renderMenu(){
    fetch("http://localhost:3000/ramens").then(r => r.json()).then(ramensArr => {
    ramensArr.forEach(ramen =>
    {
        const image = document.createElement("img")
        image.dataset.id = ramen.id
        image.classList.add("menu-image")
        image.src = `${ramen.image}`
        menu.appendChild(image)
    })
}
    )
}

function displayRamen(id) {
    fetch(`http://localhost:3000/ramens/${id}`).then(r => r.json()).then(ramen => {
    const div = document.createElement('div')
    div.innerHTML = `<img class="detail-image" src="${ramen.image}" alt=" ${ramen.name}" />
    <h2 class="name">${ramen.name}</h2>
    <h3 class="restaurant">${ramen.restaurant}</h3>`
    const ramenDetail = document.querySelector("div#ramen-detail")
    ramenDetail.innerHTML = div.innerHTML
    })
}

menu.addEventListener("click", function(event)
{
if (event.target.className === "menu-image") {
displayRamen(event.target.dataset.id)
}
})
renderMenu()