import { INonIdealStateProps, NonIdealState } from "@blueprintjs/core";
import * as React from "react";
import Card, { CardProps } from "./card";
const style = require("./style.css");

interface CardViewProps extends React.Props<CardView> {
  nonIdealProps: INonIdealStateProps;
  cards: CardProps[];
}

export default class CardView extends React.Component<CardViewProps, {}> {
  public static defaultProps = {
    tags: [] as string[]
  };

  public render() {
    const { cards, nonIdealProps } = this.props;
    return (
      <div className={style.cardView}>
        {cards.length
          ? cards.map((card, index) => <Card key={index} {...card} />)
          : <NonIdealState {...nonIdealProps} />}
      </div>
    );
  }
}
