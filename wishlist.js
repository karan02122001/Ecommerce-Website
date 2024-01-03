var shoppingwishlist = (function () {

  wishlist = JSON.parse(localStorage.getItem('shoppingwishlist')) || [];

  function Item(name, price, productId, image) {
    return {
      name: name,
      price: price,
      productId: productId,
      image: image
    }
  }

  // Save wishlist
  function savewishlist() {
    localStorage.setItem('shoppingwishlist', JSON.stringify(wishlist));
    document.querySelector('.js-wishlist-popup-btn .badge').innerHTML = JSON.parse(localStorage.getItem('shoppingwishlist')).length;
    displaywishlist();
  }

  // Load wishlist
  // function loadwishlist() {
  //   wishlist = JSON.parse(localStorage.getItem('shoppingwishlist')) || [];
  // }
  // loadwishlist();

  var obj = {};

  obj.loadwishlist = function () {
    let localStorageWishlist = JSON.parse(localStorage.getItem('shoppingwishlist'));
    if (!localStorageWishlist) return;
    document.querySelector('.js-wishlist-popup-btn .badge').innerHTML = localStorageWishlist.length;
    localStorageWishlist.forEach(item => {
      console.log(item)
      let productItemGrid = document.querySelector(`.js-product-cart[data-product-id="${item.productId}"]`);
      productItemGrid.querySelector('.js-wishlist-btn').classList.add('active');
    });
  }

  // Add to wishlist
  obj.addItemTowishlist = function (name, price, productId, image) {
    console.log("addItemTowishlist")
    var newItem = Item(name, price, productId, image);
    wishlist.push(newItem);
    savewishlist();
  }

  // Set count from item
  obj.setCountForItem = function (name, count) {
    for (var i in wishlist) {
      if (wishlist[i].name === name) {
        wishlist[i].count = count;
        break;
      }
    }
    savewishlist();
  };

  // Remove item from wishlist
  obj.removeItemFromwishlist = function (name) {
    for (var item in wishlist) {
      if (wishlist[item].name === name) {
        wishlist[item].count--;
        if (wishlist[item].count === 0) {
          wishlist.splice(item, 1);
        }
        break;
      }
    }
    savewishlist();
  }

  // Remove all items from wishlist
  obj.removeItemFromwishlistAll = function (name) {
    let itemId = wishlist.filter((item) => item.name == name)[0].productId;
    wishlist = wishlist.filter(item => item.name !== name);
    let productItemGrid = document.querySelector(`.js-product-cart[data-product-id="${itemId}"]`);
    productItemGrid.querySelector('.js-wishlist-btn').classList.remove('active');
    savewishlist();
  }

  // Clear wishlist
  obj.clearwishlist = function () {
    wishlist = [];
    savewishlist();
  }

  // Count wishlist 
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in wishlist) {
      totalCount += wishlist[item].count;
    }
    return totalCount;
  }

  // Total wishlist
  obj.totalwishlist = function () {
    var totalwishlist = 0;
    for (var item in wishlist) {
      totalwishlist += wishlist[item].price * wishlist[item].count;
    }
    return Number(totalwishlist.toFixed(2));
  }

  // List wishlist
  obj.listwishlist = function () {
    var wishlistCopy = [];
    for (var i in wishlist) {
      var item = wishlist[i];
      var itemCopy = {};
      for (var p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      wishlistCopy.push(itemCopy);
    }
    return wishlistCopy;
  }

  return obj;
})();


shoppingwishlist.loadwishlist();

// Click event for elements with the class 'default-btn'
document.querySelectorAll('.default-button').forEach(function (element) {
  element.addEventListener('click', function (event) {
    event.preventDefault();
    var image = element.getAttribute('dataa-image');
    var name = element.getAttribute('dataa-name');
    var price = Number(element.getAttribute('dataa-price'));  
    shoppingwishlist.addItemTowishlist(name, price, 1, image);
    displaywishlist();
  });
});

// Click event for elements with the class 'clear-wishlist'
document.querySelectorAll('.clr-btn').forEach(function (element) {
  element.addEventListener('click', function () {
    shoppingwishlist.clearwishlist();
    displaywishlist();
  });
});



function displaywishlist() {
  var wishlistArray = shoppingwishlist.listwishlist();

  if (wishlistArray.length === 0) {
    
    document.querySelector('.show-wishlist').innerHTML = '<p>Your wishlist is empty.</p>';
  } else {
  
    let wishlistHTml = wishlistArray.map((item, index) => {
      return `
        <tr class="js-wishlist-item-row" data-product-id="${item.name}">
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
            <button class="clr-btn btn btn-danger js-wishlist-remove-btn">
              X
            </button>
          </td>
        </tr>
      `;
    });

    document.querySelector('.show-wishlist').innerHTML = wishlistHTml.join('');
    wishlistPopupActions();
  }
  let itemCount = JSON.parse(localStorage.getItem('shoppingwishlist')).length;
  // Update the wishlist count and display the modal
  document.querySelector('.js-wishlist-popup-btn .badge').innerHTML = itemCount;
  var myModal = new bootstrap.Modal(document.getElementById('staticBackdropwishlist'));
  myModal.show();
}


function wishlistPopupActions() {
  document.querySelector('.show-wishlist').querySelectorAll('.js-wishlist-remove-btn').forEach(button => {
    button.addEventListener('click',function(){
      let productrow = this.closest('.js-wishlist-item-row'); 
      let productId = productrow.dataset.productId;
      productrow.remove();
      shoppingwishlist.removeItemFromwishlistAll(productId);
    });
  });
}

// Assuming you call the displaywishlist function elsewhere in your code




// Toggle wishlist item's active state and add/remove from wishlist
function toggleWishlistIcon(element) {
  element.classList.add("active");

  var productName = element.getAttribute('dataa-name');
  var productPrice = Number(element.getAttribute('dataa-price'));
  var productImage = element.getAttribute('dataa-image');
  let productId = element.closest('.js-product-cart').dataset.productId;
  
  if (element.classList.contains("active")) {
    shoppingwishlist.addItemTowishlist(productName, productPrice, productId , productImage);
  } else {
    shoppingwishlist.removeItemFromwishlistAll(productName);
  }
}

// Inactivate wishlist item and remove from wishlist
function inactivateWishlistIcon(element) {
  element.classList.remove("active");

  var productName = element.getAttribute('dataa-name');
  shoppingwishlist.removeItemFromwishlistAll(productName);
}

// Click event for elements with the class 'default-button'
document.querySelectorAll('.js-wishlist-btn').forEach(function (element) {
  element.addEventListener('click', function (event) {
    event.preventDefault();

    // Toggle active state or inactivate based on the current state
    if (this.classList.contains("active")) {
      inactivateWishlistIcon(this);
    } else {
      toggleWishlistIcon(this);
    }
  });
});

// document.querySelector('.wishlist-badge-btn').addEventListener('contextmenu', (event) => {
//   window.location.href = 'wishlist.html';
// });

function displaywishlistbtn() {
  displaywishlist();
}


