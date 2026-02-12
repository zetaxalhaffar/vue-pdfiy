<template>
  <div class="app-container">
    <!-- Trigger Button -->
    <div class="landing-section">
      <div class="landing-content">
        <h1 class="hero-title">PDF Table Builder</h1>
        <p class="hero-description">
          Create and customize professional PDF tables with live preview
        </p>
        <button @click="openModal" class="btn btn-hero">Open Table Builder</button>
      </div>
    </div>

    <!-- Fullscreen Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
          <div class="modal-container">
            <!-- Modal Header -->
            <div class="modal-header">
              <h2 class="modal-title">PDF Table Builder</h2>
              <button @click="closeModal" class="btn btn-secondary" title="Close (Esc)">
                Close
              </button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
              <div class="builder-layout">
                <!-- Left Panel - Customization -->
                <div class="customization-panel">
                  <div class="panel-scroll">
                    <!-- Title Section -->
                    <div class="control-section">
                      <h3 class="subsection-title">Title</h3>
                      <div class="form-group">
                        <label>Text:</label>
                        <input
                          v-model="config.title.text"
                          type="text"
                          class="input-field"
                          @input="autoRender"
                          placeholder="Enter title text"
                        />
                      </div>
                      <div class="form-row">
                        <div class="form-group">
                          <label>Size:</label>
                          <input
                            v-model.number="config.title.fontSize"
                            type="number"
                            class="input-field"
                            min="10"
                            max="72"
                            @input="autoRender"
                          />
                        </div>
                        <div class="form-group">
                          <label>Color:</label>
                          <input
                            v-model="config.title.color"
                            type="color"
                            class="input-color"
                            @input="autoRender"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Table Header Data & Styling -->
                    <div class="control-section">
                      <h3 class="subsection-title">Table Header</h3>

                      <!-- Header Columns -->
                      <div class="data-section">
                        <label class="section-label">Header Columns:</label>
                        <div
                          v-for="(col, index) in tableData.headers"
                          :key="'header-' + index"
                          class="data-row"
                        >
                          <input
                            v-model="tableData.headers[index]"
                            type="text"
                            class="input-field flex-1"
                            @input="autoRender"
                            placeholder="Column name"
                          />
                          <button
                            @click="removeHeader(Number(index))"
                            class="btn btn-danger"
                            style="padding: 4px 8px; font-size: 12px"
                            v-if="tableData.headers.length > 1"
                            title="Remove column"
                          >
                            Remove
                          </button>
                        </div>
                        <button @click="addHeaderColumn" class="btn btn-sm btn-secondary">
                          Add Column
                        </button>
                      </div>

                      <!-- Header Styling -->
                      <div class="styling-section">
                        <label class="section-label">Styling:</label>
                        <div class="form-row">
                          <div class="form-group">
                            <label>Background:</label>
                            <input
                              v-model="config.header.fillColor"
                              type="color"
                              class="input-color"
                              @input="autoRender"
                            />
                          </div>
                          <div class="form-group">
                            <label>Text Color:</label>
                            <input
                              v-model="config.header.textColor"
                              type="color"
                              class="input-color"
                              @input="autoRender"
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <label>Font Size:</label>
                          <input
                            v-model.number="config.header.fontSize"
                            type="number"
                            class="input-field"
                            min="6"
                            max="20"
                            @input="autoRender"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Table Body Data & Styling -->
                    <div class="control-section">
                      <h3 class="subsection-title">Table Body</h3>

                      <!-- Body Rows -->
                      <div class="data-section">
                        <label class="section-label">Data Rows:</label>
                        <div
                          v-for="(row, rowIndex) in tableData.rows"
                          :key="'row-' + rowIndex"
                          class="data-row-group"
                        >
                          <div class="row-header">
                            <span>Row {{ Number(rowIndex) + 1 }}</span>
                            <button
                              @click="removeRow(Number(rowIndex))"
                              class="btn btn-danger"
                              style="padding: 4px 8px; font-size: 12px"
                              v-if="tableData.rows.length > 1"
                              title="Remove row"
                            >
                              Remove
                            </button>
                          </div>
                          <div
                            v-for="(cell, cellIndex) in row"
                            :key="'cell-' + cellIndex"
                            class="data-row"
                          >
                            <input
                              v-model="tableData.rows[rowIndex][cellIndex]"
                              type="text"
                              class="input-field flex-1"
                              @input="autoRender"
                              :placeholder="`${tableData.headers[cellIndex] || 'Cell'}`"
                            />
                          </div>
                        </div>
                        <button @click="addRow" class="btn btn-sm btn-secondary">Add Row</button>
                      </div>

                      <!-- Body Styling -->
                      <div class="styling-section">
                        <label class="section-label">Styling:</label>
                        <div class="form-row">
                          <div class="form-group">
                            <label>Background:</label>
                            <input
                              v-model="config.body.fillColor"
                              type="color"
                              class="input-color"
                              @input="autoRender"
                            />
                          </div>
                          <div class="form-group">
                            <label>Text Color:</label>
                            <input
                              v-model="config.body.textColor"
                              type="color"
                              class="input-color"
                              @input="autoRender"
                            />
                          </div>
                        </div>
                        <div class="form-row">
                          <div class="form-group">
                            <label>Alternate Row:</label>
                            <input
                              v-model="config.body.alternateRowColor"
                              type="color"
                              class="input-color"
                              @input="autoRender"
                            />
                          </div>
                          <div class="form-group">
                            <label>Font Size:</label>
                            <input
                              v-model.number="config.body.fontSize"
                              type="number"
                              class="input-field"
                              min="6"
                              max="20"
                              @input="autoRender"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Table Footer Data & Styling -->
                    <div class="control-section">
                      <h3 class="subsection-title">Table Footer</h3>

                      <!-- Footer Row -->
                      <div class="data-section">
                        <label class="section-label">Footer Row:</label>
                        <div class="footer-toggle">
                          <label class="checkbox-label">
                            <input
                              v-model="config.footer.enabled"
                              type="checkbox"
                              @change="autoRender"
                            />
                            <span>Enable Footer</span>
                          </label>
                        </div>
                        <div v-if="config.footer.enabled">
                          <div
                            v-for="(cell, index) in tableData.footer"
                            :key="'footer-' + index"
                            class="data-row"
                          >
                            <input
                              v-model="tableData.footer[index]"
                              type="text"
                              class="input-field flex-1"
                              @input="autoRender"
                              :placeholder="`${tableData.headers[index] || 'Footer cell'}`"
                            />
                          </div>
                        </div>
                      </div>

                      <!-- Footer Styling -->
                      <div class="styling-section" v-if="config.footer.enabled">
                        <label class="section-label">Styling:</label>
                        <div class="form-row">
                          <div class="form-group">
                            <label>Background:</label>
                            <input
                              v-model="config.footer.fillColor"
                              type="color"
                              class="input-color"
                              @input="autoRender"
                            />
                          </div>
                          <div class="form-group">
                            <label>Text Color:</label>
                            <input
                              v-model="config.footer.textColor"
                              type="color"
                              class="input-color"
                              @input="autoRender"
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <label>Font Size:</label>
                          <input
                            v-model.number="config.footer.fontSize"
                            type="number"
                            class="input-field"
                            min="6"
                            max="20"
                            @input="autoRender"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="button-group">
                      <button class="btn btn-primary" @click="renderPdf">Refresh Preview</button>
                      <button class="btn btn-success" @click="downloadPdf">Download PDF</button>
                      <button class="btn btn-secondary" @click="copyCode">Copy Code</button>
                      <button class="btn btn-secondary" @click="resetToDefault">Reset All</button>
                    </div>
                  </div>
                </div>

                <!-- Right Panel - Preview -->
                <div class="preview-panel">
                  <div class="preview-header">
                    <h3 class="preview-title">Live Preview</h3>
                  </div>

                  <div class="preview-content">
                    <div v-if="!pdfUrl" class="empty-state">
                      <p>Configure your table and generate preview</p>
                      <button class="btn btn-primary" @click="renderPdf">Generate Preview</button>
                    </div>
                    <div v-else class="pdf-container">
                      <VuePDF :pdf="pdf" :page="page" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { useJsPdf } from '@/composables/index'
