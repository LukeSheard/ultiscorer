import { Classes } from "@blueprintjs/core";
import * as cx from "classnames";
import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";

interface IFormInputProps extends React.Props<Field> {
  disabled?: boolean;
  label: string;
  name: string;
  required?: boolean;
  validate?: any;
}

interface WrappedInputProps extends WrappedFieldProps {
  disabled: boolean;
  label: string;
  name: string;
  required: boolean;
}

export default class WrappedInput extends React.Component<IFormInputProps, {}> {
  public render() {
    return <Field {...this.props} component={Input} props={this.props} />;
  }
}

export class Input extends React.Component<WrappedInputProps, {}> {
  public static defaultProps = {
    disabled: false,
    name: "",
    required: false
  };

  public render() {
    const { disabled, label, input, name, required } = this.props;
    return (
      <label className={Classes.INPUT_GROUP} htmlFor={name}>
        {label}
        {required
          ? <span className={Classes.TEXT_MUTED}> (required)</span>
          : null}
        <div className={Classes.INPUT_GROUP}>
          <textarea
            className={cx(Classes.INPUT, Classes.FILL)}
            disabled={disabled}
            name={name}
            required={required}
            {...input}
          />
        </div>
      </label>
    );
  }
}
