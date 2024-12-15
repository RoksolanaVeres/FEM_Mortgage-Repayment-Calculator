type Props = {
  error: string | undefined;
  label: string;
  id: string;
  unit: string;
  unitLeft?: boolean;
};

export default function FormInput({ error, label, id, unit, unitLeft }: Props) {
  return (
    <div className="form-control-wrapper">
      <label htmlFor={id} className="control-label">
        {label}
      </label>
      <div className="control-input-icon-container">
        <div className={`control-icon ${unitLeft ? "control-icon--left" : "control-icon--right"} `}>
          {unit}
        </div>
        <input
          type="number"
          id={id}
          name={id}
          className={`control-input ${unitLeft ? "control-input--left" : "control-input--right"} ${
            error ? "input--error" : "input--valid"
          }`}
        />
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}
