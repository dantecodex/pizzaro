// Icon Menu ------------------------>

getIconData();
async function getIconData() {
    const response = await fetch("/json/icon.json");
    const iconData = await response.json();

    for (const icon of iconData) {
        displayIcon(icon);
    }
}

function displayIcon(iconData) {
    const iconMenu = document.querySelector(".menu");
    const iconCard = document.createElement('div');

    iconCard.innerHTML = `
    <i class="icon">${iconData.iconWord}</i>
    <p>${iconData.iconName}</p>
    `
    iconMenu.appendChild(iconCard);
}

// Disert ----------------------->

getDisertData();

async function getDisertData() {
    const response = await fetch("/json/disert.json");
    const disertData = await response.json();

    for (const diserts of disertData) {
        displayDisert(diserts);
    }

}

function displayDisert(diserts) {
    const disertMenu = document.querySelector(".disert");

    const disertCard = document.createElement("div");
    disertCard.className = "box2";
    disertCard.innerHTML = `
    <img src="${diserts.image}" alt="" srcset="">
    <p class="disert-name">${diserts.name}</p>
    <p class="pick-size">__________________ <span style="font-style: normal; color: black;">Pick
            Size</span> __________________</p>

     <div class="price">
    
     </div>

    `;
    disertMenu.appendChild(disertCard);

    // const disertPrice = document.querySelector(".box2 .price");
    const disertPrice = disertCard.querySelector(".price");

    for (const data of diserts.sizes) {

        const priceCard = document.createElement("div");

        priceCard.innerHTML = `  
        <button>${data.size}</button>
        <p><sup>$</sup>${data.price}</p>
        `;
        disertPrice.append(priceCard);
    }

}


// Dish Menu --------------------->


getDishData();
async function getDishData() {
    const response = await fetch("/json/dish.json");
    const menuData = await response.json();

    createMenu(Object.keys(menuData));

    for (const menu in menuData) {

        menuData[menu].forEach((dish) => {

            menuCard(dish, menu);
        });
    }

    document.querySelectorAll(".select-Dish").forEach(element => {

        element.addEventListener("click", (event) => {

            hideDish(event.target.dataset.category);
        });
    });

}

function createMenu(categories) {

    categories.forEach(category => {
        let dishOption = document.createElement("p");
        dishOption.className = 'select-Dish';
        dishOption.dataset.category = category;
        dishOption.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        document.querySelector(".dish").append(dishOption);
    });
}

function menuCard(dish, menu) {
    const chooseMenu = document.querySelector(".choose-menu-item");

    const menuCard = document.createElement("div");
    menuCard.className = menu == 'pizza' ? 'box' : 'box display-none';
    menuCard.dataset.id = dish.id;
    menuCard.dataset.category = menu;
    menuCard.innerHTML = `
<img src="${dish.img}" alt="" onerror=setDefaultImage(this)>
<p class="dish-name">${dish.name}</p>
<p class="dish-description">${dish.description}</p>
<p class="pick-size">____________________ <span style="font-style: normal; color: black;">Pick
        Size</span> ____________________</p>
<div class="price">
                            
</div>
<div class="add-to-cart" data-id="${dish.id}" onclick="addToCart(${dish.id})">
    <i class="icon">h</i>
    <p>Add to Cart</p>
</div>`;

    chooseMenu.appendChild(menuCard);

    const dishPrices = menuCard.querySelector(".price");

    for (const dishSize of dish.sizes) {

        const chooseDishSize = document.createElement("div");
        chooseDishSize.innerHTML = `
        <button>${dishSize.size}</button>
        <p><sup>$</sup>${dishSize.price}</p>
        `;

        chooseDishSize.addEventListener("click", event => {
            // remove selected from menuCard
            menuCard.querySelectorAll(".price button").forEach(selectedSize => {
                selectedSize.classList.remove("selected");
            });

            event.target.classList.add("selected");
        });

        dishPrices.appendChild(chooseDishSize);
    }


    // dishCart(menuCard);

}


function hideDish(category) {
    document.querySelectorAll(".box").forEach(element => {
        element.classList.add("display-none");
    });
    document.querySelectorAll(`[data-category='${category}']`)
        .forEach(element => {
            element.classList.remove("display-none");
        });
}

function setDefaultImage(noimage) {
    noimage.src = '/Images/no-image.png';
}


// Add to cart ------------------------>

let shoppingCart = [];

function addToCart(dataId) {
    const menuCard = document.querySelector(`[data-id = '${dataId}']`);

    const dishId = menuCard.dataset.id;
    const dishCategory = menuCard.dataset.category;
    const dishName = menuCard.querySelector(".dish-name").textContent;
    const dishSelectedSize = menuCard.querySelector(".selected");
    const dishSize = dishSelectedSize ? dishSelectedSize.textContent : null;
    const dishPrice = dishSelectedSize ? dishSelectedSize.nextElementSibling.textContent : null;

    if (!dishSize || !dishPrice) {
        alert('Select any size');
        return;
    }

    shoppingCart.push({
        id: dishId,
        category: dishCategory,
        name: dishName,
        size: dishSize,
        price: dishPrice
    });
    console.log(shoppingCart);
}


