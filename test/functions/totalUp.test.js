import totalUp from "../../src/functions/totalUp";

test("adds the obj", () => {
  let obj = {
    first: 100,
    second: 300,
    third: 200,
  };
  expect(totalUp(obj)).toEqual(600);
});

test("adds the obj with an array inside", () => {
  let obj2 = {
    first: [100, 200, 300, 500, 400],
    second: 400,
    third: 200,
  };
  expect(totalUp(obj2)).toEqual(2100);
});

test("adds the obj with an obj inside", () => {
  let obj3 = {
    first: {
      One: 100,
      Two: 200,
      Three: 300,
    },
    second: 400,
    third: 500,
  };
  expect(totalUp(obj3)).toEqual(1500);
});

test("adds the obj with both an array and obj inside", () => {
  let obj4 = {
    first: {
      One: 100,
      Two: 300,
      Three: 200,
    },
    second: [100, 300, 500, 400, 200],
    third: 400,
  };
  expect(totalUp(obj4)).toEqual(2500);
});
