let carts = document.querySelectorAll(".add-cart")

// create object array representing our products for sale,
let products = [
    {
        name: "Tshirt",
        tag: "NikeShirt",
        price: 40,
        inCart: 0,
    },
    {
        name: "Balenciaga Shoes",
        tag: "Shoes",
        price: 100,
        inCart: 0,
    },
    {
        name: "Champion Hoodie",
        tag: "hoodie",
        price: 80,
        inCart: 0,
    },
    {
        name: "Fila Shorts",
        tag: "shorts",
        price: 60,
        inCart: 0,
    }

]


// when clicked add items to cart, add this functionality to each cart button on the page
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", function () {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

// on page reload make sure cart value stays up to date with local storage
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if (productNumbers) {
        document.querySelector('.cart-button a span').textContent = productNumbers;
    }
}

function totalCost(product) {
    //console.log("the product price is", product.price)
    let cartCost = (localStorage.getItem("totalCost"));

    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + product.price)
    } else {
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", product.price)
    }
}




// add products to the cart in the form of local storage,
// convert item to json format
function setItems(product) {
    // retrieve the products in cart object from local storage
    let cartItems = localStorage.getItem('productsInCart');

    // parse the cart items object from JSON syntax into javascript object syntax
    cartItems = JSON.parse(cartItems)

    // if cart is not empty
    if (cartItems != null) {

        // check if cart product tag is undefined, if it is, update the cart with that item
        if (cartItems[product.tag] == undefined) {

            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        // update product aount in cart
        cartItems[product.tag].inCart += 1;
    } else {
        // if cart is empty add an item to cart
        product.inCart = 1;
        // add the item in key value pair to the cartItems object.
        cartItems = {
            [product.tag]: product,
        }
    }
    // update productsInCart as a JSON string.
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}


// Create values in local storage representing the cart and the amount of items inside it
function cartNumbers(product) {

    // create a variable representing the number of total items in the cart in local storage
    let productNumbers = parseInt(localStorage.getItem('cartNumbers'))

    // if the cart is not empty, add one number to the amount of products in local storage "productNumber" and update the button on page
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart-button a span').textContent = productNumbers + 1;

        // if cart is empty, set product numbers to 1 then update cart button to 1
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.cart-button a span').textContent = 1;
    }
    // call setItems to add the specific item to cart.
    setItems(product);
}


const cartButton = document.querySelector('.cart-button a span')
cartButton.addEventListener("click", function () {

})

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    // check that cartItems exist and that you are on the cart page.
    let productContainer = document.querySelector(".products")
    if (cartItems && productContainer) {
        productContainer.innerHTML = "";
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=
                `
                <div class="product">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" id="${item.tag}-xButton" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                <img src="${item.tag}.jpg" class="cartImages">
                <span> ${item.name}</span>
                </div>

                <div class="price">$${item.price}.00</div>

                <div class="quantity"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" id="${item.tag}-upButton" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
              </svg><span>${item.inCart}</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" id="${item.tag}-downButton" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
            </svg></div>

            <div class="total">
            $${item.inCart * item.price}.00
            </div>
            <hr>
            `
        });
        productContainer.innerHTML +=
            `<div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                Basket Total
                </h4>
                <h4 class="basketTotal" name="basketTotal" value="$${localStorage.getItem("totalCost")}.00">
                $${localStorage.getItem("totalCost")}.00
                </h4>
                </div>`

    }
}



onLoadCartNumbers();
displayCart();

let xButtons = document.querySelectorAll(".bi-x-circle-fill")


for (let i = 0; i < xButtons.length; i++) {
    xButtons[i].addEventListener("click", function () {
        let itemTag = xButtons[i].id.slice(0, -8)
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        let item = cartItems[itemTag]
        console.log(cartItems[itemTag])
        removeItem(cartItems, item)


    })
}

let upButtons = document.querySelectorAll(".bi-arrow-up-circle-fill")

for (let i = 0; i < upButtons.length; i++) {

    upButtons[i].addEventListener("click", function () {
        let itemTag = upButtons[i].id.slice(0, -9)
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        let item = cartItems[itemTag]
        addOneItem(cartItems, item)
    })
}

let downButtons = document.querySelectorAll(".bi-arrow-down-circle-fill")

for (let i = 0; i < downButtons.length; i++) {
    downButtons[i].addEventListener("click", function () {
        let itemTag = downButtons[i].id.slice(0, -11)
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        let item = cartItems[itemTag]
        removeOneItem(cartItems, item)
    })
}

// removes an item from the cart
function removeItem(cartItems, item) {

    let priceAdjustment = item.price * item.inCart;
    localStorage.setItem("totalCost", localStorage.getItem("totalCost") - priceAdjustment)

    localStorage.setItem("cartNumbers", localStorage.getItem("cartNumbers") - item.inCart)
    item.inCart = 0;

    delete cartItems[item.tag]


    // set new items in storage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
    document.location.reload(true)

}

function removeOneItem(cartItems, item) {
    let priceAdjustment = item.price;
    localStorage.setItem("totalCost", localStorage.getItem("totalCost") - priceAdjustment)
    localStorage.setItem("cartNumbers", localStorage.getItem("cartNumbers") - 1)
    item.inCart -= 1;
    if (item.inCart == 0) {
        delete cartItems[item.tag]
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
    document.location.reload(true)

}

function addOneItem(cartItems, item) {
    let priceAdjustment = item.price;
    localStorage.setItem("totalCost", parseInt(localStorage.getItem("totalCost")) + parseInt(priceAdjustment))
    localStorage.setItem("cartNumbers", parseInt(localStorage.getItem("cartNumbers")) + 1)
    item.inCart += 1;

    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
    document.location.reload(true)

}


console.log(localStorage.getItem("productsInCart"))


var total = localStorage.getItem("totalCost");


console.log(total)


var finalProduct =  {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Total Amount',
            images: ['https://i.imgur.com/n7M4u9i.png'],
          },
          unit_amount: 10000,
        },
        quantity: 1,
      }


finalProduct.price_data.unit_amount = total;

console.log(finalProduct.price_data.unit_amount);
