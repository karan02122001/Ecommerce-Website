function addData() {
    // Get form values
    var image = document.getElementById('inputImage').value;
    var name = document.getElementById('inputName').value;
    var price = document.getElementById('inputPrice').value;
    var rating = document.getElementById('inputRating').value;

    // Create an object with the form data
    var productData = {
        image: image,
        name: name,
        price: price,
        rating: rating
    };

    // Get existing data from local storage or initialize an empty array
    var existingData = JSON.parse(localStorage.getItem('ecommerceData')) || [];

    // Add new data to the array
    existingData.push(productData);

    // Save the updated array back to local storage
    localStorage.setItem('ecommerceData', JSON.stringify(existingData));

    // Optionally, you can reset the form after submission
    document.getElementById('ecommerceForm').reset();

    alert('Data added to local storage!');
}



let products = localStorage.getItem('ecommerceData');

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


