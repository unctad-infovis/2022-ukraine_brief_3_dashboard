import React, { /* useState, */ useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// https://d3js.org/
import * as d3 from 'd3';

function LineChart({ idx, series }) {
  const chartRef = useRef(null);

  const xScale = d3.scaleLinear()
    .range([0, 160])
    .domain([0, 60]);
  const yScale = d3.scaleLinear()
    .range([30, 0])
    .domain([Math.min(...series), Math.max(...series)]);

  let current_idx = 0;
  const updateLineChart = () => {
    current_idx++;
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d));
    d3.select(`.line_${idx}`).attr('d', line(series.slice(0, current_idx)));
  };
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const svg_container = d3.select(chartRef.current)
      .append('svg');

    const line_container = svg_container.append('g')
      .attr('class', 'line_container')
      .attr('transform', 'translate(0, 0)');
    // Add the lines.
    line_container.append('path')
      .attr('class', `line line_${idx}`)
      .data([]);
    const interval = setInterval(() => {
      if (current_idx > series.length) {
        clearInterval(interval);
      }
      updateLineChart();
    }, 45);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard_chart" ref={chartRef} />
  );
}

LineChart.propTypes = {
  idx: PropTypes.string.isRequired,
  series: PropTypes.instanceOf(Array).isRequired
};

LineChart.defaultProps = {
};

export default LineChart;
