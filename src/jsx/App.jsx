import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.less';

// Load helpers.
// import FormatNr from './helpers/FormatNr.js';
// import RoundNr from './helpers/RoundNr.js';
import DashBoardItem from './helpers/DashBoardItem.jsx';
import ChartContainer from './helpers/ChartContainer.jsx';

import barrel from '../../assets/img/icons/Ukraine_brief_3-2022-barrel.png';
import bill from '../../assets/img/icons/Ukraine_brief_3-2022-bill.png';
import boat from '../../assets/img/icons/Ukraine_brief_3-2022-boat.png';
import wheat from '../../assets/img/icons/Ukraine_brief_3-2022-wheat.png';

function App() {
  // Data states.

  const [start_0, setStart_0] = useState(false);
  const [start_1, setStart_1] = useState(false);
  const [start_2, setStart_2] = useState(false);
  const [start_3, setStart_3] = useState(false);
  const series_0 = useRef([]);
  const series_1 = useRef([]);
  const series_2 = useRef([]);
  const series_3 = useRef([]);
  const [value_0, setValue_0] = useState(0);
  const [value_1, setValue_1] = useState(0);
  const [value_2, setValue_2] = useState(0);
  const [value_3, setValue_3] = useState(0);
  const [meta_0, setMeta_0] = useState('');
  const [meta_1, setMeta_1] = useState('');
  const [meta_2, setMeta_2] = useState('');
  const [meta_3, setMeta_3] = useState('');

  const makeVisible = (i) => {
    if (i === 1) {
      setStart_1(true);
    } else if (i === 2) {
      setStart_2(true);
    } else if (i === 3) {
      setStart_3(true);
    }
    document.querySelector(`.dashboard_item_${i}`).style.opacity = 1;
    document.querySelector(`.dashboard_item_${i}`).style.visibility = 'visible';
  };

  const startAnimation = () => {
    setTimeout(() => {
      setStart_0(true);
      makeVisible(0);
      const item_count = document.querySelectorAll('.dashboard_item').length;
      let i = 1;
      const interval = setInterval(() => {
        if (i >= (item_count - 1)) {
          clearInterval(interval);
        }
        makeVisible(i);
        i++;
      }, 0);
    }, 0);
  };

  const cleanData = (data) => {
    if (data !== false) {
      let date;
      // FAO food price index.
      series_0.current = data.fao_food_price_index.map(el => ({
        date: el.date,
        value: el.value
      }));
      date = new Date(series_0.current[0].date);
      setMeta_0(`${date.toLocaleString('en-EN', { month: 'short' })} ${date.getFullYear()}`);
      setValue_0(Math.floor(((series_0.current[series_0.current.length - 1].value - series_0.current[0].value) / series_0.current[0].value) * 100));

      // Bond spread.
      series_1.current = data.bond_spread.map(el => ({
        date: el.date,
        value: el.bond_spread_sovereign
      }));
      date = new Date(series_1.current[0].date);
      setMeta_1(`${date.toLocaleString('en-EN', { month: 'short' })} ${date.getFullYear()}`);
      setValue_1(Math.floor(((series_1.current[series_1.current.length - 1].value - series_1.current[0].value) / series_1.current[0].value) * 100));

      // Clarkson.
      series_2.current = data.clarkson.map(el => ({
        date: el.date,
        value: el.clarksea_index
      }));
      date = new Date(series_2.current[0].date);
      setMeta_2(`${date.toLocaleString('en-EN', { month: 'short' })} ${date.getFullYear()}`);
      setValue_2(Math.floor(((series_2.current[series_2.current.length - 1].value - series_2.current[0].value) / series_2.current[0].value) * 100));

      // Crude oil price.
      series_3.current = data.crude_oil_price.map(el => ({
        date: el.date,
        value: el.value
      }));
      date = new Date(series_3.current[0].date);
      setMeta_3(`${date.toLocaleString('en-EN', { month: 'short' })} ${date.getFullYear()}`);
      setValue_3(Math.floor(((series_3.current[series_3.current.length - 1].value - series_3.current[0].value) / series_3.current[0].value) * 100));
    }
    document.querySelector('.app_content').style.opacity = 1;
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    const data_file = (window.location.href.includes('unctad.org')) ? '/sites/default/files/data-file/2022-2022-ukraine_brief_3_dashboard.json' : './assets/data/data.json';
    try {
      fetch(data_file)
        .then(response => response.text())
        .then(body => cleanData(JSON.parse(body)));
    } catch (error) {
      console.error(error);
    }

    // eslint-disable-next-line
    !(function () {
      // eslint-disable-next-line
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
          <DashBoardItem desc="Higher value means higher prices of food" idx="0" image={wheat} meta={meta_0} start={start_0} series={series_0.current} title="Food prices" unit="%" value={value_0} />
          <DashBoardItem desc="Higher value lead to less governmental independence" idx="1" image={bill} meta={meta_1} start={start_1} series={series_1.current} title="Emerging Market Sovereign Bond Spread" unit="%" value={value_1} />
          <DashBoardItem desc="Higher transportation costs lead to higher prices of goods" idx="2" image={boat} meta={meta_2} start={start_2} series={series_2.current} title="Shipping prices" unit="%" value={value_2} />
          <DashBoardItem desc="Higher oil prices lead to higher prices at the gas station" idx="3" image={barrel} meta={meta_3} start={start_3} series={series_3.current} title="Crude Oil Price" unit="%" value={value_3} />
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
            <ChartContainer title="Food prices" id="datawrapper-chart-Q9Axr" src="https://datawrapper.dwcdn.net/Q9Axr/12/" growth={[{ label: 'FAO Food Price Index', value: '+50%', meta: 'Since Jan 2020' }]} />
            <ChartContainer title="Selected Commodity Prices" id="datawrapper-chart-hA5mF" src="https://datawrapper.dwcdn.net/hA5mF/3/" growth={[]} />
            <ChartContainer title="Fertilizer Price" id="datawrapper-chart-TrG3p" src="https://datawrapper.dwcdn.net/TrG3p/4/" growth={[]} />
            <div className="close_container"><button type="button" onClick={() => closeAll()}>Hide graphs</button></div>
          </div>
          <div className="tab_content tab_content_energy">
            <ChartContainer title="Energy prices" id="datawrapper-chart-l9meg" src="https://datawrapper.dwcdn.net/l9meg/6/" growth={[{ label: 'Crude oil', value: '+50%', meta: 'Since Jan 2020' }, { label: 'Natural gas', value: '+50%', meta: 'Since Jan 2020' }]} />
            <div className="close_container"><button type="button" onClick={() => closeAll()}>Hide graphs</button></div>
          </div>
          <div className="tab_content tab_content_finance">
            <ChartContainer title="GDP Nowcast" id="datawrapper-chart-e7bWi" src="https://datawrapper.dwcdn.net/e7bWi/3/" growth={[]} />
            <ChartContainer title="Trade nowcast" id="datawrapper-chart-bqldf" src="https://datawrapper.dwcdn.net/bqldf/4/" growth={[]} />
            <ChartContainer title="Inflation across the globe" id="" src="https://datawrapper.dwcdn.net/UoC7z/5/" growth={[]} />
            <ChartContainer title="Price of shipping" id="datawrapper-chart-TvpL4" src="https://datawrapper.dwcdn.net/TvpL4/5/" growth={[]} />
            <ChartContainer title="Emerging markets bond spreads" id="datawrapper-chart-ogUdA" src="https://datawrapper.dwcdn.net/ogUdA/3/" growth={[]} />
            <div className="close_container"><button type="button" onClick={() => closeAll()}>Hide graphs</button></div>
          </div>
        </div>
        <noscript>Your browser does not support JavaScript!</noscript>
      </div>
    </div>
  );
}

export default App;
