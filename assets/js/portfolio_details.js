const divElement = document.querySelector('.swiper-wrapper.align-items-center');

async function portfolioDetails() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    let currentId = params.get('id') || 'classroom_chronicles';

    const response = await fetch('data/portfolio.json');
    const portfolioItems = await response.json();

    const portfolioItem = portfolioItems.find(item => item.id === currentId);

    const titleElement = document.querySelector('li[details="title"]');
    titleElement.innerHTML = portfolioItem.title;

    const typeElement = document.querySelector('span[details="type"]');
    typeElement.innerHTML = portfolioItem.type;

    const clientNameElement = document.querySelector('span[details="client_name"]');
    clientNameElement.innerHTML = portfolioItem.client_name ?? "-";

    const projectDateElement = document.querySelector('span[details="project_date"]');
    projectDateElement.innerHTML = portfolioItem.project_date ?? "-";

    const statusElement = document.querySelector('span[details="status"]');
    statusElement.innerHTML = portfolioItem.status ?? "-";

    const projectURLElement = document.querySelector('a[details="project_url"]');
    projectURLElement.innerHTML = portfolioItem.project_url ?? "-";
    projectURLElement.href = portfolioItem.project_url ?? "#";

    const h2TitleElement = document.querySelector('h2[details="title"]');
    h2TitleElement.innerHTML = portfolioItem.title;

    var currentLang = this.currentLang ?? "id";
    const descriptionElement = document.querySelector('p[details="description"]');
    descriptionElement.innerHTML = portfolioItem.description[currentLang].join('<br>');

    portfolioItem.images.forEach(image => {
        let div = `<div class="swiper-slide">
        <img src="${image}" alt="">
        </div>`;
        
        divElement.innerHTML += div;
    });
    initSwiper();
}


  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }


portfolioDetails();