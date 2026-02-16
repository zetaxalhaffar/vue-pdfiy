import { jsPDF } from "jspdf"; // Import specific field type

export const FormBuilder = (pdf: jsPDF) => {
  const { TextField, PushButton } = pdf.AcroForm;

  const pushButton = new PushButton();
  console.log(pushButton);
  pushButton.fieldName = "submitButton"; // Unique field name
  pushButton.Rect = [40, 140, 100, 20]; // [left, top, width, height] in PDF units
  pushButton.caption = "Submit";

  const textField = new TextField();
  textField.fieldName = "yourFieldName"; // Required: unique field name
  textField.Rect = [20, 100, 100, 20]; // [left, top, width, height] in PDF units
  textField.value = "Default value"; // Optional: default value
  textField.defaultValue = "Default"; // Optional: value on form reset
  textField.multiline = false; // Optional: single line vs multiline
  textField.maxLength = 50;

  pdf.addField(pushButton);
  pdf.addField(textField);
};
