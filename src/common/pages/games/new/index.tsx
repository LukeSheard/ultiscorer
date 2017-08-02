import * as React from "react";

export default class GameNewPage extends React.Component<any, any> {
  public render() {
    return (
      <form>
        <select name="team-a" />
        <select name="team-b" />
        <select name="tournament" />
        <select name="division" />
        <input name="tags" />
      </form>
    );
  }
}