import { VuePDF, usePDF, type PDFSrc } from '@tato30/vue-pdf'
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'

const pdfUrl = ref<PDFSrc | ArrayBuffer | null>(null)
const page = ref(1)
const isModalOpen = ref(false)

const { pdf } = usePDF(pdfUrl as PDFSrc)
const { addText, outputAsArrayBuffer, setFontSize, textColor, savePdf, createTableBuilder } =
  useJsPdf({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  })

// Default configuration
const defaultConfig = {
  title: {
    text: 'Product Sales Report',
    fontSize: 24,
    color: '#000000',
  },
  header: {
    fillColor: '#2196F3',
    textColor: '#ffffff',
    fontSize: 12,
  },
  body: {
    fillColor: '#ffffff',
    textColor: '#000000',
    alternateRowColor: '#f5f5f5',
    fontSize: 10,
  },
  footer: {
    enabled: true,
    fillColor: '#4CAF50',
    textColor: '#ffffff',
    fontSize: 11,
  },
}

const defaultTableData = {
  headers: ['Product', 'Price', 'Quantity', 'Total'],
  rows: [
    ['Laptop', '$999', '5', '$4,995'],
    ['Mouse', '$29', '15', '$435'],
    ['Keyboard', '$79', '10', '$790'],
    ['Monitor', '$299', '8', '$2,392'],
    ['Headphones', '$149', '12', '$1,788'],
  ],
  footer: ['Grand Total', '', '', '$10,400'],
}

