const { Portfolio } = require("./Stock_portfolio");

describe("My Portfolio", () => {
  test("Portfolio is created empty", () => {
    const portfolio = new Portfolio();

    expect(portfolio.isEmpty()).toBe(true);
  });

  test("portfolio shall answer whether it is empty", () =>{
    const portfolio = new Portfolio();

    expect(portfolio.isEmpty()).toBe(true)
    portfolio.stocks["NVIDIA"] = 10;
    expect(portfolio.isEmpty()).toBe(false)
  })
});
