import emptyResultImg from "../assets/images/illustration-empty.svg";
import classes from "./Results.module.css";

import { calculateMortgage } from "../utils/calculateMortgage.ts";
import { calculatorDataType, ErrorFieldsType } from "../types/calculatorTypes.ts";

type ResultsProps = {
  data: calculatorDataType;
  errorFields: ErrorFieldsType;
};

export default function Results({ data, errorFields }: ResultsProps) {
  const { monthlyRepayment, totalRepayment } = calculateMortgage(data);

  const formIsValid =
    !Number.isNaN(monthlyRepayment) &&
    !Number.isNaN(totalRepayment) &&
    Object.keys(errorFields).length === 0;

  return formIsValid ? (
    <div className={classes.results_container}>
      <div>
        <h2 className={classes.results_header}>Your results</h2>
        <p className={classes.results_text}>
          Your results are shown below based on the information you provided. To adjust the results,
          edit the form and click "calculate repayments" again.
        </p>
        <div className={classes.results_table}>
          <div className={classes.results_row}>
            <h3 className={classes.results_text}>Your monthly repayments</h3>
            <p className={classes.results_monthly_repayment}>£ {monthlyRepayment}</p>
          </div>
          <div className={classes.results_divider}></div>
          <div className={classes.results_row}>
            <h3 className={classes.results_text}>Total you'll repay over the term</h3>
            <p className={classes.results_total_repayment}>£ {totalRepayment}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <EmptyFormResults />
  );
}

function EmptyFormResults() {
  return (
    <div className={classes.empty_results_container}>
      <div>
        <img src={emptyResultImg} alt="" />
        <h2 className={classes.results_header}>Results shown here</h2>
        <p className={classes.results_text}>
          Complete the form and click "calculate repayments" to see what your monthly repayments
          would be
        </p>
      </div>
    </div>
  );
}