// Reactive configuration
const config = reactive(JSON.parse(JSON.stringify(defaultConfig)))
const tableData = reactive(JSON.parse(JSON.stringify(defaultTableData)))

const HEADER_HEIGHT = 30

// Modal Controls
const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

// Keyboard shortcuts
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})

// Add/Remove Header Columns
const addHeaderColumn = () => {
  tableData.headers.push(`Column ${tableData.headers.length + 1}`)
  tableData.rows.forEach((row: string[]) => row.push(''))
  tableData.footer.push('')
  autoRender()
}

const removeHeader = (index: number) => {
  if (tableData.headers.length > 1) {
    tableData.headers.splice(index, 1)
    tableData.rows.forEach((row: string[]) => row.splice(index, 1))
    tableData.footer.splice(index, 1)
    autoRender()
  }
}

// Add/Remove Body Rows
const addRow = () => {
  const newRow = Array.from({ length: tableData.headers.length }, () => '')
  tableData.rows.push(newRow)
  autoRender()
}

const removeRow = (index: number) => {
  if (tableData.rows.length > 1) {
    tableData.rows.splice(index, 1)
    autoRender()
  }
}

const preparePdf = () => {
  // Add Title
  setFontSize(config.title.fontSize)
  textColor(config.title.color)
  addText(config.title.text, { x: 0, y: HEADER_HEIGHT, isCentered: true })

  // Create Table with customization
  const builder = createTableBuilder()
    .setStartY(HEADER_HEIGHT + 20)
    .addHeader(tableData.headers)
    .setHeaderStyles({
      fillColor: config.header.fillColor,
      textColor: config.header.textColor,
      fontSize: config.header.fontSize,
      fontStyle: 'bold',
      halign: 'center',
    })
    .addRows(tableData.rows)
    .setBodyStyles({
      fillColor: config.body.fillColor,
      textColor: config.body.textColor,
      fontSize: config.body.fontSize,
    })
    .setAlternateRowStyles({
      fillColor: config.body.alternateRowColor,
    })

  // Add footer if enabled
  if (config.footer.enabled) {
    builder.addFooter(tableData.footer).setFooterStyles({
      fillColor: config.footer.fillColor,
      textColor: config.footer.textColor,
      fontSize: config.footer.fontSize,
      fontStyle: 'bold',
      halign: 'right',
    })
  }

  builder.build()
}

let autoRenderTimeout: ReturnType<typeof setTimeout> | null = null

const autoRender = () => {
  if (autoRenderTimeout) {
    clearTimeout(autoRenderTimeout)
  }

  autoRenderTimeout = setTimeout(() => {
    if (pdfUrl.value) {
      renderPdf()
    }
  }, 500)
}

const renderPdf = () => {
  preparePdf()
  nextTick(() => {
    const arrayBuffer = outputAsArrayBuffer()
    pdfUrl.value = arrayBuffer
    page.value = 1
  })
}

const downloadPdf = () => {
  preparePdf()
  const timestamp = new Date().toISOString().split('T')[0]
  savePdf(`customized-table-${timestamp}.pdf`)
}

const resetToDefault = () => {
  Object.assign(config, JSON.parse(JSON.stringify(defaultConfig)))
  Object.assign(tableData, JSON.parse(JSON.stringify(defaultTableData)))
  if (pdfUrl.value) {
    renderPdf()
  }
}

