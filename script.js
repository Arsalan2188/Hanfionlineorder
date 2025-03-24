const products = [
    // Row 1 (5 products)
    { id: 1, name: "Rice (1kg)", price: 5 },
    { id: 2, name: "Spices (100g)", price: 2 },
    { id: 3, name: "Oil (1L)", price: 3 },
    { id: 4, name: "Salt (500g)", price: 1 },
    { id: 5, name: "Sugar (1kg)", price: 4 },
    // Row 2 (5 products)
    { id: 6, name: "Turmeric (100g)", price: 1.5 },
    { id: 7, name: "Flour (1kg)", price: 3 },
    { id: 8, name: "Lentils (500g)", price: 2.5 },
    { id: 9, name: "Pepper (50g)", price: 2 },
    { id: 10, name: "Ghee (500g)", price: 6 },
    // Row 3 (5 products)
    { id: 11, name: "Cumin (100g)", price: 2 },
    { id: 12, name: "Pasta (500g)", price: 3 },
    { id: 13, name: "Butter (250g)", price: 4 },
    { id: 14, name: "Chili Powder (100g)", price: 1.5 },
    { id: 15, name: "Oats (1kg)", price: 5 },
    // Row 4 (5 products)
    { id: 16, name: "Test (100g)", price: 2 },
    { id: 17, name: "Bajra (500g)", price: 3 },
    { id: 18, name: "Nan (250g)", price: 4 },
    { id: 19, name: " Powder (100g)", price: 1.5 },
    { id: 20, name: "Kimma (1kg)", price: 5 }
];
let cart = [];

function displayProducts() {
    const row1 = document.getElementById("products-row1");
    const row2 = document.getElementById("products-row2");
    const row3 = document.getElementById("products-row3");
    const row4 = document.getElementById("products-row4");



    // First 5 products in row 1
    for (let i = 0; i < 5; i++) {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <h3>${products[i].name}</h3>
            <p>$${products[i].price}</p>
            <button onclick="addToCart(${products[i].id})">Buy</button>
        `;
        row1.appendChild(div);
    }

    // Next 5 products in row 2
    for (let i = 5; i < 10; i++) {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <h3>${products[i].name}</h3>
            <p>$${products[i].price}</p>
            <button onclick="addToCart(${products[i].id})">Buy</button>
        `;
        row2.appendChild(div);
    }
       // Last 5 products in row 3
    for (let i = 10; i < 15; i++) {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <h3>${products[i].name}</h3>
            <p>$${products[i].price}</p>
            <button onclick="addToCart(${products[i].id})">Buy</button>
        `;
        row3.appendChild(div);
    }
        // Next 5 products in row 4
        for (let i = 15; i < 20; i++) {
            const div = document.createElement("div");
            div.className = "product";
            div.innerHTML = `
                <h3>${products[i].name}</h3>
                <p>$${products[i].price}</p>
                <button onclick="addToCart(${products[i].id})">Buy</button>
            `;
            row4.appendChild(div);
        }
    
    
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = total;
}

function submitOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Order placed! Items: " + cart.map(item => item.name).join(", "));
        cart = [];
        updateCart();
    }
}
function clearCart() {
    cart = [];
    updateCart();
}
function updateCart() {
    const cartList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            ${item.name} - $${item.price}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at the specified index
    updateCart(); // Refresh the cart display
}
function submitOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        // Create the order message
        let orderMessage = "New Order:\n";
        cart.forEach(item => {
            orderMessage += `${item.name} - $${item.price}\n`;
        });
        orderMessage += `Total: $${cart.reduce((sum, item) => sum + item.price, 0)}`;

        // WhatsApp number (India country code +91)
        const whatsappNumber = "919330533302"; // Your number with +91 prefix
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(orderMessage)}`;

        // Open WhatsApp with the pre-filled message
        window.open(whatsappUrl, "_blank");

        // Clear the cart after sending
        cart = [];
        updateCart();
    }
}

displayProducts();