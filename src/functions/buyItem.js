let buyItem = (props, choiceOfItem, addedData, setaddedData) => {
  let cData = props.data;
  let addData = addedData;
  let cash = props.cash;
  if (addData.downpay) {
    if (cash < addData.downpay) {
      // Loan
    }
    cash = cash - addData.downpay;
  }
  props.setcash(cash);
  addData.key = cData.assets[choiceOfItem.toLowerCase()].length + 1;
  setaddedData(addData);
  cData.assets[choiceOfItem.toLowerCase()].push(addedData);
  props.setdata(cData);
  props.submitted("NONE");
};

export default buyItem;
