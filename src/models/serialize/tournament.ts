import { Serializer } from "jsonapi-serializer";

export default new Serializer("Tournament", {
  attributes: [
    "description",
    "divisions",
    "endDate",
    "location",
    "name",
    "owner",
    "startDate"
  ],
  dataLinks: {
    self(obj) {
      return `/api/tournament/${obj._id}`;
    },
    relationships(obj) {
      return {
        divisions: `/api/tournament/${obj._id}/relationships/divisions`,
        teams: `/api/tournament/${obj._id}/relationships/teams`
      };
    }
  },
  divisions: {
    attributes: ["name", "gender", "teams"],
    ref(_, division) {
      return division._id || division;
    },
    typeForAttribute: "Division"
  },
  keyForAttribute: "camelCase"
});
