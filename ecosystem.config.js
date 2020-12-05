module.exports = {
  apps: [
    {
      name: "stuurkracht-frontend",
      exec_mode: "cluster",
      instances: "max",
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
      watch: true,
      exp_backoff_restart_delay: 100,
    },
  ],
};
