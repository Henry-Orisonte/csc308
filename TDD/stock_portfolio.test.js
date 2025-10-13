const { Portfolio } = require("./Stock_portfolio");

describe("My Portfolio", () => {
  test("Portfolio is created empty", () => {
    const portfolio = new Portfolio();

    expect(portfolio.isEmpty()).toBe(true);
  });

  test("Portfolio shall answer whether it is empty", () => {
    const portfolio = new Portfolio();

    expect(portfolio.isEmpty()).toBe(true);
    portfolio.stocks["APPL"] = 10;
    expect(portfolio.isEmpty()).toBe(false);
  });

  test("Make a purchase", () => {
    const portfolio = new Portfolio();

    expect(portfolio.isEmpty()).toBe(true);

    const symbol = "NVIDIA";
    const shares = 10;

    result = portfolio.applyPurchase(symbol, shares);
    expect(portfolio.isEmpty()).toBe(false);
    expect(portfolio.stocks[symbol]).toBe(10);
  });

  test("Make a sale", () => {
    const portfolio = new Portfolio();

    expect(portfolio.isEmpty()).toBe(true);

    const symbol = "NVIDIA";
    portfolio.applyPurchase(symbol, 10);

    result = portfolio.applySale(symbol, 5);
    expect(portfolio.isEmpty()).toBe(false);
    expect(portfolio.stocks[symbol]).toBe(5);
  });

  test("Answer the amount of unqiue ticker symbols", () => {
    const portfolio = new Portfolio();

    expect(portfolio.isEmpty()).toBe(true);

    portfolio.applyPurchase("GMR", 10);
    portfolio.applyPurchase("NVIDIA", 5);

    result = portfolio.uniqueTicker();

    expect(portfolio.isEmpty()).toBe(false);
    expect(result).toBe(2);
  });

  test("Portfolio should keep only owned symbols",() => {
    const portfolio = new Portfolio();

    expect(portfolio.isEmpty()).toBe(true)

    portfolio.applyPurchase("GMR",10);
    portfolio.applyPurchase("APPL",5);

    portfolio.applySale("APPL",5);

    portfolio.ownedSymbols();

    expect(portfolio.isEmpty()).toBe(false);
    expect(portfolio.stocks).toEqual({"GMR":10});
  })

  test("Check how many shares exist for a given symbol", () =>{
    const portfolio = new Portfolio();

    portfolio.applyPurchase("AAPL", 10);

    const result = portfolio.totalShares("AAPL");
    expect(result).toBe(10);

    const result2 = portfolio.totalShares("NVIDIA");
    expect(result2).toBe(0);
  })

});
