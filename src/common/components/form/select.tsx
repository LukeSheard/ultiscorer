import * as React from "react";
import { Field } from "redux-form";

export interface IFormInputProps {
  disabled?: boolean;
  label: string;
  name: string;
  required?: boolean;
}

export function CreateSelect(options) {
  return ({ input }) => {
    return (
      <div className="pt-select  pt-fill">
        <select {...input}>
          {options}
        </select>
      </div>
    );
  };
}

export default class Select extends React.Component<IFormInputProps, {}> {
  public static defaultProps = {
    disabled: false,
    name: "",
    required: false
  };

  public render() {
    const { children, disabled, label, name, required } = this.props;
    return (
      <label className="pt-label pt-inline" htmlFor={name}>
        <div>
          {label}
        </div>
        {required ? <span className="pt-text-muted"> (required)</span> : null}
        <div className="pt-input-group pt-fill">
          <Field
            className="pt-input"
            component={CreateSelect(children)}
            disabled={disabled}
            name={name}
          />
        </div>
      </label>
    );
  }
}
