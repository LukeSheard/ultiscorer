import { Button, Intent } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { reduxForm } from "redux-form";
import { IAppState } from "../../../reducers";
import { createUserAction, USER_ACTION_TYPES } from "../../../reducers/user";
import Input from "../../form/input";
const style = require("./style.css");

export class SignUpPage extends React.Component<any, any> {
  public render() {
    const { handleSubmit, loading } = this.props;

    return (
      <form className={style.login_form} onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <Input name="name" type="text" label="Name" required />
        <Input name="email" type="email" label="Email" required />
        <Input name="password" type="password" label="Password" required />
        <Input
          name="password_confirm"
          type="password"
          label="Confirm Password"
          required
        />
        <Button
          className="pt-fill"
          type="submit"
          text="Submit"
          loading={loading}
          intent={Intent.PRIMARY}
        />
      </form>
    );
  }
}

export const SignUpPageForm = reduxForm({
  form: "sign-up"
})(SignUpPage);

export function mapStateToProps(state: IAppState) {
  return {
    loading: state.user && state.user.loading
  };
}

export function mapDispatchToProps(dispatch: Dispatch<IAppState>) {
  return {
    onSubmit: payload =>
      dispatch(createUserAction(USER_ACTION_TYPES.SIGNUP_REQUEST, payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPageForm);
