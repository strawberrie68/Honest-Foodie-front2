import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { terser } from "rollup-plugin-terser";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      "process.env.VITE_API_URL": JSON.stringify(
        process.env.VITE_API_URL || "",
      ),
    },
    build: {
      rollupOptions: {
        plugins: [terser()],
      },
      cssCodeSplit: true,
      sourcemap: false,
    },
  };
});
