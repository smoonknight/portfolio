const portfolioContainer = document.querySelector('.row.gy-4.isotope-container');

async function loadPortfolio() {
  const response = await fetch('data/portfolio.json');
  const portfolioItems = await response.json();
  
  portfolioItems.forEach(item => {
    const filters = item.filters.join(' ');
    let portfolioHTML = `
        <div class="col-lg-4 col-md-6 portfolio-item isotope-item ${filters}">
          <div class="portfolio-content h-100">
            <img src="${item.image}" class="img-fluid" alt="">
            <div class="portfolio-info">
              <h4>${item.type}</h4>
              <p>${item.title}</p>
              <a href="${item.image}" title="${item.title}" data-gallery="portfolio-gallery-app" class="glightbox preview-link">
                <i class="bi bi-zoom-in"></i>
              </a>
              <a href="portfolio-details.html?id=${item.id}" title="More Details" class="details-link">
                <i class="bi bi-link-45deg"></i>
              </a>
            </div>
          </div>
        </div>
    `;
    portfolioContainer.innerHTML += portfolioHTML;
  });

  initializeIsotope();
  
  portfolioContainer.style.position = 'relative';
  portfolioContainer.style.height = 'auto';
}

function initializeIsotope() {
  imagesLoaded(portfolioContainer, function() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope;
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      // Menambahkan event listener untuk filter
      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
    });
  });
}

loadPortfolio();