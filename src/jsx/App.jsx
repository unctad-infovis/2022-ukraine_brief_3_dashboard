import React, { useState, useEffect } from 'react';
import '../styles/styles.less';

// Load helpers.
// import FormatNr from './helpers/FormatNr.js';
// import RoundNr from './helpers/RoundNr.js';
import DashBoardItem from './helpers/DashBoardItem.jsx';
import ChartContainer from './helpers/ChartContainer.jsx';
import CSVtoJSON from './helpers/CSVtoJSON.js';

import barrel from '../../assets/img/icons/Ukraine_brief_3-2022-barrel.png';
import bill from '../../assets/img/icons/Ukraine_brief_3-2022-bill.png';
import boat from '../../assets/img/icons/Ukraine_brief_3-2022-boat.png';
import wheat from '../../assets/img/icons/Ukraine_brief_3-2022-wheat.png';

function App() {
  // Data states.

  // eslint-disable-next-line
  const [seriesBondSpread, setSeriesBondSpread] = useState([]);
  const [seriesClarkson, setSeriesClarkson] = useState([]);
  const [seriesCPI, setSeriesCPI] = useState([]);
  const [seriesEnergy, setSeriesEnergy] = useState([]);
  const [seriesFaoFoodPriceIndex, setSeriesFaoFoodPriceIndex] = useState([]);
  const [seriesGDPNowCast, setGDPNowCast] = useState([]);
  const [seriesTradeNowcast, setTradeNowcast] = useState([]);
  const [seriesWBFertilizerIndex, setSeriesWBFertilizerIndex] = useState([]);
  const [seriesWPWheatSunflower, setWPWheatSunflower] = useState([]);

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
        case 'wb_fertilizer_index.csv':
          setSeriesWBFertilizerIndex(data);
          break;
        case 'cpi.csv':
          setSeriesCPI(data);
          break;
        case 'gdp_nowcast.csv':
          setGDPNowCast(data);
          break;
        case 'trade_nowcast.csv':
          setTradeNowcast(data);
          break;
        case 'wb_wheat_sunflower.csv':
          setWPWheatSunflower(data);
          break;

        default:
          break;
      }
    }
    document.querySelector('.app_content').style.opacity = 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    const files = ['bond_spread.csv', 'clarkson.csv', 'cpi.csv', 'energy.csv',
      'fao_food_price_index.csv', 'gdp_nowcast.csv', 'trade_nowcast.csv', 'wb_fertilizer_index.csv', 'wb_wheat_sunflower.csv'];

    files.forEach(file => {
      const data_file = `https://storage.unctad.org/2022-ukraine_brief_3_dashboard/${file}`;
      try {
        fetch(data_file, { method: 'GET' })
          .then(response => response.text())
          .then(body => cleanData(CSVtoJSON(body), file));
      } catch (error) {
        console.error(error);
      }
    });

    try {
      fetch('https://storage.unctad.org/2022-ukraine_brief_3_dashboard/bond_spread.csv', { method: 'GET' })
        .then(response => response.text())
        .then(body => console.log(body));
    } catch (error) {
      console.error(error);
    }

    // eslint-disable-next-line no-unused-expressions,func-names
    !(function () {
      // eslint-disable-next-line no-restricted-syntax,no-void,guard-for-in
      window.addEventListener('message', ((e) => { if (void 0 !== e.data['datawrapper-height']) { const t = document.querySelectorAll('iframe'); for (const a in e.data['datawrapper-height']) for (let r = 0; r < t.length; r++) { if (t[r].contentWindow === e.source)t[r].style.height = `${e.data['datawrapper-height'][a]}px`; } } }));
    }());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeAll = () => {
    document.querySelectorAll('.tab_content').forEach(el => {
      el.style.opacity = 0;
      el.style.display = 'none';
      el.classList.remove('selected');
    });
    document.querySelectorAll('.tab_button').forEach(el => {
      el.classList.remove('selected');
      el.classList.remove('not_selected');
    });
  };

  const changeTab = (event, tab) => {
    if (event.currentTarget.classList.contains('selected') === true) {
      closeAll();
    } else {
      document.querySelectorAll('.tab_content').forEach(el => {
        el.style.opacity = 0;
        el.style.display = 'none';
        el.classList.remove('selected');
      });
      document.querySelectorAll('.tab_button').forEach(el => {
        el.classList.remove('selected');
        el.classList.add('not_selected');
      });
      document.querySelector(tab).style.opacity = 1;
      document.querySelector(tab).style.display = 'flex';
      event.currentTarget.classList.add('selected');
      document.querySelectorAll(`${tab} iframe`).forEach(el => {
        el.src = el.getAttribute('data-src');
      });
    }
  };

  return (
    <div className="app">
      <div className="app_content">
        <h1>Pulse of the global crisis</h1>
        <div className="dashboard_items">
          <DashBoardItem idx="0" image={wheat} series={seriesFaoFoodPriceIndex} series_value_name="value" title="Food prices" unit="%" />
          <DashBoardItem idx="1" image={barrel} series={seriesEnergy} series_value_name="crude_oil_price" title="Crude Oil Price" unit="%" />
          <DashBoardItem idx="2" image={boat} series={seriesClarkson} series_value_name="clarksea_index" title="Shipping prices" unit="%" />
          <DashBoardItem idx="3" image={bill} series={seriesBondSpread} series_value_name="bond_spread_sovereign" title="Emerging markets: Sovereign bond spread" unit="%" />
        </div>
        <h1>Select a category to dive deeper</h1>
        <div className="tabs_container">
          <div className="tab_container tab_container">
            <button type="button" className="tab_button button_food" onClick={(event) => changeTab(event, '.tab_content_food')}>
              <span className="label label_food">Food</span>
            </button>
          </div>
          <div className="tab_container">
            <button type="button" className="tab_button button_energy" onClick={(event) => changeTab(event, '.tab_content_energy')}>
              <span className="label label_energy">Energy</span>
            </button>
          </div>
          <div className="tab_container">
            <button type="button" className="tab_button button_finance" onClick={(event) => changeTab(event, '.tab_content_finance')}>
              <span className="label label_finance">Finance</span>
            </button>
          </div>
        </div>
        <div className="tabs_content">
          <div className="tab_content tab_content_food">
            <ChartContainer title="Food prices" id="datawrapper-chart-Q9Axr" src="https://datawrapper.dwcdn.net/1TNTr" meta={[{ label: 'FAO Food Price Index', value_name: 'value' }]} series={seriesFaoFoodPriceIndex} />
            <ChartContainer title="Selected commodity prices" id="datawrapper-chart-hA5mF" src="https://datawrapper.dwcdn.net/7pkwP" meta={[{ label: 'Sunflower Oil', value_name: 'wb_sunflower_oil_price' }, { label: 'Wheat', value_name: 'wb_wheat_us_hrw_price' }]} series={seriesWPWheatSunflower} />
            <ChartContainer title="Fertilizer Price" id="datawrapper-chart-TrG3p" src="https://datawrapper.dwcdn.net/AH7rn" meta={[{ label: 'Fertilizer price', value_name: 'value' }]} series={seriesWBFertilizerIndex} />
            <div className="close_container"><button type="button" onClick={() => closeAll()}>Hide graphs</button></div>
          </div>
          <div className="tab_content tab_content_energy">
            <ChartContainer title="Energy prices" id="datawrapper-chart-l9meg" src="https://datawrapper.dwcdn.net/rUgc4" meta={[{ label: 'Crude oil', value_name: 'crude_oil_price' }, { label: 'Natural gas', value_name: 'natural_gas' }]} series={seriesEnergy} />
            <div className="close_container"><button type="button" onClick={() => closeAll()}>Hide graphs</button></div>
          </div>
          <div className="tab_content tab_content_finance">
            <ChartContainer title="GDP growth" id="datawrapper-chart-e7bWi" src="https://datawrapper.dwcdn.net/da7lC" meta={[]} series={seriesGDPNowCast} />
            <ChartContainer title="Trade growth" id="datawrapper-chart-bqldf" src="https://datawrapper.dwcdn.net/J1b9d" meta={[]} series={seriesTradeNowcast} />
            <ChartContainer title="Inflation worldwide" id="" src="https://datawrapper.dwcdn.net/p5F7t" meta={[]} series={seriesCPI} />
            <ChartContainer title="Price of shipping" id="datawrapper-chart-TvpL4" src="https://datawrapper.dwcdn.net/lSFyj" meta={[{ label: 'ClarkSea index', value_name: 'clarksea_index' }]} series={seriesClarkson} />
            <ChartContainer title="Emerging markets: Sovereign bond spreads" id="datawrapper-chart-ogUdA" src="https://datawrapper.dwcdn.net/9nc42" meta={[{ label: 'Corporate bond spread', value_name: 'bond_spread_corporate' }, { label: 'Sovereign  bond spread', value_name: 'bond_spread_sovereign' }]} series={seriesBondSpread} />
            <div className="close_container"><button type="button" onClick={() => closeAll()}>Hide graphs</button></div>
          </div>
        </div>
        <noscript>Your browser does not support JavaScript!</noscript>
      </div>
    </div>
  );
}

export default App;
