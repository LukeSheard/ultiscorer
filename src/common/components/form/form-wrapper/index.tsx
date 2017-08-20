import * as React from "react";
import { ConfigProps } from "redux-form";
import { createWrappedForm } from "./utils";

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
