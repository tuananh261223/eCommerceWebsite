// Get the HTML element with the id "shop"
let shop = document.getElementById("shop");

// Retrieve data from local storage, or initialize an empty array if no data is present
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Function to generate the shop content dynamically based on the data
let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((x) => {
    // Destructure item properties for easier access
    let { id, name, price, desc, img } = x;

    // Find the item in the basket array or return an empty object if not found
    let search = basket.find((x) => x.id === id) || [];

    // Generate HTML for each item in the shop
    return `<div id=product-id-${id} class="item">
    <img width="100%" src="${img}">
    <div class="item-details">
      <h3> ${name} </h3>
      <p>${desc}</p>
      <div class="price-quantity">
        <h2>$${price}</h2>
        <div class="quantity-buttons">
          <i class="bi bi-plus-square-fill" onclick="increment(${id})"></i>
          <div id=${id} class="item-quantity">
            ${search.item === undefined ? 0 : search.item}
          </div>
          <i class="bi bi-dash-square-fill" onclick="decrement(${id})"></i>
        </div>
      </div>
    </div>
  </div> `;
  })
    .join(""));
};
// Call the generateShop function to populate the shop content
generateShop();

// Function to increment the quantity of a selected item
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  // If the item is not in the basket, add it; otherwise, increment the quantity
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // Update local storage with the modified basket
  localStorage.setItem("data", JSON.stringify(basket));

  // Update the displayed quantity and perform overall calculation
  update(selectedItem.id);
};

// Function to decrement the quantity of a selected item
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  // If the item is not in the basket or the quantity is already 0, do nothing
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    // Decrement the quantity
    search.item -= 1;
  }

  // Update the displayed quantity and perform overall calculation
  update(selectedItem.id);

  // Filter out items with quantity 0 and update local storage
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

// Function to update the displayed quantity of a selected item
let update = (id) => {
  // Find the selected item in the basket
  let search = basket.find((x) => x.id === id);

  // Update the displayed quantity on the webpage
  document.getElementById(id).innerHTML = search.item;

  // Perform overall calculation for the cart icon
  calculation();
};

// Function to calculate and update the total quantity in the cart icon
let calculation = () => {
  // Get the cart icon element
  let cartIcon = document.getElementById("cartQuantity");

  // Calculate the total quantity by summing up all item quantities in the basket
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
};
// Call the calculation function to initialize the cart icon quantity
calculation();

