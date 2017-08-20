import { Button, Classes, Intent } from "@blueprintjs/core";
import * as React from "react";
import Errors from "./errors";
const style = require("./style.css");

export interface RawFormProps extends React.Props<RawForm> {
  errors: object;
  handleSubmit: (values) => any;
  loading: boolean;
  label: string;
  valid: boolean;
  invalid: boolean;
}

export default class RawForm extends React.Component<RawFormProps, {}> {
  public render() {
    const {
      children,
      errors,
      handleSubmit,
      invalid,
      loading,
      label,
      valid
    } = this.props;

    return (
      <form className={style.form} onSubmit={handleSubmit}>
        {children}
        {valid ? null : <Errors errors={errors} />}
        <Button
          className={Classes.FILL}
          type="submit"
          text={label}
          loading={loading}
          intent={Intent.PRIMARY}
          disabled={invalid}
        />
      </form>
    );
  }
}
