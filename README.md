# ♻️ Smart-Waste-Sorter

## 🧾 Smart-Waste-Sorter – Rule-Based Waste Classification System

A browser-based **Single Page Application (SPA)** designed to analyze and classify waste items into:

* 🔴 **Hazard**
* 🟡 **Compost**
* 🟢 **Recycle**
* ⚫ **Trash**

Built using **HTML, JavaScript, and Tailwind CSS**, this system assists recycling facility workers by reducing human error and improving sorting efficiency.

---

## 📌 Table of Contents

* 📖 Overview
* 💼 Business Problem
* 📊 Dataset / Inputs
* 🛠 Tools & Technologies
* 🗂 Project Structure
* 🧹 Data Cleaning & Preparation
* 🧠 Classification Logic
* 🔎 Research Questions & Key Findings
* 🖥 Dashboard / User Interface
* 🚀 How to Run the Project
* 📌 Final Recommendations
* 👨‍💻 Author & Contact

---

## 📖 Overview

Smart-Waste-Sorter is a responsive web-based SPA that helps recycling workers quickly and accurately classify waste items.

The system applies **strict rule-based priority logic** to minimize misclassification, especially for hazardous or contaminated materials.

Users can:

* Upload waste images
* Capture images using the browser camera
* Receive instant classification with clear visual feedback

---

## 💼 Business Problem

Manual waste sorting is:

* Slow
* Error-prone
* Risky for hazardous materials

On high-speed conveyor belts, misclassification can:

* Create safety hazards
* Contaminate recyclable materials
* Reduce operational efficiency

Smart-Waste-Sorter provides a fast, structured, and rule-driven solution to improve reliability and safety.

---

## 📊 Dataset / Inputs

The system processes:

* 🖼 Uploaded waste images
* 📷 Optional live camera capture

### Supported Formats:

* JPG
* PNG
* Minimum resolution: **720p**

### Classification Priority:

Hazard → Compost → Recycle → Trash

---

## 🛠 Tools & Technologies

* HTML
* Vanilla JavaScript
* Tailwind CSS (CDN)
* Git & GitHub
* Vite (Development Server)

---

## 🗂 Project Structure

```
smart-waste-sorter/
│
├── README.md
├── .gitignore
├── .env.local
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.js
├── App.vue / App.js
├── index.html
├── metadata.js
├── types.d.ts
├── node_modules/
├── components/
├── services/
```

---

## 🧹 Data Cleaning & Preparation

To ensure accurate classification:

* Validate file type (JPG/PNG only)
* Ensure resolution ≥ 720p
* Optional preprocessing for lighting correction
* Orientation validation before classification

---

## 🧠 Exploratory Analysis & Classification Logic

### 🔴 HAZARD (Highest Priority)

* Batteries
* Electronics
* Chemicals
* Flammable items
* Light bulbs

### 🟡 COMPOST

* Food waste
* Greasy cardboard
* Organic scraps

### 🟢 RECYCLE

* Clean paper
* Cardboard
* Glass
* Plastics
* Metals

### ⚫ TRASH

* Soft plastics
* Styrofoam
* Unrecognized materials

### System Logic:

* Hazard items override all other categories
* Multiple-item images select the most hazardous class
* Rule-based engine ensures response time under 5 seconds

---

## 🔎 Research Questions

* How can hazardous misclassification be minimized?
* How can the SPA remain mobile-friendly and responsive?
* How can visual feedback improve worker efficiency?

---

## 📈 Key Findings

* Priority-based logic significantly reduces human error
* Color-coded UI increases decision speed
* SPA architecture ensures low-latency performance

---

## 🖥 Dashboard / User Interface

Features include:

* Image upload
* Live camera capture
* Instant classification results
* Clear color-coded feedback:

  * 🔴 Hazard
  * 🟡 Compost
  * 🟢 Recycle
  * ⚫ Trash
* Handling instructions for hazardous materials
* Fully responsive mobile design using Tailwind CSS

---

## 🚀 How to Run This Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/smart-waste-sorter.git
cd smart-waste-sorter
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create `.env.local` file:

```
VITE_API_KEY=your_api_key_here
```

⚠️ Do NOT commit `.env.local` to GitHub.

### 4️⃣ Run Development Server

```bash
npm run dev
```

Open the URL shown in the terminal and begin testing.

---

## 📌 Final Recommendations

* Never commit `.env.local`
* Maintain image resolution standards
* Always prioritize Hazard classification
* Integrate real-time camera capture for facility optimization
* Consider expanding to AI-based image recognition in future versions

---

## 👨‍💻 Author & Contact

**Mian Muhammad Hassan**
AI Engineer

📧 Email: [mmh427726@gmail.com](mailto:mmh427726@gmail.com)
🔗 GitHub: [https://github.com/mianhasssan](https://github.com/mianhasssan)
🔗 LinkedIn: [https://www.linkedin.com/in/mianmuhammadhassan322](https://www.linkedin.com/in/mianmuhammadhassan322)


