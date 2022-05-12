const payday = (setcash, cash, cashflow, onChange) => {
  onChange("NONE");
  setcash(cash + cashflow);
};

export default payday;
