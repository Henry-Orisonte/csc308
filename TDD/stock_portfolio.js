class Portfolio {
  constructor() {
    this.stocks = {};
  }

  isEmpty() {
    return Object.keys(this.stocks).length === 0;
  }
}

module.exports = {Portfolio};