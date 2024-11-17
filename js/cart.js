function displayCart() {
    const cartList = document.getElementById('cart-list');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartList.innerHTML = '';

    let total = 0;

    cart.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');

        productElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>price: ${product.discountedPrice  || product.price} $</p>
        <p>Size: ${product.selectedSize}</P>
        <button class="remove-button" data-index="${index}">remove</button> <!-- fjern-knapp -->
        `;

        cartList.appendChild(productElement);

        
        total+=product.discountedPrice || product.price;
    });


    const totalElement = document.getElementById('cart-total');
    if (totalElement) {
        totalElement.textContent = `total: ${total} NOK`;
    }


    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click',function () {
            const index = this.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}


function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}


document.getElementById('checkout-button').addEventListener('click', () => {
    localStorage.removeItem('cart');
    window.location.href = 'confirmation/index.html';
});

displayCart();
