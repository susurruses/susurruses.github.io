// List
var options = {
  valueNames: [ 'un-num__number', { data: ['nfpa'] } ]
};

var hazardList = new List('data-table-wrap', options);

// Popups
const dialogToggles = document.querySelectorAll('.more-info-button');
dialogToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const dialog = document.querySelector('.more-info-dialog');

    // Add details to the modal
    getDetails(toggle);

    dialog.showModal();
  });
});

// Load data into dialog
function getDetails(toggle) {
  let tr = toggle.closest('tr');
  let details = [];
  let output = [];

  // Function to check if data exists, and adds it to details array if so
  const addData = function (selector, prop) {
    if (tr.querySelector(selector)) {
      details[prop] = tr.querySelector(selector).textContent;
    }
  }

  // Load data
  addData('.proper-shipping-name',        'Name');
  addData('.un-num__number',              'unNum');
  addData('.nfpa--health .nfpa__num',     'health');
  addData('.nfpa--fire .nfpa__num',       'fire');
  addData('.nfpa--reactivity .nfpa__num', 'reactivity');
  addData('.nfpa--special .nfpa__num',    'special');

  // Set up output
  if (details['Name']) {
    output['Name'] = details['Name'];
  }

  if (tr.querySelector('.un-num__class')) {
    var classData = getClassDetails(tr.querySelector('.un-num__class').getAttribute('data-class'));

    if (classData) {
      output['Category'] = classData['Category'];
      output['Class'] = '<strong>' + classData['Class'] + ':</strong> ' + classData['Text'];
      output['Hazmat Placard'] = '<div class="un-num un-num--lg color--' + classData['Color'] + ' hazmat-icon hazmat-icon--' + classData['Icon'] + '"><div class="un-num__inner"><span class="un-num__number">' + details['unNum'] + '</span><small class="un-num__class">' + classData['Class'] + '</small></div></div>';
    }
  }

  if (details['health']) {
    var maybeS = ('w' === details['special']) ? '<s>w</s>' : details['special'];

    output['NFPA 704'] = '<ul class="nfpa-list"><li><span class="nfpa-box nfpa-box--health">Health <b class="nfpa-box__num">' + details['health'] + '</b></span>' + getNFPAdata('health', details['health']) + '</li>' + 
                            '<li><span class="nfpa-box nfpa-box--fire">Fire <b class="nfpa-box__num">' + details['fire'] + '</b></span>' + getNFPAdata('fire', details['fire']) + '</li>' + 
                            '<li><span class="nfpa-box nfpa-box--reactivity">Reactivity <b class="nfpa-box__num">' + details['reactivity'] + '</b></span>' + getNFPAdata('reactivity', details['reactivity']) + '</li>' + 
                            '<li><span class="nfpa-box nfpa-box--special">Special <b class="nfpa-box__num">' + maybeS + '</b></span>' + getNFPAdata('special', details['special']) + '</li>' + 
                            '</ul>';
  }

  // Search links
  if (details['Name']) {
    const urlForSearch = encodeURIComponent(details['Name']);
    output['Search'] = '<a target="_blank" href="https://en.wikipedia.org/w/index.php?search=' + urlForSearch + '&title=Special:Search">Wikipedia</a><br><a target="_blank" href="https://duckduckgo.com/?q=' + urlForSearch + '">DuckDuckGo</a><br><a target="_blank" href="https://www.google.com/search?q=' + urlForSearch + '">Google</a>';
  }

  // Output info into modal
  const modalInfoList = document.querySelector('.more-info-dialog .info-list');
  var infoList = '';
  Object.keys(output).forEach(function (value, index) {
    infoList += '<div class="info-list__item"><dt class="info-list__key">'+value+'</dt><dl class="info-list__value">'+output[value]+'</dl></div>';
  });
  modalInfoList.innerHTML = infoList;
}

