const { defineConfig, loadEnv } = require("vite");
const react = require("@vitejs/plugin-react");

module.exports = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    optimizeDeps: {
      include: ["@web-core/asset/theme"],
    },
    define: {
      "process.env.REACT_APP_API_URL": JSON.stringify(env.VITE_API_URL || env.REACT_APP_API_URL || ""),
    },
  };
});
