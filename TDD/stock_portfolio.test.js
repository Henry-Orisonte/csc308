const { Portfolio } = require("./Stock_portfolio");

describe("My Portfolio", () => {
  test("Portfolio is created empty", () => {
    const portfolio = new Portfolio();

    expect(portfolio.isEmpty()).toBe(true);
  });
});
