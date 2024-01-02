let products = localStorage.getItem('shoppingwishlist');

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
                </div>
            </div>
        `;

        productContainer.appendChild(productCard);
    });
}


