import * as React from "react";
import { Field } from "redux-form";

export interface IFormInputProps {
  disabled?: boolean;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}

export default class Input extends React.Component<IFormInputProps, {}> {
  public static defaultProps = {
    disabled: false,
    name: "",
    required: false,
    type: "text"
  };

  public render() {
    const { disabled, label, name, type, required } = this.props;
    return (
      <label className="pt-label" htmlFor={name}>
        {label}
        {required ? <span className="pt-text-muted"> (required)</span> : null}
        <div className="pt-input-group">
          <Field
            className="pt-input pt-fill"
            component="input"
            disabled={disabled}
            type={type}
            name={name}
          />
        </div>
      </label>
    );
  }
}
