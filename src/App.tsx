import { useState } from "react";
import calculatorIcon from "./assets/images/icon-calculator.svg";
import Results from "./components/Results";

import { initialCalculatorDataType } from "./types/calculatorTypes";

const initialCalculatorData: initialCalculatorDataType = {
  mortgageAmount: 300000,
  mortgageTerm: 25,
  interestRate: 5.25,
  mortgageType: "repayment",
};

export default function App() {
  const [calculatorData, setCalculatorData] = useState(initialCalculatorData);
  return (
    <div className="main-container">
      <div className="calculator-container--main">
        <div className="calculations-container">
          <form action="" className="calculations-form">
            <div className="calculations-header">
              <h1 className="calculations-heading">Mortgage Calculator</h1>
              <input type="reset" value="Clear All" className="btn reset" />
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
                    className="control-input"
                  />
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
                      className="control-input"
                    />
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
                      className="control-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-control-wrapper">
                <h2 className="control-label">Mortgage Type</h2>

                <div className="radio-control-wrapper">
                  <input type="radio" id="repayment" name="mortgage-type" value="repayment" />
                  <label htmlFor="repayment">Repayment</label>
                </div>

                <div className="radio-control-wrapper">
                  <input type="radio" id="interest" name="mortgage-type" value="interest" />
                  <label htmlFor="interest">Interest Only</label>
                </div>
              </div>
            </div>
            <button className="calculate-btn btn">
              <img src={calculatorIcon} alt="" />
              Calculate Repayments
            </button>
          </form>
        </div>
        <Results data={calculatorData} />
      </div>
    </div>
  );
}
