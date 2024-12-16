import classes from "./FormInput.module.css";

type FormInputProps = {
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
}: FormInputProps) {
  if (type === "number") {
    return (
      <FormControlWrapper>
        <label htmlFor={id} className={classes.input_label}>
          {label}
        </label>
        <div className={classes["input-unit_container"]}>
          <div
            className={`${classes.input_unit} ${
              unitLeft ? classes["input_unit--left"] : classes["input_unit--right"]
            } `}
          >
            {unit}
          </div>
          <input
            type="number"
            id={id}
            name={name}
            className={`${classes.input} ${
              unitLeft ? classes["input--left"] : classes["input--right"]
            } ${error ? classes["input--error"] : classes["input--valid"]}`}
          />
          {error && <InputError>{error}</InputError>}
        </div>
      </FormControlWrapper>
    );
  } else {
    return (
      <label className={classes["radio-control-wrapper"]}>
        <input
          type="radio"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          className={classes["radio-input"]}
        />
        {label}
      </label>
    );
  }
}

type FormControlWrapperProps = {
  children: React.ReactNode;
};

export function FormControlWrapper({ children }: FormControlWrapperProps) {
  return <div className={classes["form-control-wrapper"]}>{children}</div>;
}

type InputErrorProps = {
  children: React.ReactNode;
};

function InputError({ children }: InputErrorProps) {
  return <p className={classes["error-text"]}>{children}</p>;
}
