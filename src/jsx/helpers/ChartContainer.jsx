import React from 'react';
import PropTypes from 'prop-types';

function ChartContainer({
  title, id, src, growth
}) {
  return (
    <div className="chart_container">
      <iframe loading="lazy" title={title} aria-label="Interactive line chart" id={id} data-src={src} src={null} scrolling="no" frameBorder="0" height="400" />
      <div className="growths_container">
        {growth && growth.map(el => (
          <div key={el.label} className="growth_container">
            <span className="growth_label">{el.label}</span>
            <span className="growth_value">{el.value}</span>
            <span className="growth_meta">{el.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

ChartContainer.propTypes = {
  growth: PropTypes.instanceOf(Array).isRequired,
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

ChartContainer.defaultProps = {
};

export default ChartContainer;
