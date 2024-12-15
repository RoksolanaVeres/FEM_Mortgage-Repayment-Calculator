type Props = {
  type: "number" | "radio";
  name: string;
  label: string;
  error?: string | undefined;
  id?: string;
  unit?: string;
  unitLeft?: boolean;
  defaultChecked?: boolean;
  value?: string;
};

export default function FormInput({
  type,
  name,
  label,
  error,
  id,
  unit,
  unitLeft,
  defaultChecked,
  value,
}: Props) {
  if (type === "number") {
    return (
      <div className="form-control-wrapper">
        <label htmlFor={id} className="control-label">
          {label}
        </label>
        <div className="control-input-icon-container">
          <div
            className={`control-icon ${unitLeft ? "control-icon--left" : "control-icon--right"} `}
          >
            {unit}
          </div>
          <input
            type="number"
            id={id}
            name={name}
            className={`control-input ${
              unitLeft ? "control-input--left" : "control-input--right"
            } ${error ? "input--error" : "input--valid"}`}
          />
          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
    );
  } else {
    return (
      <label className="radio-control-wrapper">
        <input
          type="radio"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          className="radio-input"
        />
        {label}
      </label>
    );
  }
}
