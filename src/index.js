// write your code here
const menu = document.querySelector("div#ramen-menu")


function renderMenu() {
    fetch("http://localhost:3000/ramens").then(r => r.json()).then(ramensArr => {
        ramensArr.forEach(ramen => {
            const image = document.createElement("img")
            image.dataset.id = ramen.id
            image.classList.add("menu-image")
            image.src = `${ramen.image}`
            menu.appendChild(image)
        })
    })
}

function displayRamen(id) {
    fetch(`http://localhost:3000/ramens/${id}`).then(r => r.json()).then(ramen => {
        const ramenDetail = document.querySelector("div#ramen-detail")

        ramenDetail.innerHTML = `<img class="detail-image" src="${ramen.image}" alt=" ${ramen.name}" />
            <h2 class="name">${ramen.name}</h2>
            <h3 class="restaurant">${ramen.restaurant}</h3>
            <form id="ramen-rating" data-id="${ramen.id}">
            <label for="rating">Rating: </label>
            <input type="text" name="rating" id="rating" value=${ramen.rating} />
            <label for="comment">Comment: </label>
            <textarea name="comment" id="comment">${ramen.comment}</textarea>
            <input type="submit" value="Update" />
        </form>`
        
    })
}

menu.addEventListener("click", function (event) {
    if (event.target.className === "menu-image") {
        displayRamen(event.target.dataset.id)
    }
})

const ramenDetail = document.querySelector('div#ramen-detail')
const form = ramenDetail.querySelector('form#ramen-rating')

ramenDetail.addEventListener('submit', function (event) {
    event.preventDefault();

    if (event.target[2].type === 'submit') {
    const rating = event.target[0].value
    const comment = event.target[1].value
    const ramenObj = {rating: rating, comment: comment}
    const id = event.target.dataset.id

    
    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(ramenObj)
    })
        .then(r => r.json())
        .then(ramen => {
            console.log(ramen)
        })
    }
})

renderMenu()