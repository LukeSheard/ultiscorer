import { Classes } from "@blueprintjs/core";
import * as cx from "classnames";
import * as React from "react";
import { BaseFieldProps, Field, WrappedFieldProps } from "redux-form";

interface InputGroupProps {
  disabled?: boolean;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

export interface IFormInputProps
  extends BaseFieldProps<InputGroupProps>,
    InputGroupProps {}

interface WrappedInputProps extends WrappedFieldProps, InputGroupProps {}

export class Input extends React.Component<WrappedInputProps, {}> {
  public static defaultProps: Partial<InputGroupProps> = {
    disabled: false,
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
