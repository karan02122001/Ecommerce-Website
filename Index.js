var shoppingCart = (function () {

    cart = [];

    function Item(name, price, count, image) {
      return{
      name : name,
      price : price,
      count : count,
      image : image,
    }
  }

    // Save cart
    function saveCart() {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
      console.log(JSON.stringify(cart));
    }

    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count, image) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count++;
          saveCart();
          return;
        }
      }
      var newItem = new Item(name, price, count, image);
      cart.push(newItem);
      saveCart();
    }

    // Set count from item
    obj.setCountForItem = function (name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
      saveCart();
    };

    // Remove item from cart
    obj.removeItemFromCart = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
      cart = cart.filter(item => item.name !== name);
      saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
      cart = [];
      saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
      var totalCount = 0;
      for (var item in cart) {
        console.log(cart);
        totalCount += cart[item].count;
      }
      return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
      var totalCart = 0;
      for (var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
      var cartCopy = [];
      for (var i in cart) {
        var item = cart[i];
        var itemCopy = {};
        for (var p in item) {
          itemCopy[p] = item[p];
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
      }
      return cartCopy;
    }

    return obj;
  })();


// Click event for elements with the class 'default-btn'
document.querySelectorAll('.default-btn').forEach(function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      var image = element.getAttribute('data-image');
      var name = element.getAttribute('data-name');
      var price = Number(element.getAttribute('data-price'));
      shoppingCart.addItemToCart(name, price, 1, image);
      displayCart();
    });
});


// Click event for elements with the class 'clear-cart'
document.querySelectorAll('.clear-cart').forEach(function (element) {
    element.addEventListener('click', function () {
      shoppingCart.clearCart();
      displayCart();
    });
});


function displayCart() {
  var cartArray = shoppingCart.listCart();

  if (cartArray.length === 0) {
      document.querySelector('.show-cart').innerHTML = '<p>Your cart is empty</p>';
      document.querySelector('.total-cart').innerHTML = '0.00';
      document.querySelector('.js-cart-popup-btn .badge').innerHTML = '0';

      document.querySelector('.modal-footer').style.display = 'none';
  } else {
      let output = cartArray.map((item, index) => {
          return`
          <tr class="js-cart-item-row" data-product-id="${item.name}">
          <td>
              <span>${index + 1}</span>
          </td>
          <td>
              <img src="${item.image}" alt="${item.name}" class="cart-image" />
          </td>
          <td>
              ${item.name}
          </td>
          <td>
              ${item.price}
          </td>
          <td>
              <input type='number' value='${item.count}' class='item-count form-control' data-product-name="${item.name}">
          </td>
          <td>
              <button class="clear-cart btn btn-danger js-cart-remove-btn" data-name="${item.name}">
                  X
              </button>
          </td>
          </tr>
          `;
      });

      document.querySelector('.show-cart').innerHTML = output.join('');
      document.querySelector('.total-cart').innerHTML = shoppingCart.totalCart();
      document.querySelector('.js-cart-popup-btn .badge').innerHTML = shoppingCart.totalCount();

      document.querySelector('.modal-footer').style.display = 'block';
      cartPopupActions();
  }
}

function cartPopupActions() {
  let clearCartBtn = document.querySelector('.clear-cart');
  let closeBtn = document.querySelector('.close-cart-btn'); // Assuming you have a close button with this class

  if (shoppingCart.totalCount() === 0) {
    // If the cart is empty, hide the buttons
    clearCartBtn.style.display = 'none';
    if (closeBtn) {
      closeBtn.style.display = 'none';
    }
  } else {
    // If the cart has items, show the buttons
    clearCartBtn.style.display = 'block';
    if (closeBtn) {
      closeBtn.style.display = 'block';
    }

    // Add click event listener for the clear cart button
    clearCartBtn.addEventListener('click', function () {
      shoppingCart.clearCart();
      displayCart();
    });
  }

  document.querySelectorAll('.js-cart-remove-btn').forEach(button => {
    button.addEventListener('click', function () {
      let productRow = this.closest('.js-cart-item-row');
      let productId = productRow.dataset.productId;
      productRow.remove();
      shoppingCart.removeItemFromCartAll(productId);
      displayCart();
    });
  });
}

// Assuming you call the displayCart function elsewhere in your code
displayCart();


