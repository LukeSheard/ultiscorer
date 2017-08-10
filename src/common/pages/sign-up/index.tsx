export { default as saga } from "./saga";

import * as React from "react";
import { connect } from "react-redux";
import Form from "../../components/form";
import Input from "../../components/form/input";
import { IAppState } from "../../reducers";
import { USER_ACTION_TYPES } from "../../reducers/user";

export class LoginForm extends React.Component<any, any> {
  public render() {
    const { loading } = this.props;
    return (
      <Form
        name="sign-up"
        loading={loading}
        action={USER_ACTION_TYPES.SIGNUP_REQUEST}
      >
        <h2>Sign Up</h2>
        <Input name="name" type="text" label="Name" required />
        <Input name="email" type="email" label="Email" required />
        <Input name="password" type="password" label="Password" required />
        <Input
          name="password_confirm"
          type="password"
          label="Password (Confirm)"
          validate={this.validatePassword}
          required
        />
      </Form>
    );
  }

  private validatePassword(_, values) {
    if (
      (values.password && values.confirm_password === void 0) ||
      (values.password === void 0 && values.confirm_password) ||
      values.password !== values.confirm_password
    ) {
      return "Passwords do not match";
    }

    return void 0;
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    loading: state.user && state.user.loading
  };
}

export default connect(mapStateToProps)(LoginForm);
