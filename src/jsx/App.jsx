import React, { useState, useEffect } from 'react';
import '../styles/styles.less';

// Load helpers.
// import FormatNr from './helpers/FormatNr.js';
// import RoundNr from './helpers/RoundNr.js';

import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartContainer from './helpers/ChartContainer.jsx';
import DashBoardItem from './helpers/DashBoardItem.jsx';

const analytics = window.gtag || undefined;

function App() {
  // Data states.

  // eslint-disable-next-line
  const [seriesBondSpread, setSeriesBondSpread] = useState([]);
  const [seriesClarkson, setSeriesClarkson] = useState([]);
  const [seriesCPI, setSeriesCPI] = useState([]);
  const [seriesEnergy, setSeriesEnergy] = useState([]);
  const [seriesFaoFoodPriceIndex, setSeriesFaoFoodPriceIndex] = useState([]);
  const [seriesGDPNowCast, setSeriesGDPNowCast] = useState([]);
  const [seriesTradeNowcast, setSeriesTradeNowcast] = useState([]);
  const [seriesWBFertilizerIndex, setSeriesWBFertilizerIndex] = useState([]);
  // const [seriesWPWheatSunflower, setSeriesWPWheatSunflower] = useState([]);
  const [seriesWheatAgriculture, setSeriesWheatAgriculture] = useState([]);

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
          setSeriesGDPNowCast(data);
          break;
        case 'trade_nowcast.csv':
          setSeriesTradeNowcast(data);
          break;
        case 'wheat_agriculture.csv':
          setSeriesWheatAgriculture(data);
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
      'fao_food_price_index.csv', 'gdp_nowcast.csv', 'trade_nowcast.csv', 'wb_fertilizer_index.csv', 'wheat_agriculture.csv'];

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

  const changeTab = (event, tab_class, tab_name) => {
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
      document.querySelector(tab_class).style.opacity = 1;
      document.querySelector(tab_class).style.display = 'flex';
      event.currentTarget.classList.add('selected');
      document.querySelectorAll(`${tab_class} iframe`).forEach(el => {
        el.src = el.getAttribute('data-src');
      });
      if (typeof analytics !== 'undefined') {
        analytics('event', 'Tab Click', {
          event_category: '2022-ukraine_brief_3_dashboard',
          event_label: tab_name,
          transport_type: 'beacon'
        });
      }
    }
  };

  return (
    <div className="app">
      <div className="app_content">
        <h1>Pulse of the global crisis</h1>
        <div className="dashboard_items">
          <DashBoardItem idx="0" image="https://storage.unctad.org/2022-ukraine_brief_3_dashboard/assets/img/icons/Ukraine_brief_3-2022-wheat.png" series={seriesFaoFoodPriceIndex} series_value_name="value" title="Food prices" unit="%" />
          <DashBoardItem idx="1" image="https://storage.unctad.org/2022-ukraine_brief_3_dashboard/assets/img/icons/Ukraine_brief_3-2022-barrel.png" series={seriesEnergy} series_value_name="crude_oil_price" title="Crude Oil Price" unit="%" />
          <DashBoardItem idx="2" image="https://storage.unctad.org/2022-ukraine_brief_3_dashboard/assets/img/icons/Ukraine_brief_3-2022-boat.png" series={seriesClarkson} series_value_name="clarksea_index" title="Shipping prices" unit="%" />
          <DashBoardItem idx="3" image="https://storage.unctad.org/2022-ukraine_brief_3_dashboard/assets/img/icons/Ukraine_brief_3-2022-bill.png" series={seriesBondSpread} series_value_name="bond_spread_sovereign" title="Emerging markets: Sovereign bond spread" unit="%" />
        </div>
        <h1>Select a category to dive deeper</h1>
        <div className="tabs_container">
          <div className="tab_container tab_container">
            <button type="button" className="tab_button button_food" onClick={(event) => changeTab(event, '.tab_content_food', 'Food')}>
              <span className="label label_food">Food</span>
            </button>
          </div>
          <div className="tab_container">
            <button type="button" className="tab_button button_energy" onClick={(event) => changeTab(event, '.tab_content_energy', 'Energy')}>
              <span className="label label_energy">Energy</span>
            </button>
          </div>
          <div className="tab_container">
            <button type="button" className="tab_button button_finance" onClick={(event) => changeTab(event, '.tab_content_finance', 'Finance')}>
              <span className="label label_finance">Finance</span>
            </button>
          </div>
        </div>
        <div className="tabs_content">
          <div className="tab_content tab_content_food">
            <ChartContainer title="Food prices" id="datawrapper-chart-BgxYA" src="https://datawrapper.dwcdn.net/BgxYA" meta={[{ label: 'FAO Food Price Index', value_name: 'value' }]} series={seriesFaoFoodPriceIndex} />
            <ChartContainer title="Selected commodity prices" id="datawrapper-chart-13PzO" src="https://datawrapper.dwcdn.net/13PzO" meta={[{ label: 'Agriculture Index', value_name: 'agriculture_index' }, { label: 'Wheat', value_name: 'marketwatch_wheat' }]} series={seriesWheatAgriculture} />
            <ChartContainer title="Fertilizer Price" id="datawrapper-chart-Yb3xC" src="https://datawrapper.dwcdn.net/Yb3xC" meta={[{ label: 'Fertilizer price', value_name: 'value' }]} series={seriesWBFertilizerIndex} />
            <div className="close_container"><button type="button" onClick={() => closeAll()}>Hide graphs</button></div>
          </div>
          <div className="tab_content tab_content_energy">
            <ChartContainer title="Energy prices" id="datawrapper-chart-CZzPc" src="https://datawrapper.dwcdn.net/CZzPc" meta={[{ label: 'Crude oil', value_name: 'crude_oil_price' }, { label: 'Natural gas', value_name: 'natural_gas' }]} series={seriesEnergy} />
            <div className="close_container"><button type="button" onClick={() => closeAll()}>Hide graphs</button></div>
          </div>
          <div className="tab_content tab_content_finance">
            <ChartContainer title="GDP growth" id="datawrapper-chart-toxoa" src="https://datawrapper.dwcdn.net/toxoa" meta={[]} series={seriesGDPNowCast} />
            <ChartContainer title="Trade growth" id="datawrapper-chart-nkjeA" src="https://datawrapper.dwcdn.net/nkjeA" meta={[]} series={seriesTradeNowcast} />
            <ChartContainer title="Inflation worldwide" id="datawrapper-chart-foPfw" src="https://datawrapper.dwcdn.net/foPfw" meta={[]} series={seriesCPI} />
            <ChartContainer title="Price of shipping" id="datawrapper-chart-WRywH" src="https://datawrapper.dwcdn.net/WRywH" meta={[{ label: 'ClarkSea index', value_name: 'clarksea_index' }]} series={seriesClarkson} />
            <ChartContainer title="Emerging markets: Sovereign bond spreads" id="datawrapper-chart-7TCLt" src="https://datawrapper.dwcdn.net/7TCLt" meta={[{ label: 'Corporate bond spread', value_name: 'bond_spread_corporate' }, { label: 'Sovereign  bond spread', value_name: 'bond_spread_sovereign' }]} series={seriesBondSpread} />
            <div className="close_container"><button type="button" onClick={() => closeAll()}>Hide graphs</button></div>
          </div>
        </div>
        <noscript>Your browser does not support JavaScript!</noscript>
      </div>
    </div>
  );
}

export default App;
