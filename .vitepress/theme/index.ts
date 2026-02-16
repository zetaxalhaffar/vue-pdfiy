// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { defineAsyncComponent, h } from "vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  // , _router, siteData
  enhanceApp({ app }) {
    // Use dynamic import to avoid SSR issues with pdfjs-dist
    if (typeof window !== "undefined") {
      const SimpleTable = defineAsyncComponent(
        () => import("../../src/examples/SimpleTable.vue"),
      );
      const MultiTablesWithHeaderFooter = defineAsyncComponent(
        () => import("../../src/examples/MultiTablesWithHeaderFooter.vue"),
      );
      const TableFromObjects = defineAsyncComponent(
        () => import("../../src/examples/TableFromObjects.vue"),
      );
      const InvoiceTable = defineAsyncComponent(
        () => import("../../src/examples/InvoiceTable.vue"),
      );
      const ReusableTableBuilder = defineAsyncComponent(
        () => import("../../src/examples/ReusableTableBuilder.vue"),
      );
      const DynamicTable = defineAsyncComponent(
        () => import("../../src/examples/DynamicTable.vue"),
      );
      const CustomTable = defineAsyncComponent(
        () => import("../../src/examples/CustomizationTable.vue"),
      );
      app.component("SimpleTable", SimpleTable);
      app.component("MultiTablesWithHeaderFooter", MultiTablesWithHeaderFooter);
      app.component("TableFromObjects", TableFromObjects);
      app.component("InvoiceTable", InvoiceTable);
      app.component("ReusableTableBuilder", ReusableTableBuilder);
      app.component("DynamicTable", DynamicTable);
      app.component("CustomTable", CustomTable);
    }
  },
} satisfies Theme;
