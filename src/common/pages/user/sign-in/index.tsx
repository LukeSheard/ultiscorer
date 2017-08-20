export { default as saga } from "./saga";

import * as React from "react";
import { connect } from "react-redux";
import Form from "../../../components/form";
import Input from "../../../components/form/input";
import { IAppState } from "../../../reducers";
import { USER_ACTION_TYPES } from "../../../reducers/user";

export class LoginForm extends React.Component<any, any> {
  public render() {
    const { loading } = this.props;
    return (
      <Form
        name="login"
        loading={loading}
        action={USER_ACTION_TYPES.LOGIN_REQUEST}
      >
        <h2>Login</h2>
        <Input name="email" type="email" label="Email" required />
        <Input name="password" type="password" label="Password" required />
      </Form>
    );
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    loading: state.user && state.user.loading
  };
}

export default connect(mapStateToProps)(LoginForm);
