import { Button, Classes, Intent } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { reduxForm } from "redux-form";
import { IAppState } from "../../reducers";
const style = require("./form.css");

interface RawFormProps extends React.Props<RawForm> {
  errors: object;
  handleSubmit: (values) => any;
  loading: boolean;
  label: string;
  valid: boolean;
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

export function createWrappedForm<FormData>(name, action) {
  const form = reduxForm<FormData, RawFormProps, {}>({
    form: name
  })(RawForm);

  return connect(
    (state: IAppState) => ({
      errors: (state.form[name] && state.form[name].syncErrors) || void 0
    }),
    createMapDispatchToProps(action)
  )(form as any);
}

interface FormWrappedProps<FormData>
  extends React.Props<FormWrapper<FormData>> {
  loading?: boolean;
  submit?: string;
  action: any;
  name: string;
  initialValues?: Partial<FormData>;
}

export default class FormWrapper<FormData> extends React.Component<
  FormWrappedProps<FormData>,
  {}
> {
  public static defaultProps = {
    label: "Submit",
    loading: false
  };
  private form;
  constructor(props, ctx) {
    super(props, ctx);
    this.form = createWrappedForm<FormData>(this.props.name, this.props.action);
  }

  public render() {
    const Component = this.form;
    return <Component {...this.props} />;
  }
}
