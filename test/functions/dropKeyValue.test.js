import decreaseKeyValue from "../../src/functions/dropKeyValue";

let arr = [
  { name: "OK4U", costPerShare: 10, amount: 1000, key: 1 },
  { name: "OK4U", costPerShare: 10, amount: 1000, key: 2 },
  { name: "OK4U", costPerShare: 10, amount: 1000, key: 3 },
  { name: "OK4U", costPerShare: 10, amount: 1000, key: 4 },
];

let endArr = [
  { name: "OK4U", costPerShare: 10, amount: 1000, key: 1 },
  { name: "OK4U", costPerShare: 10, amount: 1000, key: 2 },
  { name: "OK4U", costPerShare: 10, amount: 1000, key: 3 },
];

test("drops the value of the array when removing the middle value", () => {
  arr.splice(2, 1);
  let newArr = decreaseKeyValue(arr);
  expect(newArr).toEqual(endArr);
});
