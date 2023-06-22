import { app } from './firebase.js'
// import { inCart } from './inCart.js'
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js"

// == Setup Code ==
const database = getDatabase(app)
const dbRef = ref(database)

// == GLOBAL SCOPE ==
const products = document.querySelector('.products')


// Was the 'add to cart' button clicked?
const updateDatabase = (event, value) => {
  const id = `p${event.currentTarget.id}`
  const childRef = ref(database, `/plants/${id}`)
  update(childRef, {inCart: value})
}

// Get user cart data
onValue(dbRef, (data) => {
  
  if(data.exists()){
    const payload = data.val().plants
    const allProducts = Object.values(payload)

    // products in cart / inCart === true
      const addToCart = allProducts.filter((plant) => {
      return plant.inCart === true
    });
    
    // TODO: write code here that will make inCart === true display in the cart pop-out feature
    displayPlants(allProducts, products)
    // displayPlants(addToCart, cart)
  } else {
    console.log('No data to report!')
  }
});


// Display animal photos and make add to cart button
const displayPlants = (arrayOfPlants, node) => {
  node.innerHTML = ''
  arrayOfPlants.forEach((plant) => {
    const div = document.createElement('div')
    div.classList.add('plant')
    const img = document.createElement('img')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    p.classList.add('greenInfo')
    const button = document.createElement('button')
    const buttonImg = document.createElement('img')
    
    button.id = plant.id
    buttonImg.src = "./assets/icons/cart.svg"
    // Listen for adding to cart
    button.addEventListener('click', function(event){
      updateDatabase(event, plant.inCart+1)
      console.log("clicked yes")

      addToDiv(plant)
    })
    
    h3.textContent = plant.name
    img.alt = plant.alt
    img.src = plant.src
    p.textContent = `$${plant.price.toFixed(2)}`
    div.append(img);
    button.append(buttonImg);
    div.append(button);
    div.append(h3);
    div.append(p)
    node.append(div);
  });
}

function addToDiv(plant) {
  console.log({plant})
  const inCartElement = document.getElementById('inCart')
  const title = document.createElement('div')
  title.textContent = plant.name
  inCartElement.append(title)


  //jazz's idea
  // function addToDiv (plant, price) {
  //   console.log({ plant });
  //   const inCartElement = document.getElementById('inCart');
  //   const title = document.createElement('div');
  //   title.textContent = plant.name;
    
  //   const priceElement = document.createElement('div');
  //   priceElement.textContent = 'Price: ' + price;
    
  //   title.appendChild(priceElement);
  //   inCartElement.appendChild(title);
  //   }

  ////////////////////////////////////

  // title.textContent = plant.price
  // inCartElement.append(price)

  // title.textContent = plant.src
  // inCartElement.append(src)
}
////joeys stufff for incart
//when item clicked

// when p1 is clicked add div to inCart
// const p1isClicked = document.getElementById('p1');
// onclick console.log('p1 was clicked');



// button.addEventListener("click", () => {
//   body.inCart.addEventListener document.getElementById('p1');
// return console.log('p1 was clicked');
// });

//it will be added here with its name property and price property
// go to inCart menu
//after that we willl add a plus and minus OR quantity input to change the amount of the item
//these will add as new li's
//at bottom of page math needs to math sum total

// inCart();