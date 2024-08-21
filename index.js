let SelectedProduct = [];
let counter = 0;
const cart = document.getElementById('cart'); // Ensure cart is selected properly
const displayProduct = document.querySelector('.info'); // Ensure product display area is selected

// Toggle cart display on click
const show = () => {
    if (cart.style.display === 'flex') {
        cart.style.display = 'none';
    } else {
        cart.style.display = 'flex';
    }
}

// Increment product quantity
const increment = () => {
    counter++;
    document.getElementById('quantity').innerHTML = counter;
}

// Decrement product quantity
const decrement = () => {
    if (counter > 0) {
        counter--;
    } else {
        counter = 0;
    }
    document.getElementById('quantity').innerHTML = counter;
}

// Add product to cart
const addProduct = () => {
    const nom = document.getElementById('titre_produit').textContent;
    const prix = parseFloat(document.getElementById('price_product').textContent); // Convert to number
    const img = document.getElementById('image').src;
    const quantite = parseInt(document.getElementById('quantity').textContent); // Convert to number
    const container = document.querySelector('.container_infos');

    if (quantite === 0) {
        // Show an alert for quantity selection
        if (!document.getElementById('alert')) {
            const alert = document.createElement('p');
            alert.textContent = 'Please select a quantity';
            alert.style.color = 'red';
            alert.id = 'alert';
            container.appendChild(alert);
        }
    } else {
        // Remove the alert if any
        if (document.getElementById('alert')) {
            document.getElementById('alert').remove();
        }

        // Create product object
        const product = {
            name: nom,
            price: prix,
            image: img,
            quantity: quantite
        };

        // Add to selected products
        SelectedProduct.push(product);

        // Reset the quantity counter
        counter = 0;
        document.getElementById('quantity').innerHTML = 0;

        const numbers = document.querySelector('.number_of_orders').textContent
        document.querySelector('.number_of_orders').textContent = parseInt(numbers) + 1;        
        // Update cart display
        updateCartDisplay();
    }
}


// Delete products from cart

const deleteProducts = ()=>{
    SelectedProduct = [];
    updateCartDisplay();
    document.querySelector('.number_of_orders').textContent = 0;
    cart.style.display = 'none';

}

// delete selected product from cart

const deleteProduct = (name) => {
    const product = SelectedProduct.find(product => product.name === name);
    const index = SelectedProduct.indexOf(product);
    SelectedProduct.splice(index, 1);
    updateCartDisplay();
    const numbers = document.querySelector('.number_of_orders').textContent
    document.querySelector('.number_of_orders').textContent = parseInt(numbers) - 1;
}




// Update the cart display with selected products
const updateCartDisplay = () => {
    if (SelectedProduct.length > 0) {
        displayProduct.innerHTML = ''; // Clear current content
        SelectedProduct.forEach(product => {
            displayProduct.innerHTML += `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="priceContainer">
                    <h3>${product.name}</h3>
                    <div class="price_line">
                    <p>$${product.price.toFixed(2)}</p>
                    <p> * ${product.quantity} </p>
                    <p>= $${(product.price * product.quantity).toFixed(2)}</p>
                    </div>
                    </div>
                    <div class="img">
                    <img  src="https://img.icons8.com/ios/50/000000/delete-sign.png" alt="delete" onclick="deleteProduct('${product.name}')">
                    </div>
                </div>
            `;
        });
    } else {
        console.log('====================================');
        console.log('No Product Selected');
        console.log('====================================');
        displayProduct.innerHTML = 'No Product Selected';
    }
}

if (SelectedProduct.length == 0) {
    updateCartDisplay();
    
}

// Hide cart on checkout
const checkout = () => {
    cart.style.display = 'none';
}



// function to select image and display it in the product display area



function displayImage(image) {
    document.getElementById('image').src = image;
}

// create slider function :


const images = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
];

let index = 0;

const nextImage =()=>{
 
    index++;
    if(index >= images.length){
        index = 0;
    }
    const image = document.querySelector('.image_slide');
    image.src = images[index];


}


const previousImage =()=>{
    console.log('====================================');
    console.log('Previous Image');
    console.log('====================================');
    index--;
    if(index < 0){
        index = images.length - 1;
    }
    const image = document.querySelector('.image_slide');
    image.src = images[index];
}


const selectedImage = (index)=>{
    const image = document.querySelector('.image_slide');
    image.src = images[index];
}



const closeSlider = ()=>{
    document.querySelector('.slider').style.display = 'none';
}

const openSlider = ()=>{
    document.querySelector('.slider').style.display = 'flex';
}