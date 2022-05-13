import payday from "../../src/functions/payday";

let cash = 3950;
let cashflow = 3550;
let onChange = (prop) => {};
let setcash = (num) => {
  cash = num;
};

test("cash gets incremented by cashflow", () => {
  payday(setcash, cash, cashflow, onChange);
  expect(cash).toEqual(7500);
});
