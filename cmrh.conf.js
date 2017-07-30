module.exports = {
  generateScopedName:
    process.env.NODE_ENV !== "production"
      ? "[name]__[local]___[hash:base64:5]"
      : "[hash:base64:5]"
};
