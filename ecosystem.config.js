module.exports = {
  apps: [
    {
      name: "StuurkrachtFrontend",
      exec_mode: "cluster",
      instances: "max",
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
    },
  ],
};
