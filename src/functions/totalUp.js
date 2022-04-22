const totalUp = (objToTotal) => {
  let total = 0;
  if (Object.prototype.toString.call(objToTotal) === "[object Object]") {
    for (const key in objToTotal) {
      let element = objToTotal[key];
      if (key != "passive" && key != "loan") {
        if (Array.isArray(element)) {
          for (let index = 0; index < element.length; index++) {
            const item = element[index];
            if (item.value) {
              total = total + item.value;
            }
          }
        } else if (
          Object.prototype.toString.call(element) === "[object Object]"
        ) {
          if (element.monthly) {
            total = total + element.monthly;
          } else {
            total = total + element.count * element.costPer;
          }
        } else {
          total = total + element;
        }
      } else if (key == "loan") {
        total = total + element / 10;
      }
    }
  } else if (Array.isArray(objToTotal)) {
    for (let index = 0; index < objToTotal.length; index++) {
      const element = objToTotal[index];
      total = total + element.value;
    }
  }

  return total;
};

export default totalUp;
