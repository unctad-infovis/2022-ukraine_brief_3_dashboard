import React, { useState, useEffect } from 'react';
import '../styles/styles.less';
import '../styles/styles_mini.less';

// Load helpers.
// import FormatNr from './helpers/FormatNr.js';
// import RoundNr from './helpers/RoundNr.js';

import CSVtoJSON from './helpers/CSVtoJSON.js';
import Dashboard from './helpers/Dashboard.jsx';

const appID = '#app-root-2022-ukraine_brief_3_dashboard_mini';

function App() {
  const [narrow, setNarrow] = useState('');

  // Data states.
  const [seriesBondSpread, setSeriesBondSpread] = useState([]);
  const [seriesClarkson, setSeriesClarkson] = useState([]);
  const [seriesEnergy, setSeriesEnergy] = useState([]);
  const [seriesFaoFoodPriceIndex, setSeriesFaoFoodPriceIndex] = useState([]);

  const cleanData = (data, type) => {
    if (data !== false) {
      switch (type) {
        case 'fao_food_price_index.csv':
          setSeriesFaoFoodPriceIndex(data);
          break;
        case 'clarkson.csv':
          setSeriesClarkson(data);
          break;
        case 'energy.csv':
          setSeriesEnergy(data);
          break;
        case 'bond_spread.csv':
          setSeriesBondSpread(data);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const files = ['bond_spread.csv', 'clarkson.csv', 'energy.csv',
      'fao_food_price_index.csv'];

    files.forEach(file => {
      const data_file = `https://storage.unctad.org/2022-ukraine_brief_3_dashboard/assets/data/${file}`;
      try {
        fetch(data_file, { method: 'GET' })
          .then(response => response.text())
          .then(body => cleanData(CSVtoJSON(body), file));
      } catch (error) {
        console.error(error);
      }
    });

    // eslint-disable-next-line no-unused-expressions,func-names
    !(function () {
      // eslint-disable-next-line no-restricted-syntax,no-void,guard-for-in
      window.addEventListener('message', ((e) => { if (void 0 !== e.data['datawrapper-height']) { const t = document.querySelectorAll(`${appID} iframe`); for (const a in e.data['datawrapper-height']) for (let r = 0; r < t.length; r++) { if (t[r].contentWindow === e.source)t[r].style.height = `${e.data['datawrapper-height'][a]}px`; } } }));
    }());
    window.addEventListener('resize', () => (document.querySelector(`${appID} .app`).offsetWidth < 361 ? setNarrow('narrow') : setNarrow('')));
    return document.querySelector(`${appID} .app`).offsetWidth < 361 ? setNarrow('narrow') : setNarrow('');
  }, []);

  return (
    <div className={`app ${narrow}`}>
      <div className="app_content">
        <Dashboard seriesFaoFoodPriceIndex={seriesFaoFoodPriceIndex} seriesEnergy={seriesEnergy} seriesClarkson={seriesClarkson} seriesBondSpread={seriesBondSpread} appID={appID} />
        <noscript>Your browser does not support JavaScript!</noscript>
      </div>
    </div>
  );
}

export default App;
