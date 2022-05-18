let buyItem = (props, choiceOfItem, addedData, setaddedData) => {
  let cData = props.data;
  let addData = addedData;
  let cash = props.cash;
  if (addData.downpay) {
    cash = cash - addData.downpay;
  }
  props.setcash(cash);
  addData.key = cData.assets[choiceOfItem.toLowerCase()].length + 1;
  setaddedData(addData);
  cData.assets[choiceOfItem.toLowerCase()] = [
    ...cData.assets[choiceOfItem.toLowerCase()],
    addedData,
  ];
  props.submitted("NONE");
};

export default buyItem;
