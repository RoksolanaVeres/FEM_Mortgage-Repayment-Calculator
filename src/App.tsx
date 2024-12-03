import { FormEvent, useRef, useState } from "react";
import calculatorIcon from "./assets/images/icon-calculator.svg";
import Results from "./components/Results";

import { calculatorDataType } from "./types/calculatorTypes";

export default function App() {
  const [calculatorData, setCalculatorData] = useState<calculatorDataType>({
    mortgageAmount: 0,
    mortgageTerm: 0,
    interestRate: 0,
    mortgageType: "repayment",
  });

  const formRef = useRef<HTMLFormElement>(null);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (formRef.current) {
      const fd = new FormData(formRef.current);

      const mortgageAmount = +(fd.get("mortgage-amount") as string) || 0;
      const mortgageTerm = +(fd.get("mortgage-term") as string) || 0;
      const interestRate = +(fd.get("interest-rate") as string) || 0;
      const mortgageType =
        (fd.get("mortgage-type") as string) === "repayment" ||
        (fd.get("mortgage-type") as string) === "interestOnly"
          ? (fd.get("mortgage-type") as "repayment" | "interestOnly")
          : "repayment";

      if (!mortgageAmount || !mortgageTerm || !interestRate || !mortgageType) {
        return;
      }

      setCalculatorData({
        mortgageAmount,
        mortgageTerm,
        interestRate,
        mortgageType,
      });
    }
  }

  console.log(calculatorData);

  return (
    <div className="main-container">
      <div className="calculator-container--main">
        <div className="calculations-container">
          {/* form */}
          <form action="" className="calculations-form" ref={formRef} onSubmit={handleFormSubmit}>
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
