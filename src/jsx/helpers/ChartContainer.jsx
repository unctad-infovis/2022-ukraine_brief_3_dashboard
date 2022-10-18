import React from 'react';
import PropTypes from 'prop-types';

function ChartContainer({
  id, src, meta, series, title
}) {
  if (series && series.length > 0) {
    meta.forEach(el => {
      const date = new Date(series[0].date);
      el.date = (`${date.toLocaleString('en-EN', { month: 'long' })} ${date.getFullYear()}`);
      el.value = (Math.round(((series[series.length - 1][el.value_name] - series[0][el.value_name]) / series[0][el.value_name]) * 100));
    });
  }

  return (
    <div className="chart_container">
      <iframe loading="lazy" title={title} aria-label="Interactive line chart" id={id} data-src={src} src={null} scrolling="no" frameBorder="0" height="auto" />
      <div className="growths_container">
        {series && series.length > 0 && meta.map((el) => (
          !Number.isNaN(el.value)
            && (
            <div key={el.label} className="growth_container">
              <span className="growth_label">{el.label}</span>
              <span className="growth_value">
                {(el.value > 0) ? `+${el.value}%` : `${el.value}%`}
              </span>
              <span className="growth_meta">
                {`Since ${el.date}`}
              </span>
            </div>
            )
        ))}
      </div>
    </div>
  );
}

ChartContainer.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  meta: PropTypes.instanceOf(Array).isRequired,
  series: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string.isRequired
};

ChartContainer.defaultProps = {
};

export default ChartContainer;
