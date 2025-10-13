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
    }
    else{
        this.stocks[symbol] = shares;
    }
}

uniqueTicker(){
    count_ticker = 0;
    for (const stck in this.stocks){
        count_ticker++;
    }
    return count_ticker;
}
ownedSymbols(){
    for (const symbol in this.stocks){
        if(this.stocks[symbol] == 0){
            delete this.stocks[symbol];
    }
}
}

totalShares(symbol){
    if(this.stocks[symbol]){
        return this.stocks[symbol]
    }else{
        return 0;
    }
}
  isEmpty() {
    return Object.keys(this.stocks).length === 0;
  }
}

module.exports = {Portfolio};