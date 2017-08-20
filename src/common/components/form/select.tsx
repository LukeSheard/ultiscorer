import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";

export interface IFormInputProps {
  disabled?: boolean;
  label: string;
  name: string;
  required?: boolean;
}

export class Select extends React.Component<
  IFormInputProps & WrappedFieldProps,
  {}
> {
  public static defaultProps = {
    disabled: false,
    name: "",
    required: false
  };

  public render() {
    const { children, disabled, input, label, name, required } = this.props;
    return (
      <label className="pt-label" htmlFor={name}>
        <div>
          {label}
        </div>
        {required ? <span className="pt-text-muted"> (required)</span> : null}
        <div className="pt-select pt-fill">
          <select
            className="pt-fill"
            disabled={disabled}
            name={name}
            required={required}
            {...input}
          >
            <option key="none" disabled>
              Select a value...
            </option>
            {children}
          </select>
        </div>
      </label>
    );
  }
}

export default class WrappedInput extends React.Component<IFormInputProps, {}> {
  public render() {
    return <Field {...this.props} component={Select} props={this.props} />;
  }
}