// Get class details
function getClassDetails(classNum) {
  const classes = [{"Class":"1","Text":"Explosives","Category":"Explosives","Color":"orange","Icon":"explosive"},{"Class":"1.1","Text":"Mass Explosion Hazard","Category":"Explosives","Color":"orange","Icon":"explosive"},{"Class":"1.2","Text":"Blast\/Projection Hazard","Category":"Explosives","Color":"orange","Icon":"explosive"},{"Class":"1.3","Text":"Minor Blast Hazard","Category":"Explosives","Color":"orange","Icon":"explosive"},{"Class":"1.4","Text":"Major Fire Hazard","Category":"Explosives","Color":"orange","Icon":""},{"Class":"1.5","Text":"Blasting Agents","Category":"Explosives","Color":"orange","Icon":""},{"Class":"1.6","Text":"Extremely Insensitive Explosives","Category":"Explosives","Color":"orange","Icon":""},{"Class":"2","Text":"Gases","Category":"Gases","Color":"","Icon":""},{"Class":"2.1","Text":"Flammable Gas","Category":"Gases","Color":"red","Icon":"flammable"},{"Class":"2.2","Text":"Non-Flammable Gas","Category":"Gases","Color":"green","Icon":"nonflammable-gas"},{"Class":"2.3","Text":"Poisonous Gas","Category":"Gases","Color":"white","Icon":"poisonous"},{"Class":"3","Text":"Flammable Liquids","Category":"Flammable Liquids","Color":"red","Icon":"flammable"},{"Class":"4","Text":"Flammable Solids","Category":"Flammable Solids","Color":"","Icon":"flammable"},{"Class":"4.1","Text":"Flammable Solids","Category":"Flammable Solids","Color":"red-white-stripes","Icon":"flammable"},{"Class":"4.2","Text":"Spontaneously Combustible","Category":"Flammable Solids","Color":"white-red","Icon":"flammable"},{"Class":"4.3","Text":"Dangerous when Wet","Category":"Flammable Solids","Color":"blue","Icon":"flammable"},{"Class":"5","Text":"Oxidizing Agents and Organic Peroxides","Category":"Oxidizing Agents and Organic Peroxides","Color":"","Icon":""},{"Class":"5.1","Text":"Oxidizing Agent","Category":"Oxidizing Agents and Organic Peroxides","Color":"yellow","Icon":"oxidizing"},{"Class":"5.2","Text":"Organic Peroxide Oxidizing Agent","Category":"Oxidizing Agents and Organic Peroxides","Color":"red-yellow","Icon":"flammable"},{"Class":"6","Text":"Toxic and Infectious Substances","Category":"Toxic and Infectious Substances","Color":"","Icon":""},{"Class":"6.1","Text":"Poison","Category":"Toxic and Infectious Substances","Color":"white","Icon":"poisonous"},{"Class":"6.2","Text":"Biohazard","Category":"Toxic and Infectious Substances","Color":"white","Icon":"biohazard"},{"Class":"7","Text":"Radioactive","Category":"Radioactive Substances","Color":"yellow-white","Icon":"radioactive"},{"Class":"8","Text":"Corrosive","Category":"Corrosive Substances","Color":"white-black","Icon":"corrosive"},{"Class":"9","Text":"Miscellaneous","Category":"Miscellaneous","Color":"black-white-stripes-white","Icon":""}];

  const match = classes.find(({ Class }) => Class === classNum);

  return match;
}

// Get NFPA details
function getNFPAdata(quadrant, num) {
  const nfpa = {
    'health': {
      '0': 'Material which on exposure under fire conditions would offer no hazard beyond that of ordinary combustible material.',
      '1': 'Material which on exposure would cause irritation but only minor residual injury even if no treatment is given.',
      '2': 'Material that on intense or continued but not chronic exposure could cause temporary incapacitation or possible residual injury.',
      '3': 'Material that on short exposure could cause serious temporary or residual injury.',
      '4': 'Material that on very short exposure could cause death or major residual injury.',
    },
    'fire': {
      '0': 'Material will not burn.',
      '1': 'Material must be pre-heated before ignition can occur.<br>Flash Point At or Above 200ºF (93.4ºC)',
      '2': 'Material must be moderately heated or exposed to relatively high ambient temperature before ignition can occur.<br>Flash Point At or Above 100ºF (37.8ºC) - Below 200ºF (93.4ºC)',
      '3': 'Liquids and solids that can be ignited under almost all ambient temperature conditions.<br>Flash Point At or Above 73ºF (22.8ºC) - Below 100ºF (37.8ºC)<br>Boiling Point At or Above 100ºF (37.8ºC)',
      '4': 'Materials that will rapidly or completely vaporize at atmospheric pressure and normal ambient temperature, or that are readily dispersed in air and that will burn readily.<br>Flash Point Below 73ºF (22.8ºC)<br>Boiling Point Below 100ºF (37.8ºC)',
    },
    'reactivity': {
      '0': 'Material that in itself is normally stable, even under fire exposure conditions, and is not reactive with water.',
      '1': 'Material that in itself is normally stable, but which can become unstable at elevated temperatures and pressures.',
      '2': 'Material that readily undergoes violent chemical change at elevated temperatures and pressures or which reacts violently with water or which may form explosive mixtures with water.',
      '3': 'Material that in itself is capable of detonation or explosive decomposition or reaction but requires a strong initiating source or which must be heated under confinement before initiation or which reacts explosively with water.',
      '4': 'Material that in itself is readily capable of detonation or of explosive decomposition or reaction at normal temperatures and pressures.',
    },
    'special': {
      'ox': 'Material possesses oxidizing properties. A chemical which can greatly increase the rate of combustion/fire.',
      'w': 'Unusual reactivity with water. This indicates a potential hazard using water to fight a fire involving this material.(i.e. don&apos;t put water on it)',
      'w, ox': 'Material possesses oxidizing properties. A chemical which can greatly increase the rate of combustion/fire.<br>Unusual reactivity with water. This indicates a potential hazard using water to fight a fire involving this material.(i.e. don&apos;t put water on it)'
    },
  };

  if (null != nfpa[quadrant][num]) {
    return nfpa[quadrant][num];
  } else {
    return '';
  }
}

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