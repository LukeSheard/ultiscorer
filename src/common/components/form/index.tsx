import { Button, Classes, Intent } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ConfigProps, reduxForm } from "redux-form";
import { IAppState } from "../../reducers";
const style = require("./form.css");

interface RawFormProps extends React.Props<RawForm> {
  errors: object;
  handleSubmit: (values) => any;
  loading: boolean;
  label: string;
  valid: boolean;
  invalid: boolean;
}

export function Errors(errors) {
  return (
    <div
      className={`${Classes.CALLOUT} ${Classes.INTENT_DANGER} ${style.error}`}
    >
      <h5>Error</h5>
      {Object.values(errors).map((error, index) => {
        return (
          <p key={index}>
            {error}
          </p>
        );
      })}
    </div>
  );
}

export class RawForm extends React.Component<RawFormProps, {}> {
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
        {valid ? null : <Errors {...errors} />}
        <Button
          className="pt-fill"
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

export function createMapDispatchToProps(action) {
  return (dispatch: Dispatch<IAppState>) => {
    return {
      onSubmit: payload =>
        dispatch({
          payload,
          type: action
        })
    };
  };
}

export function createWrappedForm<FormData>({ name, action, ...config }) {
  const form = reduxForm<FormData, RawFormProps>({
    ...config,
    form: name
  })(RawForm as any);

  return connect(
    (state: IAppState) => ({
      errors: (state.form[name] && state.form[name].syncErrors) || void 0
    }),
    createMapDispatchToProps(action)
  )(form as any);
}

interface FormWrappedProps extends Partial<ConfigProps<any, any>> {
  loading?: boolean;
  submit?: string;
  action: any;
  name: string;
}

export default class FormWrapper<FormData> extends React.Component<
  FormWrappedProps,
  {}
> {
  public static defaultProps = {
    label: "Submit",
    loading: false
  };
  private form;
  constructor(props, ctx) {
    super(props, ctx);
    this.form = createWrappedForm<FormData>(this.props);
  }

  public render() {
    const Component = this.form;
    return <Component {...this.props} />;
  }
}
