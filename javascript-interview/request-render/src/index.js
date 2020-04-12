import React from 'react';
import ReactDOM from 'react-dom';
import StockPriceComponent from './StockPriceComponent';

ReactDOM.render(
  <React.StrictMode>
    <StockPriceComponent symbol="MSFT" />
  </React.StrictMode>,
  document.getElementById('root')
);

