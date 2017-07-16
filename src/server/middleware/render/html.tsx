import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { NODE_ENV } from "../../../../config";
import { IAppStore } from "../../../common/store";

export function toChunkList(chunks: string | string[] | undefined): string[] {
  return chunks ? (Array.isArray(chunks) ? chunks : [chunks]) : [];
}

export interface IHTMLProps extends React.Props<HTML> {
  children: any;
  assets: any;
  url: string;
  store: IAppStore;
}

export default class HTML extends React.Component<IHTMLProps, {}> {
  public render() {
    const { children, assets, url, store } = this.props;
    return (
      <html>
        <head>
          <title>My App</title>
          {this.createStylesheet(assets.common)}
          {this.createStylesheet(assets.main)}
          {this.createStylesheet(assets[url])}
        </head>
        <body>
          <div
            id="root"
            dangerouslySetInnerHTML={{
              __html:
                process.env.NODE_ENV === NODE_ENV.PRODUCTION
                  ? ReactDOM.renderToString(children)
                  : ""
            }}
          />
          <script
            id="app-initial-state"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(store.getState())
            }}
          />
          {this.createScript(assets.common)}
          {this.createScript(assets.main)}
          {this.createScript(assets[url])}
        </body>
      </html>
    );
  }

  private createScript(chunks: string | string[]) {
    return toChunkList(chunks)
      .filter(script => script.endsWith(".js"))
      .map(script =>
        <script key={script} src={`/${script}`} type="text/javascript" />
      );
  }

  private createStylesheet(chunks: string | string[]) {
    return toChunkList(chunks)
      .filter(sheet => sheet.endsWith(".css"))
      .map(sheet => <link key={sheet} href={`/${sheet}`} rel="stylesheet" />);
  }
}
