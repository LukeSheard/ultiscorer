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
      <label className={Classes.INPUT_GROUP} htmlFor={name}>
        {label}
        {required
          ? <span className={Classes.TEXT_MUTED}> (required)</span>
          : null}
        <div className={cx(Classes.SELECT, Classes.FILL)}>
          <select
            className={Classes.FILL}
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
