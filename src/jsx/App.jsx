import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.less';

// Load helpers.
// import FormatNr from './helpers/FormatNr.js';
// import RoundNr from './helpers/RoundNr.js';
import DashBoardItem from './helpers/DashBoardItem.jsx';

import barrel from '../../assets/img/icons/Ukraine_brief_3-2022-barrel.png';
import bill from '../../assets/img/icons/Ukraine_brief_3-2022-bill.png';
import boat from '../../assets/img/icons/Ukraine_brief_3-2022-boat.png';
import wheat from '../../assets/img/icons/Ukraine_brief_3-2022-wheat.png';

function App() {
  // Data states.
  const [data, setData] = useState(false);

  useEffect(() => {
    const data_file = (window.location.href.includes('unctad.org')) ? '/sites/default/files/data-file/2022-2022-ukraine_brief_3_dashboard.json' : './assets/data/data.json';
    try {
      fetch(data_file)
        .then(response => response.text())
        .then(body => setData(JSON.parse(body)));
    } catch (error) {
      console.error(error);
    }
  }, []);

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
    }, 1000);
  };

  useEffect(() => {
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
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="app">
      <h1>Pulse of the global crisis</h1>
      <div className="dashboard_items">
        <DashBoardItem desc="Higher value means higher prices of food" idx="0" image={wheat} meta={meta_0} start={start_0} series={series_0.current} title="FAO Food Index" unit="%" value={value_0} />
        <DashBoardItem desc="Higher value lead to less governmental independence" idx="1" image={bill} meta={meta_1} start={start_1} series={series_1.current} title="Emerging Market Sovereign Bond Spread" unit="%" value={value_1} />
        <DashBoardItem desc="Higher transportation costs lead to higher prices of goods" idx="2" image={boat} meta={meta_2} start={start_2} series={series_2.current} title="Clarksea Index" unit="%" value={value_2} />
        <DashBoardItem desc="Higher oil prices lead to higher prices at the gas station" idx="3" image={barrel} meta={meta_3} start={start_3} series={series_3.current} title="Crude Oil Price" unit="%" value={value_3} />
      </div>
      <div className="button_container">
        <a href="#more">See more</a>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default App;
