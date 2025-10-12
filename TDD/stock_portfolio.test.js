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
  });
});
