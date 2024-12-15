import { FormEvent, useRef, useState } from "react";
import calculatorIcon from "./assets/images/icon-calculator.svg";
import Results from "./components/Results";
import FormInput from "./components/FormInput";

import { calculatorDataType, ErrorFieldsType } from "./types/calculatorTypes";

const initialCalculatorData: calculatorDataType = {
  mortgageAmount: 0,
  mortgageTerm: 0,
  interestRate: 0,
  mortgageType: "repayment",
};

export default function App() {
  const [calculatorData, setCalculatorData] = useState<calculatorDataType>(initialCalculatorData);

  const [errorFields, setErrorFields] = useState<ErrorFieldsType>({});
  const { mortgageAmountError, mortgageTermError, interestRateError, mortgageTypeError } =
    errorFields;

  const formRef = useRef<HTMLFormElement>(null);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (formRef.current) {
      const fd = new FormData(formRef.current);

      const rawMortgageAmount = fd.get("mortgage-amount") as string;
      const rawMortgageTerm = fd.get("mortgage-term") as string;
      const rawInterestRate = fd.get("interest-rate") as string;
      const rawMortgageType = fd.get("mortgage-type") as string;

      const mortgageAmount = Number(rawMortgageAmount);
      const mortgageTerm = Number(rawMortgageTerm);
      const interestRate = Number(rawInterestRate);
      const mortgageType = rawMortgageType === "repayment" ? "repayment" : "interestOnly";

      // Initialize error state
      let hasErrors = false;

      const errors: ErrorFieldsType = {};

      // Validate individual fields
      if (!rawMortgageAmount || Number.isNaN(mortgageAmount) || mortgageAmount <= 0) {
        errors.mortgageAmountError = "Please provide a valid mortgage amount.";
        hasErrors = true;
      }

      if (!rawMortgageTerm || Number.isNaN(mortgageTerm) || mortgageTerm <= 0) {
        errors.mortgageTermError = "Please provide a valid mortgage term.";
        hasErrors = true;
      }

      if (!rawInterestRate || Number.isNaN(interestRate) || interestRate <= 0) {
        errors.interestRateError = "Please provide a valid interest rate.";
        hasErrors = true;
      }

      if (!mortgageType) {
        errors.mortgageTypeError = "Please select a valid mortgage type.";
        hasErrors = true;
      }

      // If errors exist, set error state and stop submission
      if (hasErrors) {
        setErrorFields(errors);
        return;
      }

      // Clear errors if submission succeeds
      setErrorFields({});

      // Update state with valid data
      setCalculatorData({
        mortgageAmount,
        mortgageTerm,
        interestRate,
        mortgageType,
      });
    }
  }

  function handleClearForm() {
    setErrorFields({});
    setCalculatorData(initialCalculatorData);
  }

  console.log(calculatorData);
  console.log(errorFields);

  return (
    <div className="main-container">
      <div className="calculator-container--main">
        <div className="calculations-container">
          {/* form */}
          <form action="" className="calculations-form" ref={formRef} onSubmit={handleFormSubmit}>
            <div className="calculations-header">
              <h1 className="calculations-heading">Mortgage Calculator</h1>
              <button type="reset" className="btn reset" onClick={handleClearForm}>
                Clear All
              </button>
            </div>

            <div className="form-controls-container">
              <FormInput
                type="number"
                name="mortgage-amount"
                id="mortgage-amount"
                error={mortgageAmountError}
                label="Mortgage Amount"
                unit="£"
                unitLeft
              />

              <div className="term-rate-container">
                <FormInput
                  type="number"
                  name="mortgage-term"
                  error={mortgageTermError}
                  label="Mortgage Term"
                  id="mortgage-term"
                  unit="years"
                />

                <FormInput
                  type="number"
                  name="interest-rate"
                  error={interestRateError}
                  label="Interest Rate"
                  id="interest-rate"
                  unit="%"
                />
              </div>
              <div className="form-control-wrapper">
                <h2 className="control-label">Mortgage Type</h2>

                <FormInput
                  type="radio"
                  name="mortgage-type"
                  value="repayment"
                  label="Repayment"
                  defaultChecked
                />
                <FormInput
                  type="radio"
                  name="mortgage-type"
                  value="interestOnly"
                  label="Interest Only"
                />

                {mortgageTypeError && <p className="error-text">{mortgageTypeError}</p>}
              </div>
            </div>
            <button className="calculate-btn btn">
              <img src={calculatorIcon} alt="" />
              Calculate Repayments
            </button>
          </form>
        </div>
        <Results data={calculatorData} errorFields={errorFields} />
      </div>
    </div>
  );
}
