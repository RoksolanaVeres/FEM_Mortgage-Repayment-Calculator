import { FormEvent, useRef, useState } from "react";
import calculatorIcon from "./assets/images/icon-calculator.svg";
import Results from "./components/Results";

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
              <div className="form-control-wrapper">
                <label htmlFor="mortgage-amount" className="control-label">
                  Mortgage Amount
                </label>
                <div className="control-input-icon-container">
                  <div className="control-icon control-icon--left">£</div>
                  <input
                    type="number"
                    id="mortgage-amount"
                    name="mortgage-amount"
                    className={`control-input control-input--left ${
                      mortgageAmountError ? "input--error" : "input--valid"
                    }`}
                  />
                  {mortgageAmountError && <p className="error-text">{mortgageAmountError}</p>}
                </div>
              </div>

              <div className="term-rate-container">
                <div className="form-control-wrapper">
                  <label htmlFor="mortgage-term" className="control-label">
                    Mortgage Term
                  </label>
                  <div className="control-input-icon-container">
                    <div className="control-icon control-icon--right">years</div>
                    <input
                      type="number"
                      id="mortgage-term"
                      name="mortgage-term"
                      className={`control-input control-input--right ${
                        mortgageTermError ? "input--error" : "input--valid"
                      }`}
                    />
                    {mortgageTermError && <p className="error-text">{mortgageTermError}</p>}
                  </div>
                </div>

                <div className="form-control-wrapper">
                  <label htmlFor="interest-rate" className="control-label">
                    Interest Rate
                  </label>
                  <div className="control-input-icon-container">
                    <div className="control-icon control-icon--right">%</div>
                    <input
                      type="number"
                      id="interest-rate"
                      name="interest-rate"
                      className={`control-input control-input--right ${
                        interestRateError ? "input--error" : "input--valid"
                      }`}
                    />
                    {interestRateError && <p className="error-text">{interestRateError}</p>}
                  </div>
                </div>
              </div>

              <div className="form-control-wrapper">
                <h2 className="control-label">Mortgage Type</h2>
                <div className="radio-control-wrapper">
                  <input
                    type="radio"
                    id="repayment"
                    name="mortgage-type"
                    value="repayment"
                    defaultChecked
                  />
                  <label htmlFor="repayment">Repayment</label>
                </div>
                <div className="radio-control-wrapper">
                  <input type="radio" id="interest" name="mortgage-type" value="interestOnly" />
                  <label htmlFor="interest">Interest Only</label>
                </div>
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
