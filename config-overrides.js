const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@utils": "src/utils",
    "@assets": "src/assets",
    "@icons": "src/assets/icons/svg_pack",
  })(config);

  return config;
};
