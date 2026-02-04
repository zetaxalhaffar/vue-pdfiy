# `containsArabic` Utility

### Overview

The `containsArabic` utility checks whether a given string contains any Arabic characters.  
It is useful when you need to detect Arabic text to apply special fonts, layout, or RTL logic.

```ts
import containsArabic from '@/utils/IsArabicText'
```

### Signature

```ts
function containsArabic(text: string): boolean
```

- **text**: The input string to check.
- **returns**: `true` if the string contains at least one Arabic character, otherwise `false`.

### Basic Usage

```ts
const title = 'مرحبا بالعالم'

if (containsArabic(title)) {
  console.log('Title contains Arabic characters')
}
```

### Mixed Text Example

```ts
const value1 = 'Hello World'
const value2 = 'Hello عالم'

console.log(containsArabic(value1)) // false
console.log(containsArabic(value2)) // true
```

### With PDF Generation

```ts
import { useJsPdf } from 'vue-pdfiy'
import containsArabic from '@/utils/IsArabicText'

const { addText, savePdf } = useJsPdf({ orientation: 'p', unit: 'mm', format: 'a4' })

const text = 'مرحبا vue-pdfiy'

if (containsArabic(text)) {
  // Here you could switch to an Arabic-capable font before drawing the text
  // setFont('YourArabicFont')
}

addText(text, { x: 20, y: 30 })
savePdf('arabic-text.pdf')
```

