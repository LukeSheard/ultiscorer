import { Serializer } from "jsonapi-serializer";

const options = {
  attributes: [
    "away",
    "division",
    "firstPull",
    "home",
    "owner",
    "points",
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
};

["away", "home", "firstPull"].forEach(key => {
  options[key] = {
    included: true,
    ref(_, team) {
      return team._id || team;
    },
    typeForAttribute: "Team"
  };
});

export default new Serializer("Division", options);
