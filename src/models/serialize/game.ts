import { Serializer } from "jsonapi-serializer";

export default new Serializer("Division", {
  attributes: [
    "actions",
    "away",
    "division",
    "firstPull",
    "home",
    "owner",
    "tournament"
  ],
  dataLinks: {
    self(obj) {
      return `/api/game/${obj._id}`;
    },
    relationships(obj) {
      return {
        owner: `/api/game/${obj._id}/relationships/owner`,
        teams: `/api/game/${obj._id}/relationships/teams`
      };
    }
  },
  keyForAttribute: "camelCase"
});
