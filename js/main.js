const apiUrl = 'https://api.noroff.dev/api/v1/rainy-days';

let allProducts = [];


async function fetchProducts() {
    try{
        const response = await fetch(apiUrl);
        const products = await response.json();
        allProducts = products;
        displayProducts(products);
    } catch (error) {
        console.error('Something went wrong with the API-call:', error);
        alert('Could not load products. Try again later.');
    }
}


function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
     productElement.classList.add('product');

        productElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>price: ${product.discountedPrice || product.price} $</p>
        <a href=" product/index.html?id=${product.id}" class="details-link">See details</a>
     `;

        productList.appendChild(productElement);
    });
}

function filterProducts(gender) {
    if (gender === 'all') {
        displayProducts(allProducts);
    } else {
        const filteredProducts = allProducts.filter(product => product.gender === gender.charAt(0).toUpperCase() + gender.slice(1));
        displayProducts(filteredProducts);
    }
}


document.getElementById('filter-all').addEventListener('click', () => filterProducts('all'));
document.getElementById('filter-male').addEventListener('click', () => filterProducts('Male'));
document.getElementById('filter-female').addEventListener('click', () => filterProducts('Female'));


fetchProducts();
