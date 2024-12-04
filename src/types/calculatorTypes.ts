export type calculatorDataType = {
  mortgageAmount: number;
  mortgageTerm: number;
  interestRate: number;
  mortgageType: "repayment" | "interestOnly";
};

export type ErrorFieldsType = {
  mortgageAmountError?: string;
  mortgageTermError?: string;
  interestRateError?: string;
  mortgageTypeError?: string;
};
