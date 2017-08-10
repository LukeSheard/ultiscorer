import { Button, Intent } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { reduxForm } from "redux-form";
import { IAppState } from "../../reducers";
const style = require("./form.css");

interface RawFormProps extends React.Props<RawForm> {
  handleSubmit: (values) => any;
  loading: boolean;
  label: string;
}

export class RawForm extends React.Component<RawFormProps, {}> {
  public render() {
    const { children, handleSubmit, loading, label } = this.props;
    return (
      <form className={style.form} onSubmit={handleSubmit}>
        {children}
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

  return connect(() => ({}), createMapDispatchToProps(action))(form as any);
}

interface FormWrappedProps<FormData>
  extends React.Props<FormWrapper<FormData>> {
  loading?: boolean;
  submit?: string;
  action: any;
  name: string;
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
