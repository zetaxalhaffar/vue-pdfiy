<template>
  <div class="flex gap-4">
    <svg
      id="svg-example"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#B00FFF"
      stroke="#FF00FF"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 2L2 22h20z"></path>
    </svg>
    <div class="flex gap-4 mb-4">
      <button class="button-style" @click="saveAutoTable">Save Auto Table</button>
      <button class="button-style" @click="renderAutoTable">Render Auto Table</button>
    </div>
    <div v-if="pdfUrl" class="pdf-style">
      <VuePDF :pdf="pdf" v-if="pdfUrl" :page="page" />
    </div>
  </div>

  <div class="flex gap-4" style="flex-wrap: wrap">
    <button class="button-style" @click="testExample1">Test Ex 1</button>
    <button class="button-style" @click="testExample2">Test Ex 2</button>
    <button class="button-style" @click="testExample3">Test Ex 3</button>
    <button class="button-style" @click="testExample4">Test Ex 4</button>
    <button class="button-style" @click="testExample5">Test Ex 5</button>
    <button class="button-style" @click="testExample6">Test Ex 6</button>
    <button class="button-style" @click="testExample7">Test Ex 7</button>
    <button class="button-style" @click="testExample8">Test Ex 8</button>
    <button class="button-style" @click="testExample9">Test Ex 9</button>
    <button class="button-style" @click="testExample10">Test Ex 10</button>
    <button class="button-style" @click="testExample10">Run All Examples</button>
    <button class="button-style" @click="testExample11">Run All Examples</button>
  </div>
</template>

<script lang="ts" setup>
import { useJsPdf } from '@/composables'
import { VuePDF, usePDF, type PDFSrc } from '@tato30/vue-pdf'
import { ref } from 'vue'
import {
  example10_ResetAndRebuild,
  example1_SimpleTable,
  example2_StyledTable,
  example3_DynamicTable,
  example4_TableFromObjects,
  example5_MultiPageReport,
  example6_ColumnStyling,
  example7_ReusingBuilder,
  example8_Invoice,
  example9_GetContent,
  runAllExamples,
} from './examples/tableBuilderExample'
const { pdf: pdfJsPdf, outputAsArrayBuffer, createTable } = useJsPdf({})

const pdfUrl = ref<PDFSrc | ArrayBuffer | null>(null)
const page = ref(1)
const { pdf } = usePDF(pdfUrl as PDFSrc)

const saveAutoTable = () => {
  pdfJsPdf.save('auto-table.pdf')
}

const renderAutoTable = () => {
  createTable({
    body: [[{ content: 'Hello' }, { content: 'World' }]],
  })
  const arrayBuffer = outputAsArrayBuffer()
  pdfUrl.value = arrayBuffer
}

const testExample1 = () => {
  example1_SimpleTable()
}

const testExample2 = () => {
  example2_StyledTable()
}

const testExample3 = () => {
  example3_DynamicTable()
}

const testExample4 = () => {
  example4_TableFromObjects()
}

const testExample5 = () => {
  example5_MultiPageReport()
}

const testExample6 = () => {
  example6_ColumnStyling()
}

const testExample7 = () => {
  example7_ReusingBuilder()
}

const testExample8 = () => {
  example8_Invoice()
}

const testExample9 = () => {
  example9_GetContent()
}

const testExample10 = () => {
  example10_ResetAndRebuild()
}

const testExample11 = () => {
  runAllExamples()
}
</script>

<style></style>
