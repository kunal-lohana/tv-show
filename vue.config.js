module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "http://api.tvmaze.com/"
  }
};
