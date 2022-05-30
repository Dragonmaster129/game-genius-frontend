const data = {
  player: 3,
  profession: "Doctor",
  auditor: "Sam",
  savings: 400,
  assets: {
    salary: 13200,
    dividends: [{ name: "2Big", value: 30, key: 1 }],
    realestate: [
      {
        type: "3/2",
        name: "3/2 HOUSE",
        cost: 55000,
        mortgage: 50000,
        downpay: 5000,
        value: 200,
        key: 1,
      },
      {
        type: "3/2",
        name: "3/2 HOUSE",
        cost: 55000,
        mortgage: 48000,
        downpay: 7000,
        value: 400,
        key: 2,
      },
    ],
    land: [
      {
        size: 20,
        cost: 30000,
        mortgage: 15000,
        downpay: 15000,
        cashFlow: -150,
        key: 1,
      },
    ],
    passive: 0,
    stock: [{ name: "OK4U", amount: 1000, costPerShare: 1, key: 1 }],
  },
  expenses: {
    taxes: 3420,
    mortgage: { monthly: 1900, totalCost: 202000 },
    school: { monthly: 750, totalCost: 150000 },
    car: { monthly: 380, totalCost: 19000 },
    creditCard: { monthly: 270, totalCost: 9000 },
    retail: { monthly: 50, totalCost: 1000 },
    other: 2880,
    child: {
      count: 0,
      costPer: 640,
    },
    loan: 1000,
  },
};

export default data;
