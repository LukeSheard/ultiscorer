import { Classes } from "@blueprintjs/core";
import { DateRangeInput, IDateRangePickerProps } from "@blueprintjs/datetime";
import * as React from "react";
import { Field, WrappedFieldInputProps, WrappedFieldProps } from "redux-form";
const style = require("./style.css");

export interface DateInputProps
  extends WrappedFieldProps,
    IDateRangePickerProps {
  label: string;
  required: boolean;
}

export class DateInput extends React.Component<DateInputProps, {}> {
  public static defaultProps = {
    allowSingleDayRange: true,
    defaultValue: [null, null]
  };

  constructor(props, ctx) {
    super(props, ctx);
    this.handleChange = this.handleChange.bind(this);
  }

  public render() {
    const { input, label, required, ...props } = this.props;

    return (
      <label className={Classes.INPUT_GROUP} htmlFor={name}>
        {label}
        {required
          ? <span className={Classes.TEXT_MUTED}> (required)</span>
          : null}
        <div className={style.datepicker}>
          <DateRangeInput
            {...props}
            endInputProps={{
              className: style.input
            }}
            format="DD MMM YYYY"
            onChange={this.handleChange}
            popoverProps={{
              className: style.popover
            }}
            startInputProps={{
              className: style.input
            }}
            value={(input && input.value) || this.props.defaultValue}
          />
        </div>
      </label>
    );
  }

  private handleChange(selectedRange) {
    return (this.props.input as WrappedFieldInputProps).onChange(selectedRange);
  }
}

export interface WrappedInputProps extends Partial<DateInputProps> {
  name: string;
}

export default class WrappedInput extends React.Component<
  WrappedInputProps,
  {}
> {
  public render() {
    const { name, ...props } = this.props;

    return (
      <Field name={name} component={DateInput as any} props={props as any} />
    );
  }
}
