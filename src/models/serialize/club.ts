import { Serializer } from "jsonapi-serializer";

export default new Serializer("Club", {
  attributes: ["location", "name", "owner", "teams"],
  dataLinks: {
    self(obj) {
      return `/api/team/${obj._id}`;
    },
    relationships(obj) {
      return {
        members: `/api/club/${obj._id}/relationships/members`,
        teams: `/api/club/${obj._id}/relationships/teams`
      };
    }
  },
  keyForAttribute: "camelCase",
  teams: {
    included: false,
    ref(_, team) {
      return team._id || team;
    },
    typeForAttribute: "Team"
  }
});
