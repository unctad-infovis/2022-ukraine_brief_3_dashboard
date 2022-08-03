import React from 'react';
import PropTypes from 'prop-types';

import DashBoardItem from './DashBoardItem.jsx';

function DashBoard({
  appID, seriesFaoFoodPriceIndex, seriesEnergy, seriesClarkson, seriesBondSpread
}) {
  return (
    <div className="dashboard_items">
      <DashBoardItem idx="0" image="https://storage.unctad.org/2022-ukraine_brief_3_dashboard/assets/img/icons/Ukraine_brief_3-2022-wheat.png" series={seriesFaoFoodPriceIndex} series_value_name="value" title="Food prices" unit="%" appID={appID} />
      <DashBoardItem idx="1" image="https://storage.unctad.org/2022-ukraine_brief_3_dashboard/assets/img/icons/Ukraine_brief_3-2022-barrel.png" series={seriesEnergy} series_value_name="crude_oil_price" title="Crude Oil Price" unit="%" appID={appID} />
      <DashBoardItem idx="2" image="https://storage.unctad.org/2022-ukraine_brief_3_dashboard/assets/img/icons/Ukraine_brief_3-2022-boat.png" series={seriesClarkson} series_value_name="clarksea_index" title="Shipping prices" unit="%" appID={appID} />
      <DashBoardItem idx="3" image="https://storage.unctad.org/2022-ukraine_brief_3_dashboard/assets/img/icons/Ukraine_brief_3-2022-bill.png" series={seriesBondSpread} series_value_name="bond_spread_sovereign" title="Emerging markets: Sovereign bond spread" unit="%" appID={appID} />
    </div>
  );
}

DashBoard.propTypes = {
  appID: PropTypes.string.isRequired,
  seriesFaoFoodPriceIndex: PropTypes.instanceOf(Array).isRequired,
  seriesEnergy: PropTypes.instanceOf(Array).isRequired,
  seriesClarkson: PropTypes.instanceOf(Array).isRequired,
  seriesBondSpread: PropTypes.instanceOf(Array).isRequired
};

DashBoard.defaultProps = {
};

export default DashBoard;
