// List
var options = {
  valueNames: [ 'un-num__number', { data: ['nfpa'] } ]
};

var hazardList = new List('data-table-wrap', options);

// Popups
const dialogToggles = document.querySelectorAll('.more-info-button');
dialogToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const nextDialog = toggle.nextElementSibling;

    nextDialog.showModal();
  });
});

// Service worker (make available offline)
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        'service-worker.js',
        {
          scope: './',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
registerServiceWorker();