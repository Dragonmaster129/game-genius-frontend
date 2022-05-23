import decreaseKeyValue from "../../src/functions/dropKeyValue";

let arr = [
  { name: "OK4U", costPerShare: 10, amount: 1000, value: 1 },
  { name: "OK4U", costPerShare: 10, amount: 1000, value: 2 },
  { name: "OK4U", costPerShare: 10, amount: 1000, value: 3 },
  { name: "OK4U", costPerShare: 10, amount: 1000, value: 4 },
];

let endArr = [
  { name: "OK4U", costPerShare: 10, amount: 1000, value: 1 },
  { name: "OK4U", costPerShare: 10, amount: 1000, value: 2 },
  { name: "OK4U", costPerShare: 10, amount: 1000, value: 3 },
];

test("drops the value of the array when removing the middle value", () => {
  arr.splice(2, 1);
  let newArr = decreaseKeyValue(arr);
  expect(newArr).toEqual(endArr);
});
