import { connect } from "react-redux";
import { Dispatch } from "redux";
import { reduxForm } from "redux-form";
import { IAppState } from "../../../reducers";
import RawForm, { RawFormProps } from "./raw-form";

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

export function createMapFormStateToProps(name: string) {
  return (state: IAppState) => ({
    errors: (state.form[name] && state.form[name].syncErrors) || void 0
  });
}

export function createWrappedForm<FormData>({ name, action, ...config }) {
  const form = reduxForm<FormData, RawFormProps>({
    ...config,
    form: name
  })(RawForm as any);

  return connect(
    createMapFormStateToProps(name),
    createMapDispatchToProps(action)
  )(form as any);
}