const generateCode = () => {
  const titleCode = `  setFontSize(${config.title.fontSize})
  textColor('${config.title.color}')
  addText('${config.title.text}', { x: 0, y: ${HEADER_HEIGHT}, isCentered: true })`

  const headerCode = `    .addHeader([${tableData.headers.map((h: any) => `'${h}'`).join(', ')}])
    .setHeaderStyles({
      fillColor: '${config.header.fillColor}',
      textColor: '${config.header.textColor}',
      fontSize: ${config.header.fontSize},
      fontStyle: 'bold',
      halign: 'center',
    })`

  const bodyCode = `    .addRows([
${tableData.rows.map((row: any) => `      [${row.map((cell: any) => `'${cell}'`).join(', ')}],`).join('\n')}
    ])
    .setBodyStyles({
      fillColor: '${config.body.fillColor}',
      textColor: '${config.body.textColor}',
      fontSize: ${config.body.fontSize},
    })
    .setAlternateRowStyles({
      fillColor: '${config.body.alternateRowColor}',
    })`

  const footerCode = config.footer.enabled
    ? `    .addFooter([${tableData.footer.map((f: any) => `'${f}'`).join(', ')}])
    .setFooterStyles({
      fillColor: '${config.footer.fillColor}',
      textColor: '${config.footer.textColor}',
      fontSize: ${config.footer.fontSize},
      fontStyle: 'bold',
      halign: 'right',
    })`
    : ''

  return `const preparePdf = () => {
  ${titleCode}

  const builder = createTableBuilder()
    .setStartY(${HEADER_HEIGHT} + 20)
${headerCode}
${bodyCode}
${footerCode}

  builder.build()
}`
}

const copyCode = async () => {
  try {
    const code = generateCode()
    await navigator.clipboard.writeText(code)
    // Optional: Show a toast or alert
    alert('Code copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy: ', err)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = generateCode()
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('Code copied to clipboard!')
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

/* Landing Section */
.app-container {
  min-height: 100vh;
  background: #211951;
}

.landing-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.landing-content {
  text-align: center;
  color: white;
}

.hero-title {
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-description {
  font-size: 20px;
  margin-bottom: 32px;
  opacity: 0.95;
}

.btn-hero {
  padding: 16px 48px;
  font-size: 18px;
  background: white;
  color: #211951;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.btn-hero:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 0;
}

.modal-container {
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.modal-header {
  background: #211951;
  color: white;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
}

.icon {
  font-size: 28px;
}

.btn-close {
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.modal-body {
  flex: 1;
  overflow: hidden;
  display: flex;
}

.builder-layout {
  display: grid;
  grid-template-columns: 450px 1fr;
  width: 100%;
  height: 100%;
}

/* Customization Panel */
.customization-panel {
  background: white;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.panel-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.control-section {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  border-left: 4px solid #211951;
}

.subsection-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #211951;
}

.data-section {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 2px dashed #ddd;
}

.styling-section {
  margin-top: 16px;
}

.section-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #211951;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
}

.data-row-group {
  background: white;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 12px;
  border: 1px solid #e0e0e0;
}

.row-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 600;
  color: #211951;
  font-size: 13px;
}

.footer-toggle {
  margin-bottom: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font-weight: 500;
  color: #211951;
}

.checkbox-label input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 12px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #211951;
}

.input-field {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  color: #211951;
  transition: all 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: #211951;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.flex-1 {
  flex: 1;
}

.input-color {
  width: 100%;
  height: 40px;
  padding: 2px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.input-color:hover {
  border-color: #211951;
}

/* Buttons */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid #e0e0e0;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn:active {
  transform: translateY(0);
}

.btn-sm {
  padding: 8px 16px;
  font-size: 13px;
  width: 100%;
}

.btn-icon {
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #211951;
  color: white;
}

.btn-primary:hover {
  background: #1a1440;
}

.btn-success {
  background: #4caf50;
  color: white;
}

.btn-success:hover {
  background: #45a049;
}

.btn-secondary {
  background: #757575;
  color: white;
}

.btn-secondary:hover {
  background: #616161;
}

.btn-danger {
  background: #f44336;
  color: white;
}

.btn-danger:hover {
  background: #d32f2f;
}

/* Preview Panel */
.preview-panel {
  display: flex;
  flex-direction: column;
  background: #e9ecef;
  height: 100%;
  overflow: hidden;
}

.preview-header {
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.preview-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.preview-content {
  flex: 1;
  overflow: auto;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  background: white;
  border-radius: 12px;
  border: 2px dashed #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 72px;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 18px;
  color: #666;
  margin-bottom: 24px;
}

.pdf-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 100%;
}

/* Scrollbar styling */
.panel-scroll::-webkit-scrollbar,
.preview-content::-webkit-scrollbar {
  width: 8px;
}

.panel-scroll::-webkit-scrollbar-track,
.preview-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.panel-scroll::-webkit-scrollbar-thumb,
.preview-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.panel-scroll::-webkit-scrollbar-thumb:hover,
.preview-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1200px) {
  .builder-layout {
    grid-template-columns: 400px 1fr;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .hero-description {
    font-size: 16px;
  }

  .builder-layout {
    grid-template-columns: 1fr;
  }

  .customization-panel {
    border-right: none;
    border-bottom: 1px solid #ddd;
    max-height: 40vh;
  }
}
</style>
