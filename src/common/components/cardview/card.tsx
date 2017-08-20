import { Classes, Tag } from "@blueprintjs/core";
import * as cx from "classnames";
import * as React from "react";
import { Link } from "react-router";
const style = require("./style.css");

export interface CardProps extends React.Props<Card> {
  title: string;
  subtitle?: string;
  message?: string;
  link: string;
  tags?: string[];
}

export default class Card extends React.Component<CardProps, {}> {
  public render() {
    const { title, subtitle, message, link, tags } = this.props;
    return (
      <Link className={style.card} to={link}>
        <div className={cx(Classes.CARD, Classes.INTERACTIVE, style.cardInner)}>
          <h3 className={style.cardTitle}>
            {title}
          </h3>
          {subtitle
            ? <h5>
                {subtitle}
              </h5>
            : null}
          {message
            ? <p>
                {message}
              </p>
            : null}
          {tags && tags.length
            ? <div className={style.tags}>
                {tags.map((tag, index) =>
                  <Tag className={cx(style.tag)} key={index}>
                    {tag}
                  </Tag>
                )}
              </div>
            : null}
        </div>
      </Link>
    );
  }
}
