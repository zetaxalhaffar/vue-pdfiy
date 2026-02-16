<template>
  <div>
    <button @click="downloadPdf">Prepare PDF</button>
  </div>
</template>
<script setup lang="ts">
import { useJsPdf } from "./composables";

const preparePdf = () => {
  image({
    imageData:
      "https://images.unsplash.com/photo-1770230901490-a9e30b2f3e75?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    x: 0,
    y: 0,
    width: 110,
    height: 197,
  });
};

const downloadPdf = () => {
  preparePdf();
  savePdf("myPdf.pdf");
};

const { pdf, savePdf, image, loadCustomFontFn } = useJsPdf({
  orientation: "p",
  unit: "mm",
  format: "a4",
});
</script>
