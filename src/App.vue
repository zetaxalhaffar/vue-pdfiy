<template>
  <div>
    <button @click="downloadPdf">Prepare PDF</button>
    <button @click="annotatePdf">Annotate PDF</button>
  </div>
</template>
<script setup lang="ts">
import { useJsPdf } from "./composables";
import {
  createAnnotationFunction,
  createAnnotationTextLink,
} from "./plugins/Annotation";

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

  createAnnotationFunction(pdf, {
    type: "text",
    bounds: {
      x: 0,
      y: 0,
      w: 100,
      h: 10,
    },
    color: "#ff0000",
    contents: "Hello World!",
  });

  createAnnotationTextLink(pdf, {
    text: "link To Text",
    x: 10,
    y: 20,
    options: {
      url: "https://kords.ai",
    },
  });

  // Set the font before adding text
  pdf.setFont("Cairo", "normal");

  // Arabic text - needs to be reversed for RTL and positioned from right
  const arabicText = "مرحبا بالعالم";
  const arabicText2 = pdf.processArabic("مرحبا بالعالم");
  pdf.text(arabicText, 100, 50, { align: "right" });
  pdf.text(arabicText2, 100, 100, { align: "right" });

  // Mixed content (Arabic + English)
  const mixedText = pdf.processArabic("Hello مرحبا 123");
  pdf.text(mixedText, 100, 70, { align: "right" });

  savePdf("myPdf.pdf");
};
</script>
