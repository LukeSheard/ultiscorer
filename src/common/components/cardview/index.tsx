import { INonIdealStateProps, NonIdealState } from "@blueprintjs/core";
import * as React from "react";
import Card, { CardProps } from "./card";
const style = require("./style.css");

interface CardViewProps extends React.Props<CardView> {
  nonIdealProps: INonIdealStateProps;
  cards: CardProps[];
}

export const NON_IDEAL_PROPS: INonIdealStateProps = {
  title: "There is nothing here",
  visual: "error"
};

export default class CardView extends React.Component<CardViewProps, {}> {
  public render() {
    const { cards, nonIdealProps } = this.props;
    return (
      <div className={style.cardView}>
        {cards.length
          ? cards.map((card, index) => <Card key={index} {...card} />)
          : <NonIdealState {...NON_IDEAL_PROPS} {...nonIdealProps} />}
      </div>
    );
  }
}
