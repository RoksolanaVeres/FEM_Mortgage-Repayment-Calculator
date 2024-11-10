import { initialCalculatorDataType } from "../types/calculatorTypes";

export function calculateMortgage(data: initialCalculatorDataType) {
  const { mortgageAmount, mortgageTerm, interestRate, mortgageType } = data;

  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = mortgageTerm * 12;
  let monthlyRepayment: number;
  let totalRepayment: number;

  if (mortgageType === "repayment") {
    monthlyRepayment =
      (mortgageAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments))) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    totalRepayment = monthlyRepayment * totalPayments;
  } else if (mortgageType === "interestOnly") {
    monthlyRepayment = mortgageAmount * monthlyInterestRate;
    totalRepayment = monthlyRepayment * totalPayments;
  } else {
    throw new Error("Invalid mortgage type");
  }

  return {
    monthlyRepayment: +monthlyRepayment.toFixed(2),
    totalRepayment: +totalRepayment.toFixed(2),
  };
}
