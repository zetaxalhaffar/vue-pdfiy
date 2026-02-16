<template>
  <div>
    <button @click="downloadPdf">Prepare PDF</button>
    <button @click="annotatePdf">Annotate PDF</button>
  </div>
</template>
<script setup lang="ts">
import { useJsPdf } from "./composables";
import { FormBuilder } from "./plugins/ArcoFrom";

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

const annotatePdf = async () => {
  // Load the Arabic font once using the composable method
  await loadCustomFontFn(
    "/Cairo-Regular.ttf",
    "Cairo-Regular",
    "Cairo",
    "normal",
  );

  FormBuilder(pdf);

  savePdf("myPdf.pdf");
};
</script>
