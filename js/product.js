const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const productUrl = `https://api.noroff.dev/api/v1/rainy-days/${productId}`;

async function fetchProductDetails() {
    try {
        const response = await fetch(productUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error('Something went wrong with the API-call:', error);
        alert('could not load product details. Try again later.');
    }
}

function displayProductDetails(product) {
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-name').textContent = product.title;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `price: ${product.discountedPrice || product.price} $`;

    const sizeSelect = document.getElementById('product-sizes');
    sizeSelect.innerHTML = '';
    product.sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
    });

    document.getElementById('add-to-cart').addEventListener('click', () => {
        const selectedSize = sizeSelect.value;
        if (selectedSize) {
            addToCart(product, selectedSize);
        } else {
            alert('Please select a size')
        }
    });
}

function addToCart(product, selectedSize) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productToAdd = { ...product, selectedSize};

    cart.push(productToAdd);

    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.title} in size ${selectedSize} has been added to the cart!`);


    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length > 0 ? `(${cart.length})` : '';
}


fetchProductDetails();
updateCartCount();