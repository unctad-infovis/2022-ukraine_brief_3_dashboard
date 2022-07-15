import React, { useState, useEffect } from 'react';
import '../styles/styles.less';

// Load helpers.
// import FormatNr from './helpers/FormatNr.js';
// import RoundNr from './helpers/RoundNr.js';
import DashBoardItem from './DashBoardItem.jsx';

import barrel from '../../assets/img/icons/Ukraine_brief_3-2022-barrel.png';
import bill from '../../assets/img/icons/Ukraine_brief_3-2022-bill.png';
import boat from '../../assets/img/icons/Ukraine_brief_3-2022-boat.png';
import wheat from '../../assets/img/icons/Ukraine_brief_3-2022-wheat.png';

let animated = false;

function App() {
  // Data states.
  // const [data, setData] = useState(false);

  const [start_0, setStart_0] = useState(true);
  const [start_1, setStart_1] = useState(false);
  const [start_2, setStart_2] = useState(false);
  const [start_3, setStart_3] = useState(false);

  const series_1 = Array.from({ length: 60 }, () => Math.random() * 60);
  const series_2 = Array.from({ length: 60 }, () => Math.random() * 60);
  const series_3 = Array.from({ length: 60 }, () => Math.random() * 60);
  const series_4 = Array.from({ length: 60 }, () => Math.random() * 60);
  // eslint-disable-next-line
  const [value_1, setValue_1] = useState(Math.floor(((series_1[series_1.length - 1] - series_1[0]) / series_1[0]) * 100));
  // eslint-disable-next-line
  const [value_2, setValue_2] = useState(Math.floor(((series_2[series_2.length - 1] - series_2[0]) / series_2[0]) * 100));
  // eslint-disable-next-line
  const [value_3, setValue_3] = useState(Math.floor(((series_3[series_3.length - 1] - series_3[0]) / series_3[0]) * 100));
  // eslint-disable-next-line
  const [value_4, setValue_4] = useState(Math.floor(((series_4[series_4.length - 1] - series_4[0]) / series_4[0]) * 100));

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

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    // const data_file = (window.location.href.includes('unctad.org')) ? '/sites/default/files/data-file/2022-2022-ukraine_brief_3_dashboard.json' : './assets/data/data.json';
    try {
      // fetch(data_file)
      //   .then(response => response.text())
      //   .then(body => setData(JSON.parse(body)));
    } catch (error) {
      console.error(error);
    }

    setStart_0(true);
    makeVisible(0);
    if (animated === false) {
      setTimeout(() => {
        animated = true;
        const item_count = document.querySelectorAll('.dashboard_item').length;
        let i = 1;
        const interval = setInterval(() => {
          if (i >= (item_count - 1)) {
            clearInterval(interval);
          }
          makeVisible(i);
          i++;
        }, 1500);
      }, 300);
    }
  }, []);

  return (
    <div className="app">
      <h1>A pulse of the global crisis</h1>
      <div className="dashboard_items">
        <DashBoardItem desc="Higher value means higher prices of food in supermarkets" idx="0" image={wheat} meta="Since Jan 2020" start={start_0} series={series_1} title="FAO Food Index" unit="%" value={value_1} />
        <DashBoardItem desc="Higher value means less governmental independence" idx="1" image={bill} meta="Since Jan 2020" start={start_1} series={series_2} title="Bond Spread Sovereign" unit="%" value={value_2} />
        <DashBoardItem desc="Higher value means higher prices of imported goods" idx="2" image={boat} meta="Since Jan 2020" start={start_2} series={series_3} title="Clarksea Index" unit="%" value={value_3} />
        <DashBoardItem desc="Higher value means higher gasoline prices" idx="3" image={barrel} meta="Since Jan 2020" start={start_3} series={series_4} title="Crude Oil Price" unit="%" value={value_4} />
      </div>
      <div className="button_container">
        <a href="#more">See more</a>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default App;
