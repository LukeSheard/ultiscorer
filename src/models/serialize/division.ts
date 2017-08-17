import { Serializer } from "jsonapi-serializer";

export default new Serializer("Division", {
  attributes: ["gender", "name", "teams"],
  dataLinks: {
    self(obj) {
      return `/api/division/${obj._id}`;
    },
    relationships(obj) {
      return {
        owner: `/api/division/${obj._id}/relationships/owner`,
        teams: `/api/division/${obj._id}/relationships/teams`
      };
    }
  },
  keyForAttribute: "camelCase",
  teams: {
    included: true,
    ref(_, team) {
      return team._id || team;
    },
    typeForAttribute: "Team"
  }
});
