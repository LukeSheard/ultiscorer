import { Serializer } from "jsonapi-serializer";

export default new Serializer("User", {
  attributes: ["email", "name", "ukuusername"],
  dataLinks: {
    self(obj) {
      return `/api/user/${obj._id}`;
    }
  },
  keyForAttribute: "camelCase"
});
