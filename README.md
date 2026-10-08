# PackCheck-AI 📦

## AI-Based Packaging Compliance Scanner

PackCheck-AI is an AI-assisted web application that analyzes packaged-product images and checks whether important information required on packaged commodities is present and readable.

The system uses **OCR, image processing, text extraction, regular expressions, and rule-based compliance analysis** to extract information from product labels and generate a compliance report.

---

## 🎯 Problem Statement

Checking packaged-product labels manually can be time-consuming and difficult, especially when important information is small, unclear, or spread across different parts of the package.

PackCheck-AI aims to automate the initial inspection of packaged-product labels by scanning an image and checking important fields such as:

- Product Name
- Net Quantity
- MRP
- Manufacturer
- FSSAI License Number
- Manufacturing Date
- Use-by / Expiry Date
- Batch Number

The project is designed as a prototype for automated packaging compliance analysis under the **Legal Metrology (Packaged Commodities) Rules, 2011** and related requirements.

> **Note:** PackCheck-AI is a decision-support prototype and does not replace official regulatory inspection or legal verification.

---

## 🚀 Features

- 📷 Upload packaged-product images
- 🔍 OCR-based text extraction
- 📝 Automatic product information extraction
- 💰 MRP detection
- ⚖️ Net quantity detection
- 🏭 Manufacturer identification
- 🧾 FSSAI license number detection
- 📅 Manufacturing and use-by date detection
- 🔢 Batch number detection
- 📊 Compliance score generation
- 🎯 OCR confidence estimation
- ⚠️ Issue detection
- 📋 Scan history
- 🌐 Web-based interface

---

## 🔄 How It Works

```text
Product Image
      ↓
Image Preprocessing
      ↓
Tesseract OCR
      ↓
Extracted Text
      ↓
Information Extraction
      ↓
Compliance Rule Checking
      ↓
Compliance Score
      ↓
Final Compliance Status
```

---

## 🛠️ Technologies Used

- HTML
- CSS
- JavaScript
- Python
- Tesseract OCR
- OpenCV
- Regular Expressions
- Rule-Based Compliance Analysis

---

## 📁 Project Structure

```text
PackCheck-AI/
│
├── index.html
├── script.js
├── main.py
├── start_demo.bat
├── README.md
```

---

## 🖥️ How to Use

1. Open the PackCheck-AI application.
2. Upload an image of a packaged product.
3. The system performs OCR and extracts text.
4. Important product information is identified automatically.
5. Compliance rules are applied.
6. A compliance score and report are generated.

---

## 📊 Compliance Analysis

The system generates:

- Compliance Status
- Compliance Score
- Detected Information
- Missing Fields
- OCR Confidence
- Potential Issues

---

## 🔮 Future Scope

- Improved OCR accuracy for low-quality images
- Support for multiple languages
- Advanced AI-based label understanding
- Barcode and QR-code analysis
- Mobile application
- Cloud-based deployment
- Automated compliance report generation

---

## ⚠️ Disclaimer

PackCheck-AI is an academic/prototype project intended to assist with the initial analysis of packaged-product labels. It does not constitute official legal, regulatory, or compliance advice.

---

## 👨‍💻 Project

**PackCheck-AI — AI-Based Packaging Compliance Scanner**

Developed as an academic project.
