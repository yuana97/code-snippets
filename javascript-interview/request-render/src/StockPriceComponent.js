/*

Question:

Alpha Vantage exposes an API endpoint that lets you get the current price of a stock from its
stock symbol. For example the request for MSFT stock

GET https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo

should result in the response

{
  "Global Quote": {
    "01. symbol": "MSFT",
    "02. open": "139.3900",
    "03. high": "140.4200",
    "04. low": "138.6700",
    "05. price": "139.7850",
    "06. volume": "28338704",
    "07. latest trading day": "2019-10-24",
    "08. previous close": "137.2400",
    "09. change": "2.5450",
    "10. change percent": "1.8544%"
  }
}

Write a React component which takes in a stock symbol as props.symbol (for example MSFT) and displays
the current price of that stock. You should handle loading and error states appropriately.

Solution:
query the api and render the data

*/

// react framework. A key idea of react is that what you see on the page should be a pure function
// of a state object
import React, {Component} from 'react';
// HTTP client
import axios from 'axios';

class StockPriceComponent extends Component {
  // set initial state
  constructor() {
    super();
    this.state = {status: 'LOADING'};
  }

  // on mount, request data and set state accordingly
  componentDidMount() {
    const symbol = this.props.symbol;
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`;

    // request the data
    axios
      .get(url)
      // got the data => update state
      .then((res) =>
        this.setState({
          error: null,
          status: 'DONE',
          price: res.data['Global Quote']['05. price'],
        })
      )
      // error => update state
      .catch((err) =>
        this.setState({
          error: err.message,
          status: 'ERROR',
          price: 'N/A',
        })
      );
  }

  // render the component based on state
  render() {
    switch (this.state.status) {
      // error => display error
      case 'ERROR':
        return <h1>Error: {this.state.error}</h1>;
      // done => display price
      case 'DONE':
        return <h1>Price: {this.state.price}</h1>;
      default:
        return <h1>Loading...</h1>;
    }
  }
}

export default StockPriceComponent;
