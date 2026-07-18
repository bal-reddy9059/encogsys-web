/**
 * PM2 process file for Hostinger VPS.
 * Usage: pm2 start ecosystem.config.cjs
 */
module.exports = {
  apps: [
    {
      name: "encogsys",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/var/www/encogsys",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
}
