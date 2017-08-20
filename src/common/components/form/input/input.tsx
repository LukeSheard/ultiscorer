import { Classes } from "@blueprintjs/core";
import * as cx from "classnames";
import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";

export interface IFormInputProps {
  disabled?: boolean;
  label: string;
  name: string;
  required?: boolean;
}

interface WrappedInputProps extends WrappedFieldProps {
  disabled: boolean;
  label: string;
  name: string;
  type: string;
  required: boolean;
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
      <label className={Classes.INPUT_GROUP} htmlFor={name}>
        {label}
        {required
          ? <span className={Classes.TEXT_MUTED}> (required)</span>
          : null}
        <div className={Classes.INPUT_GROUP}>
          <input
            className={cx(Classes.INPUT, Classes.FILL)}
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

export default class WrappedInput extends React.Component<IFormInputProps, {}> {
  public render() {
    return <Field {...this.props} component={Input} props={this.props} />;
  }
}
