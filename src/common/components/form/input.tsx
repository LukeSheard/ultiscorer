import * as React from "react";
import { Field, WrappedFieldInputProps } from "redux-form";

interface IFormInputProps {
  disabled?: boolean;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}

interface WrappedInputProps extends IFormInputProps {
  input: WrappedFieldInputProps;
}

export default class WrappedInput extends React.Component<IFormInputProps, {}> {
  public render() {
    return (
      <Field component={Input} props={this.props} name={this.props.name} />
    );
  }
}

export class Input extends React.Component<WrappedInputProps, {}> {
  public static defaultProps = {
    disabled: false,
    name: "",
    required: false,
    type: "text"
  };

  public render() {
    const { disabled, label, input, name, type, required } = this.props;
    return (
      <label className="pt-label" htmlFor={name}>
        {label}
        {required ? <span className="pt-text-muted"> (required)</span> : null}
        <div className="pt-input-group">
          <input
            className="pt-input pt-fill"
            disabled={disabled}
            type={type}
            name={name}
            required={required}
            {...input}
          />
        </div>
      </label>
    );
  }
}
