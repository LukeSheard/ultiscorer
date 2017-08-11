import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";

interface IFormInputProps extends React.Props<Field> {
  disabled?: boolean;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  validate?: any;
}

interface WrappedInputProps<S> extends WrappedFieldProps<S> {
  disabled: boolean;
  label: string;
  name: string;
  type: string;
  required: boolean;
}

export default class WrappedInput extends React.Component<IFormInputProps, {}> {
  public render() {
    return <Field {...this.props} component={Input} props={this.props} />;
  }
}

export class Input<S> extends React.Component<WrappedInputProps<S>, {}> {
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
