
let products = localStorage.getItem('shoppingCart');

// Check if there are products in the localStorage
if (products) {
    // Parse the string to convert it into an array
    products = JSON.parse(products);

    const productContainer = document.querySelector('.product-list');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-lg-3 col-md-6 main-card js-product-cart';
        productCard.setAttribute('data-product-id', product.productId);

        productCard.innerHTML = `
            <div class="featured-item">
                <div class="featured-item-img">
                    <a href="#">
                        <img class="feature-img" src="${product.image}" alt="Images">
                    </a>
                </div>
                <div class="content">
                    <h3>${product.name}</h3>
                    <hr>
                    <div class="content-in">
                        <h4>₹ ${product.price}</h4>
                        <span>(4.4)<i class="fa fa-star"></i></span>
                    </div>
                    <button class="clear-cart btn btn-danger js-cart-remove-btn" data-name="${product.name}">
                       X
                    </button>
                    <td>
                       <input type='number' value='${product.count}' class='item-count form-control' data-product-name="${product.name}">
                    </td>
                </div>
            </div>
        `;

        productContainer.appendChild(productCard);
    });

    // Add event listener for input changes (quantity updates)
    productContainer.addEventListener('input', function (event) {
        if (event.target.classList.contains('item-count')) {
            const productName = event.target.dataset.productName;
            const newQuantity = parseInt(event.target.value, 10);

            // Update the product count in the products array
            const updatedProduct = products.find(product => product.name === productName);
            if (updatedProduct) {
                updatedProduct.count = newQuantity;

                // Update the localStorage with the modified products array
                localStorage.setItem('shoppingCart', JSON.stringify(products));

                // Recalculate and display the total price
                updateTotalPrice();
            }
        }
    });
}

function updateTotalPrice() {
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.price * product.count;
    });

    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.innerHTML = totalPrice;
    }

    console.log("Total Price:", totalPrice);
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('js-cart-remove-btn')) {
        // Handle remove button click
        const productName = event.target.dataset.name;
        console.log('Remove button clicked for product:', productName);
        window.location.reload();
        // Find and remove the product from the shopping cart
        products = products.filter(product => product.name !== productName);

        // Update the localStorage with the modified products array
        localStorage.setItem('shoppingCart', JSON.stringify(products));

        // Remove the product card from the DOM
        const productCard = event.target.closest('.js-product-cart');
        if (productCard) {
            productCard.remove();
        }

        // Recalculate and display the total price
        updateTotalPrice();
        
    }
});

// Calculate and display the initial total price
updateTotalPrice();

