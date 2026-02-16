import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/composables/index.ts"),
      name: "VuePdfify",
      fileName: (format) =>
        `vue-pdfiy.${format === "es" ? "js" : format + ".cjs"}`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["vue", "jspdf", "jspdf-autotable", "@tato30/vue-pdf"],
      output: {
        globals: {
          vue: "Vue",
          jspdf: "jsPDF",
          "jspdf-autotable": "jspdfAutotable",
          "@tato30/vue-pdf": "VuePDF",
        },
        exports: "named",
      },
    },
  },
});
