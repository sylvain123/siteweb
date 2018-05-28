(function() {
  // Cache references to the DOM to avoid checking later
  const container = document.getElementById('products');
  const basketCount = document.querySelector('.header__basket-count');
  const animationContext = document.getElementById('basket-animation-context');
  
  // Store products and basket items
  const productList = [];
  const basket = [];

  // Cache the check to see if this browser supports the Web Animations API
  const supportsAnimationsApi = browserSupportsWebAnimationsApi();
  
  // Add listeners to add items to basket on click/touch
  container.addEventListener('click', checkAddToBasket);
  container.addEventListener('touch', checkAddToBasket);
  
  // Generate a card based on object data
  function createCard(product) {
    const card = document.createElement('article');
    card.className = 'product';
    card.innerHTML = `
    <div class="product__image" style="background-image: url('${product.image}')"></div>
    <div class="product__info-container">
    <div class="product__info">
    <h1 class="product__name">${product.name}</h1>
    <p class="product__description">${product.description}</p>
    </div>
    <button class="product__add" data-id=${product.id}>Add to Basket</button>
    </div>
    `;
    
    return card;
  }
  
  // Check to see if the click/touch registered was on a button
  function checkAddToBasket(e) {
    // Does what was clicked look like a button, and have an associated product ID?
    if (e.target.className == 'product__add' && parseInt(e.target.dataset.id, 10) >= 0) {
      const product = productList.find(listItem => listItem.id === parseInt(e.target.dataset.id, 10));
      
      if (!product) {
        // Don't do anything special otherwise
        return false;
      }
      
      // Add product to basket inside JavaScript...
      addToBasket(product);
      
      // ...and animate that if the browser supports it
      if (supportsAnimationsApi) {
        animateToBasket(e, product);
      }
    }
  }
  
  // Add the supplied product to the basket
  function addToBasket(product) {
    // Check if an actual product was supplied before going any further
    if (!product) {
      return false;
    }
    
    // Push product to our makeshift basket array
    basket.push(product);
    
    // Update the visuals to show the amount of products in the basket
    updateBasketCount();
  }
  
  // Show how many products are in the basket, if there are any
  function updateBasketCount() {
    let length = basket.length;
    
    // To avoid breaking the view, cap the display at 2 digits
    if (basket.length > 99) {
      length = "99+";
    }
    
    basketCount.innerText = length;
  }
  
  // Animate the product from where the user clicks/touches to the basket
  function animateToBasket(e, product) {
    // Capture point that was clicked/touched
    const x = e.clientX;
    const y = e.clientY;
    
    // Grab the total dimensions of the viewport
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    
    // Generate thumbnail element to animate to basket
    const image = document.createElement('img');
    image.className = 'basket-animation-context__icon';
    image.src = product.image;
    
    animationContext.appendChild(image);
    
    // Use assumed values rather than getBoundingClientRect to avoid triggering paint
    const coordinates = {
      left: 0,
      top: 0,
      width: 50,
      height: 50,
    }
  
    // Calculate the start position of the transform
    const startX = x - coordinates.left - (coordinates.width / 2);
    const startY = y - coordinates.top - (coordinates.height / 2);
    
    // Calculate the end position of the transform
    const endX = window.innerWidth - coordinates.left - (coordinates.width / 2) - 20;
    const endY = 0 - coordinates.top - (coordinates.height / 2) + 40;
    
    // Compute keyframes for start and end points
    const keyframes = [
      {
        transform: `translateX(${startX}px) translateY(${startY}px) scale(1)`,
        opacity: 1,
      },
      {
        transform: `translateX(${endX}px) translateY(${endY}px) scale(0.25)`,
        opacity: 0,
      }
    ];

    // Define which settings should be used for the animation
    const options = {
      fill: 'forwards',
      easing: 'ease-in-out',
      duration: 1000,
    };
    
    // Animate the icon using the Web Animations API
    const animation = image.animate(keyframes, options);
    
    // Remove the thumbnail from the DOM when the animation is complete
    animation.onfinish = function() {
      animationContext.removeChild(image);
    }
  }
  
  // Does this browser support the Web Animations API?
  function browserSupportsWebAnimationsApi() {
    const test = document.createElement('div');
    if ('animate' in test) {
      return true;
    }
    
    return false;
  }
  
  // Generate 5 random products for the store
  for (let i = 0; i < 1; i++) {
    productList.push({
      id: i,
      image: `products/${(i % 5) + 1}.jpg`,
      name: `Adhésion plein tarif 35€ `,
      description: `Cet achat correspond à l'adhésion à lapliut `,
    });
      
  } 
    for (let i = 1; i < 2; i++) {
    productList.push({
      id: i,
      image: `products/${(i % 5) + 1}.jpg`,
      name: `Adhésion retraités 15€ `,
      description: `Pour les personnes à la retraite `,
    });
      
  } 
     for (let i = 2; i < 3; i++) {
    productList.push({
      id: i,
      image: `products/${(i % 5) + 1}.jpg`,
      name: `Inscription au congrès 85€ membres apliut`,
      description: `inclu 2 repas à midi de 15€`,
    });
      
  } 
     for (let i = 3; i < 4; i++) {
    productList.push({
      id: i,
      image: `products/${(i % 5) + 1}.jpg`,
      name: `Inscription au congrès 135€ non membres apliut`,
      description: `inclu 2 repas à midi de 15€`,
    });
      
  } 
    for (let i = 4; i < 5; i++) {
    productList.push({
      id: i,
      image: `products/${(i % 5) + 1}.jpg`,
      name: `Inscription au congrès 25€ Doctorants`,
      description: `Cette inscription est pour les étudiants en doctorat`,
    });
      
  } 
     for (let i = 5; i < 6; i++) {
    productList.push({
      id: i,
      image: `products/${(6)}.jpg`,
      name: `Repas Le mas de Dardagna 45€`,
      description: `Option en plus`,
    });
      
  }


  for (let i = 0; i < productList.length; i++) {
    container.appendChild(createCard(productList[i]));
  }
})();