module.exports = {
  apps: [
    {
      name: "stuurkracht-frontend",
      script: "./node_modules/nuxt/bin/nuxt.js",
      // Cluster mode gives a port conflict. Use single instance unless performance suffers
      // exec_mode: "cluster",
      // instances: "max",
      instances: 1,
      args: "start",
      watch: true,
      exp_backoff_restart_delay: 100,
    },
  ],
};
