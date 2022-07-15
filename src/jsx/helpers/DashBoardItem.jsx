import React from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/react-countup
import CountUp from 'react-countup';

import LineChart from './LineChart.jsx';

function DashBoardItem({
  desc, idx, image, meta, series, title, value, start, unit
}) {
  const easingFn = (t, b, c, d) => {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  };

  return (
    <div className={`dashboard_item dashboard_item_${idx}`}>
      <div className="dashboard_circle">
        <div className="dashboard_item_image"><img src={image} alt="" /></div>
        <div className="dashboard_item_series">{start ? <LineChart series={series.map(el => el.value)} idx={idx} /> : null}</div>
        <div className="dashboard_item_value">
          <span className="value">
            {(value > 0) ? '+' : ''}
            {(start) ? <CountUp delay={0} easingFn={easingFn} useEasing end={value} start={0} duration={3} /> : null}
          </span>
          <span className="unit">{unit}</span>
        </div>
      </div>
      <div className="dashboard_item_title">{title}</div>
      <div className="dashboard_item_meta">
        Since&nbsp;
        {meta}
      </div>
      <div className="dashboard_item_desc">{desc}</div>
    </div>
  );
}

DashBoardItem.propTypes = {
  desc: PropTypes.string.isRequired,
  idx: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  meta: PropTypes.string.isRequired,
  series: PropTypes.instanceOf(Array).isRequired,
  start: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

DashBoardItem.defaultProps = {
};

export default DashBoardItem;
