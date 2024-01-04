// productPage.js
document.addEventListener('DOMContentLoaded', function () {
    // Get product information from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');
    const productImage = urlParams.get('image');

    // Render product details on the page
    renderProductDetails({ id: productId, name: productName, price: productPrice, image: productImage });
});

function renderProductDetails(productData) {
    const productDetailsContainer = document.getElementById('productDetails');

    if (productData) {
        // Render product details
        productDetailsContainer.innerHTML = `
            <h2>${productData.name}</h2>
            <p>Price: ₹ ${productData.price}</p>
            <img src="${productData.image}" alt="${productData.name} Image">
            <!-- Add more details as needed -->
            <button type="button" onclick="addToCart(${productData.id}, '${productData.name}', ${productData.price}, '${productData.image}')">Add to cart</button>
        `;
    } else {
        // Handle product not found
        productDetailsContainer.innerHTML = '<p>Product not found</p>';
    }
}

function addToCart(productId, productName, productPrice, productImage) {
    // Check if there is a cart in the localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the selected product to the cart
    cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
    });

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, you can display a confirmation message
    alert(`${productName} added to cart!`);
}
