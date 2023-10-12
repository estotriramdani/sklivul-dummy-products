const URL_PRODUCTS = 'https://6527e890931d71583df19400.mockapi.io/api/products';

const LIKED_KEY = '5cc0bbd0078094e9d0d22fa2ddabe556';

const contentWrapperElement = document.getElementById('contentWrapper');

let currentLikes = [];

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

  if (!localProducts) {
    localStorage.setItem(LIKED_KEY, '[]');
    localProducts = localStorage.getItem(LIKED_KEY);
  }

  const likedProducts = JSON.parse(localProducts);

  const isExist = likedProducts.find((product) => product.id === obj.id);

  if (isExist) {
    alert('Produk sudah disukai. Silakan cek laman favorit.');
    return;
  }

  likedProducts.push(obj);

  localStorage.setItem(LIKED_KEY, JSON.stringify(likedProducts));
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
      <button class="${classButton}" onclick="handleLike(${JSON.stringify(obj).replace(
    /\"/g,
    "'"
  )})">${iconButton} ${textButton}</button>
    </div>
  </div>
</div>`;
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

/* 
1. Buat variable `let contentHtml = ''` untuk menampung semua element yg berupa string;
2. Looping response, kemudian timpa `contentHtml` dengan concatenation dari fungsi generateProductCard
3. setInnerHTML contentWrapperElement `contentHtml`
*/

fetch(URL_PRODUCTS)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    let contentHtml = '';
    for (let i = 0; i < response.length; i++) {
      const element = response[i];
      const isLiked = currentLikes.findIndex((like) => like.id === element.id);
      const contentCard = generateProductCard(element, isLiked !== -1);
      contentHtml = contentHtml + contentCard;
    }
    contentWrapperElement.innerHTML = contentHtml;
  })
  .catch((error) => {
    console.error(error);
  });
