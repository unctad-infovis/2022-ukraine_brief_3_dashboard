import React from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/react-countup
// import CountUp from 'react-countup';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import IsVisible from 'react-is-visible';

import LineChart from './LineChart.jsx';

function DashBoardItem({
  appID, idx, image, series, series_value_name, title, unit
}) {
  // const easingFn = (t, b, c, d) => {
  //   const ts = (t /= d) * t;
  //   const tc = ts * t;
  //   return b + c * (tc + -3 * ts + 3 * t);
  // };
  let date = '';
  let meta = '';
  let value = '';

  if (series && series.length > 0) {
    date = new Date(series[0].date);
    meta = (`${date.toLocaleString('en-EN', { month: 'long' })} ${date.getFullYear()}`);
    value = (Math.floor(((series[series.length - 1][series_value_name] - series[0][series_value_name]) / series[0][series_value_name]) * 100));
  }

  return (
    <div className={`dashboard_item dashboard_item_${idx}`}>
      <div className="dashboard_circle">
        <div className="dashboard_item_image"><img src={image} alt="" /></div>
        <div className="dashboard_item_value mobile">
          <span className="value">
            {(value > 0) ? `+${value}` : value}
          </span>
          <span className="unit">{unit}</span>
        </div>
        <IsVisible once>
          {(isVisible) => (
            <div className="dashboard_item_series">{(series.length > 0 && isVisible) && <LineChart appID={appID} series={series.map(el => el[series_value_name])} idx={idx} />}</div>
          )}
        </IsVisible>
        <div className="dashboard_item_value desktop">
          <span className="value">
            {(value > 0) ? `+${value}` : value}
          </span>
          <span className="unit">{unit}</span>
        </div>
      </div>
      <div className="dashboard_item_title">{title}</div>
      <div className="dashboard_item_meta">
        {`Since ${meta}`}
      </div>
    </div>
  );
}

DashBoardItem.propTypes = {
  appID: PropTypes.string.isRequired,
  idx: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  series: PropTypes.instanceOf(Array).isRequired,
  series_value_name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired
};

DashBoardItem.defaultProps = {
};

export default DashBoardItem;
