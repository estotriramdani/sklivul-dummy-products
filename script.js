const contentWrapperElement = document.getElementById('contentWrapper');

const URL_PRODUCTS = 'https://6527e890931d71583df19400.mockapi.io/api/products';

const generateProductCard = (title, photo, description) => {
  return `
<div class="col-sm-6 col-md-4 col-lg-3 mb-4">
  <div class="card" style="height: 100%">
    <img src="${photo}" class="card-img-top" style="aspect-ratio: 16 / 9; object-fit: cover" alt="...">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${description}</p>
      
    </div>
    <div class="card-footer bg-transparent">
      <button class="btn btn-outline-primary"><i class="bi bi-heart"></i> Like</button>
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
</div>`

contentWrapperElement.innerHTML = generateSkeleton.repeat(9)

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
      const contentCard = generateProductCard(element.productName, element.cover, element.productDescription);
      contentHtml = contentHtml + contentCard;
    }
    contentWrapperElement.innerHTML = contentHtml;
  })
  .catch((error) => {
    console.error(error);
  });
