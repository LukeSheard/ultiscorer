export { default as saga } from "./saga";

import * as React from "react";
import { connect } from "react-redux";
import Form from "../../../components/form";
import Input from "../../../components/form/input";
import { IAppState } from "../../../reducers";
import { USER_ACTION_TYPES } from "../../../reducers/user";

export class AccountPage extends React.Component<any, any> {
  constructor(props, ctx) {
    super(props, ctx);
    this.validatePassword = this.validatePassword.bind(this);
  }

  public render() {
    const { initialValues, loading } = this.props;
    return (
      <Form
        initialValues={initialValues}
        name="account"
        loading={loading}
        action={USER_ACTION_TYPES.UPDATE_REQUEST}
      >
        <h1>Account Details</h1>
        <Input name="name" type="text" label="Name" required />
        <Input name="email" type="email" label="Email" required />
        <Input name="ukuusername" type="text" label="UKU Username" />
        <Input name="password" type="password" label="Password" />
        <Input
          name="password_confirm"
          type="password"
          label="Password (Confirm)"
          validate={this.validatePassword}
        />
      </Form>
    );
  }

  private validatePassword(_, values) {
    if (
      (values.password && values.password_confirm === void 0) ||
      (values.password === void 0 && values.password_confirm) ||
      values.password !== values.password_confirm
    ) {
      return "Passwords do not match";
    }

    return void 0;
  }
}

export function mapStateToProps(state: IAppState) {
  return {
    initialValues: state.user.user,
    loading: state.user.loading
  };
}

export default connect(mapStateToProps)(AccountPage);
