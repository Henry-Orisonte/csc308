class Portfolio {
  constructor() {
    this.stocks = {};
  }

applyPurchase(symbol,shares){
    if (this.stocks[symbol]){
        this.stocks[symbol] += shares;
    }
    else{
        this.stocks[symbol] = shares;
    }
}

applySale(symbol,shares){
    if(this.stocks[symbol]){
        this.stocks[symbol] -= shares;
    }else{
        this.stocks[symbol] = shares
    }
}
  isEmpty() {
    return Object.keys(this.stocks).length === 0;
  }
}

module.exports = {Portfolio};