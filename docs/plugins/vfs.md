# VFS (Virtual File System) Documentation

## Overview

The VFS lets you store named file contents inside the PDF document. It is used internally for custom fonts and other binary data. You can add files, read them back, and check if a file exists by name.

```typescript
import { useJsPdf } from 'vue-pdfiy'

const { addFileToVFS, getFileFromVFS, isFileInVFS } = useJsPdf({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
})
```

---

## addFileToVFS

Adds a file to the virtual file system. Content is stored as a string (e.g. base64 for binary data).

**Parameters:** `{ name: string, content: string }`

### Example

```typescript
const { addFileToVFS } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

addFileToVFS({
  name: 'myfile.txt',
  content: 'Hello from VFS',
})

// Base64 content (e.g. for fonts or images)
addFileToVFS({
  name: 'custom-font.base64',
  content: 'T1RUTgAAAAAAAAAAAA...',
})
```

---

## getFileFromVFS

Returns the stored content for a given file name. Returns an empty string if the file is not in the VFS.

**Parameters:** `name: string`  
**Returns:** `string`

### Example

```typescript
const { addFileToVFS, getFileFromVFS } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

addFileToVFS({ name: 'config.json', content: '{"theme":"dark"}' })

const content = getFileFromVFS('config.json')
console.log(content) // '{"theme":"dark"}'
```

---

## isFileInVFS

Checks whether a file with the given name exists in the VFS.

**Parameters:** `name: string`  
**Returns:** `boolean`

### Example

```typescript
const { addFileToVFS, isFileInVFS } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

addFileToVFS({ name: 'logo.png', content: 'iVBORw0KGgo...' })

if (isFileInVFS('logo.png')) {
  console.log('Logo is available in VFS')
}

console.log(isFileInVFS('missing.txt')) // false
```

---

## Complete example

```typescript
import { useJsPdf } from 'vue-pdfiy'

const { addFileToVFS, getFileFromVFS, isFileInVFS, addText, savePdf } = useJsPdf({
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
})

// Add a file
addFileToVFS({ name: 'note.txt', content: 'Stored note' })

// Check and read
if (isFileInVFS('note.txt')) {
  const note = getFileFromVFS('note.txt')
  addText(note, { x: 20, y: 20 })
}

savePdf('with-vfs.pdf')
```
