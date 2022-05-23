const decreaseKeyValue = (arrToDecrease) => {
  let newArr = [];
  let iteration = 0;
  arrToDecrease.forEach((element) => {
    iteration++;
    console.log(element);
    element.value = iteration;
    newArr.push(element);
  });
  return newArr;
};

export default decreaseKeyValue;
