var customerOrder = [];

class Pizza {
    type;
    size;
    quantity;
    sauces;
    meats;
    veggies;
    price;
    // Create a method to be called AFTER the object is instantiated
    calculatePrice = function() {
        // Set the base price depending on the type of pizza, and how many were ordered
        switch (this.type) {
            case "Cheese" :
                this.price = (12.99 * this.quantity);
                break;

            case "Margarita" :
                this.price = (14.99 * this.quantity);
                break;

            case "Meat Lover's" :
            case "Deluxe" :
                this.price = (15.99 * this.quantity);
                break;

            default :
                this.price = (13.99 * this.quantity);
                break;
        }

        // If anything bigger than a small was ordered, increase the price accordingly
        switch (this.size) {
            case "Medium (+$2.00)" :
                this.price += (2.00 * this.quantity);
                break;

            case "Large (+$4.00)" :
                this.price += (4.00 * this.quantity);
                break;

            case "X-Large (+$6.00)" :
                this.price += (6.00 * this.quantity);
                break;
        }

        // Round to 2 decimal places
        this.price = Math.round(this.price * 100) / 100
    };

    constructor(type, size, quantity, sauces, cheeses, meats, veggies) {
        this.type = type;
        this.size = size;
        this.quantity = quantity;
        this.sauces = sauces;
        this.cheeses = cheeses;
        this.meats = meats;
        this.veggies = veggies;
    };
}

class Side {
    type;
    quantity;
    price;
    calculatePrice = function() {
        
        switch (this.type) {
            case "Cheesy Bread Sticks" :
                this.price = (9.99 * this.quantity);
                break;

            case "Bread Sticks" :
                this.price = (7.99 * this.quantity);
                break;

            case "Chicken Wings" :
                this.price = (11.99 * this.quantity);
                break;

            default :
                this.price = (5.99 * this.quantity);
                break;
        }
    }

    constructor(type, quantity) {
        this.type = type;
        this.quantity = quantity;
    };
}

// Handle the display of the cart
function updateCart() {
    document.getElementById("sidebar-total-items").querySelector("b").textContent = customerOrder.length;

    // Clear the cart to rebuild it
    document.getElementById("sidebar-item-name").innerHTML = "";
    document.getElementById("sidebar-item-price").innerHTML = "";

    let total = 0.00;
    
    // For each item that was ordered, display it in the cart
    customerOrder.forEach(order => {

        // Display the name and quantity of the item
        let name = document.createElement("p");
        name.textContent = order.type + " (" + order.quantity + ")";
        document.getElementById("sidebar-item-name").appendChild(name);

        // If the item is a pizza, show the extra toppings
        if (order.constructor.name === "Pizza") {
            let addOns = document.createElement("p");
            addOns.textContent = `${order.sauces.join(', ')} ${order.cheeses.join(', ')} ${order.meats.join(', ')} ${order.veggies.join(', ')}`;
            document.getElementById("sidebar-item-name").appendChild(addOns);
        }

        // Display the price of that item
        let price = document.createElement("p");
        price.textContent = "$" + order.price;
        document.getElementById("sidebar-item-price").appendChild(price);

        // Keep track of the total price
        total += order.price;
    });

    // Display the subtotal of all items
    document.querySelector(".price").querySelector("b").textContent = "$" + total;
}

updateCart();

// When the "Add to Cart" button is pressed in the Pizza section, make a Pizza object and add it to the order
document.querySelector(".add-to-cart-pizza").addEventListener("click", (event) => {

    // Stop the page from reloading
    event.preventDefault();

    let sauces = getSauces();
    let cheeses = getCheeses();
    let meats = getMeats();
    let veggies = getVeggies();

    let newPizza = new Pizza(
        document.querySelector(".pizza-specifications-pizza-type").value,
        document.querySelector(".pizza-specifications-pizza-size").value,
        document.querySelector(".pizza-specifications-pizza-amount").value,
        sauces,
        cheeses,
        meats,
        veggies
        );
    
    newPizza.calculatePrice();

    // Add the pizza to the order
    customerOrder.push(newPizza);
    console.log(newPizza);
    updateCart();

    document.getElementById("student-number").textContent = "200553504";
});

// Loop through each sauce input element and see if it is checked
function getSauces() {
    let sauces = [];
    // Select the list of Sauces
    document.querySelector(".toppings-specifications-sauce-type").childNodes.forEach(node => {
        // Ensure that the element is a label
        if (node.className === "selection") {
            // Check the input inside the label to see if it is checked
            node.childNodes.forEach(topping => {
                // If it is checked, grab the raw text that came before it that contains the name
                if (topping.checked) {
                    // Add the item to the pizza sauces
                    sauces.push(topping.previousSibling.textContent.trim());
                }
            });
        }}
    );
    
    return sauces;
}

// Loop through each cheese input element and see if it is checked
function getCheeses() {
    let cheeses = [];
    // Select the list of cheeses
    document.querySelector(".toppings-specifications-cheese-type").childNodes.forEach(node => {
        // Ensure that the element is a label
        if (node.className === "selection") {
            // Check the input inside the label to see if it is checked
            node.childNodes.forEach(topping => {
                // If it is checked, grab the raw text that came before it that contains the name
                if (topping.checked) {
                    // Add the item to the pizza cheeses
                    cheeses.push(topping.previousSibling.textContent.trim());
                }
            });
        }}
    );
    
    return cheeses;
}

// Loop through each meat input element and see if it is checked
function getMeats() {
    let meats = [];
    // Select the list of meats
    document.querySelector(".toppings-specifications-meat-type").childNodes.forEach(node => {
        // Ensure that the element is a label
        if (node.className === "selection") {
            // Check the input inside the label to see if it is checked
            node.childNodes.forEach(topping => {
                // If it is checked, grab the raw text that came before it that contains the name
                if (topping.checked) {
                    // Add the item to the pizza meats
                    meats.push(topping.previousSibling.textContent.trim());
                }
            });
        }}
    );
    
    return meats;
}

// Loop through each veggie input element and see if it is checked
function getVeggies() {
    let veggies = [];
    // Select the list of veggies
    document.querySelector(".toppings-specifications-veggie-type").childNodes.forEach(node => {
        // Ensure that the element is a label
        if (node.className === "selection") {
            // Check the input inside the label to see if it is checked
            node.childNodes.forEach(topping => {
                // If it is checked, grab the raw text that came before it that contains the name
                if (topping.checked) {
                    // Add the item to the pizza veggies
                    veggies.push(topping.previousSibling.textContent.trim());
                }
            });
        }}
    );
    
    return veggies;
}

// When the "Add to Cart" button is pressed in the Side section, make a Side object and add it to the order
document.querySelector(".add-to-cart-sides").addEventListener("click", (event) => {

    // Stop the page from reloading
    event.preventDefault();

    let item = document.querySelector(".sides-specifications-item").value;
    let qty = document.querySelector(".sides-specifications-quantity").value;

    // Add the item the order, unless "None" and/or "0" were selected
    if (item !== "None" && qty !== "0") {
        let newSide = new Side(
            document.querySelector(".sides-specifications-item").value,
            document.querySelector(".sides-specifications-quantity").value
            );

        newSide.calculatePrice();
    
        // Add the side to the order
        customerOrder.push(newSide);
        console.log(newSide);
        updateCart();
    } 
});