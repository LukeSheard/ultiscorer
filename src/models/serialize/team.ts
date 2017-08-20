import { Serializer } from "jsonapi-serializer";

export default new Serializer("Team", {
  attributes: ["gender", "name", "numbers", "players"],
  dataLinks: {
    self(obj) {
      return `/api/team/${obj._id}`;
    },
    relationships(obj) {
      return {
        club: `/api/team/${obj._id}/relationships/club`,
        players: `/api/team/${obj._id}/relationships/players`,
        tournaments: `/api/team/${obj._id}/tournaments/tournaments`
      };
    }
  },
  keyForAttribute: "camelCase",
  players: {
    included: false,
    ref(_, team) {
      return team._id || team;
    },
    typeForAttribute: "User"
  }
});
