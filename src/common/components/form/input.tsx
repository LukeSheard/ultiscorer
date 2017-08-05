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

const createInput = (props: IFormInputProps) => ({ input }) =>
  <Input {...props} input={input} />;

export default function WrappedInput(props: IFormInputProps) {
  return <Field component={createInput(props)} name={props.name} />;
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
