const URL_PRODUCTS = 'https://6527e890931d71583df19400.mockapi.io/api/products';

const AUTH_KEY = 'c5aed7e7f609d2370861f380eccb94e6';

const logoutButtonElement = document.getElementById('logoutButton')

logoutButtonElement.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.removeItem(AUTH_KEY);
  window.location.replace('login.html')
})

const LIKED_KEY = '5cc0bbd0078094e9d0d22fa2ddabe556';

const contentWrapperElement = document.getElementById('contentWrapper');

let currentLikes = [];
const allProducts = [];

const buttonText = {
  unlike: '<i class="bi bi-heart-fill"></i> Unlike',
  like: '<i class="bi bi-heart"></i> Like',
};

const generateProductCard = (obj, isLiked) => {
  let classButton = 'btn btn-outline-primary';
  let textButton = 'Like';
  let iconButton = '<i class="bi bi-heart"></i>';

  if (isLiked) {
    classButton = 'btn btn-primary';
    textButton = 'Unlike';
    iconButton = '<i class="bi bi-heart-fill"></i>';
  }

  return `
<div class="col-sm-6 col-md-4 col-lg-3 mb-4">
  <div class="card" style="height: 100%">
    <img src="${
      obj.cover
    }" class="card-img-top" style="aspect-ratio: 16 / 9; object-fit: cover;" alt="...">
    <div class="card-body">
      <h5 class="card-title">${obj.productName}</h5>
      <p class="card-text">${obj.productDescription}</p>
      
    </div>
    <div class="card-footer bg-transparent">
      <button class="${classButton}" id="button-like-${
    obj.id
  }" onclick="handleLike(${JSON.stringify(obj).replace(
    /\"/g,
    "'"
  )})">${iconButton} ${textButton}</button>
    </div>
  </div>
</div>`;
};

const renderContent = (products) => {
  let contentHtml = '';
  for (let i = 0; i < products.length; i++) {
    const element = products[i];
    const isLiked = currentLikes.findIndex((like) => like.id === element.id);
    const contentCard = generateProductCard(element, isLiked !== -1);
    contentHtml = contentHtml + contentCard;
    allProducts.push(element);
  }
  contentWrapperElement.innerHTML = contentHtml;
};

const getAllLikes = () => {
  let localProducts = localStorage.getItem(LIKED_KEY);

  if (!localProducts) {
    localStorage.setItem(LIKED_KEY, '[]');
    localProducts = localStorage.getItem(LIKED_KEY);
  }

  const likedProducts = JSON.parse(localProducts);
  currentLikes = likedProducts;
};

getAllLikes();

const handleLike = (obj) => {
  let localProducts = localStorage.getItem(LIKED_KEY);

  let isLiking = false;

  if (!localProducts) {
    localStorage.setItem(LIKED_KEY, '[]');
    localProducts = localStorage.getItem(LIKED_KEY);
  }

  const likedProducts = JSON.parse(localProducts);

  const isExist = likedProducts.find((product) => product.id === obj.id);

  if (isExist) {
    const filtered = likedProducts.filter((product) => product.id !== obj.id);
    localStorage.setItem(LIKED_KEY, JSON.stringify(filtered));
  } else {
    likedProducts.push(obj);
    isLiking = true;
    localStorage.setItem(LIKED_KEY, JSON.stringify(likedProducts));
  }

  const buttonElement = document.getElementById(`button-like-${obj.id}`);

  if (isLiking) {
    buttonElement.classList.remove('btn-outline-primary');
    buttonElement.classList.add('btn-primary');
    buttonElement.innerHTML = buttonText.unlike;
  } else {
    buttonElement.classList.remove('btn-primary');
    buttonElement.classList.add('btn-outline-primary');
    buttonElement.innerHTML = buttonText.like;
  }
};

const generateSkeleton = `<div class="col-sm-6 col-md-4 col-lg-3 mb-4">
<div class="card" aria-hidden="true">
  <div class="w-100 placeholder" style="aspect-ratio: 16 / 9;">
  </div>
  <div class="card-body">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-7"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-6"></span>
      <span class="placeholder col-8"></span>
    </p>
    <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
  </div>
</div>
</div>`;

contentWrapperElement.innerHTML = generateSkeleton.repeat(9);

fetch(URL_PRODUCTS)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    renderContent(response);
  })
  .catch((error) => {
    console.error(error);
  });
