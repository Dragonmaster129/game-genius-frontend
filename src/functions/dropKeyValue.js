const decreaseKeyValue = (arrToDecrease) => {
  let newArr = [];
  let iteration = 0;
  arrToDecrease.forEach((element) => {
    iteration++;
    element.key = iteration;
    newArr.push(element);
  });
  return newArr;
};

export default decreaseKeyValue;
