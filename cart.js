// Retrieve or initialize the 'basket' array from local storage
let basket = JSON.parse(localStorage.getItem("data")) || [];
// Get references to the HTML elements for displaying cart details and items
let cartDetails = document.getElementById("cartDetails");
let cartDisplayItems = document.getElementById("cartDisplayItems");

// Function to update the cart quantity in the header
let calculation = () => {
    let cartIcon = document.getElementById("cartQuantity");
    // Calculate the total quantity of items in the cart
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
// Initialize cart quantity on page load
calculation();

// Function to generate and display cart items
let generateCartItems = () => {
  if (basket.length !== 0) {
    return cartDisplayItems.innerHTML = basket.map((x) => {
      let { id, item } = x;
      // Find the corresponding item details from 'shopItemsData' array
      let search = shopItemsData.find((y) => y.id === id) || [];
      return `
      <div class="cart-item">
        <img width="150px" height="200px" src=${search.img}></img>
        <div class="details">
          <div class="title-price-x">
            <p>${search.name}</p>
            <h3><span>Price:</span> $${search.price}</h3>
            <div class="quantity-buttons">
              <i class="bi bi-plus-square-fill" onclick="increment(${id})"></i>
              <div id=${id} class="item-quantity">${item}</div>
              <i class="bi bi-dash-square-fill" onclick="decrement(${id})"></i>
            </div>
            <h4 class="total">Total (${item} items): <span>$${item * search.price}</span></h4>
          </div>
          <i class="bi bi-x-lg" onclick="removeItem(${id})"></i>
        </div>
      </div>
      `;
    }).join("");
  } else {
    // Display a message when the cart is empty
    cartDisplayItems.innerHTML = ``;
    cartDetails.innerHTML = `
    <h2>Cart is empty!</h2>
    <a href="index.html">
      <button class="homeBtn">Return To Homepage</button>
    </a>
    `;
  }
};
// Initialize cart items on page load
generateCartItems();

// Function to increment the quantity of a selected item in the cart
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    // If the item is not in the cart, add it with quantity 1
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    // If the item is already in the cart, increment its quantity
    search.item += 1;
  }
  // Update local storage and refresh UI
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
  generateCartItems();
};

// Function to decrement the quantity of a selected item in the cart
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    // Decrement the quantity of the selected item
    search.item -= 1;
  }
  // Update UI and local storage, remove item from the cart if quantity becomes zero
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
};

// Function to update the quantity display for a selected item
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  // Update cart quantity in the header and recalculate the total amount
  calculation();
  totalCartAmount();
};

// Function to remove a selected item from the cart
let removeItem = (id) => {
  let selectedItem = id;
  // Remove the item from the cart
  basket = basket.filter((x) => x.id !== selectedItem.id);
  // Update local storage and refresh UI
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  totalCartAmount();
  calculation();
};

// Function to calculate and display the total cart amount
let totalCartAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
      let { item, id } = x;
      // Find the corresponding item details from 'shopItemsData' array
      let search = shopItemsData.find((y) => y.id === id) || [];
      return item * search.price;
    }).reduce((x, y) => x + y, 0);
    // Display the total cart amount in the cart details section
    cartDetails.innerHTML = `<h2 class="cart-subtotal">Cart Subtotal: $${amount}</h2>`;
  } else return;
};
// Initialize total cart amount on page load
totalCartAmount();