<!-- Animated Header -->
<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=600&size=32&pause=1000&color=2E8B57&center=true&vCenter=true&width=700&lines=ReWear+%F0%9F%91%95;Circular+Fashion+Intelligence;Resell+%7C+Reuse+%7C+Recycle" />
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:2E8B57,100:4CAF50&height=120&section=header"/>
</p>

---

# ReWear 👕

> A circular fashion marketplace that evaluates garments for resale, predicts fair pricing, and recommends sustainable next steps.

---

## 🌍 The Problem

Fast fashion generates massive textile waste.  
Most consumers lack clarity on:

- Resellability  
- Fair pricing  
- Sustainable alternatives  

---

## 🎯 The Solution

ReWear uses computer vision + ML to:

- 👕 Detect garment category  
- 🧵 Identify fabric  
- ⭐ Score condition  
- ✅ Predict resale probability  
- 💰 Estimate price  
- ♻️ Suggest reuse or recycling  

---

## 🔄 Platform Flow (Animated)

<p align="center">
  <img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" width="500">
</p>

Upload → Analyze → Value → Decide → Sustain

---

## 🧠 Use Case Diagram

```mermaid
graph TD

User((User))
Admin((Admin))
Recycler((Recycling Partner))

User --> Analyze
Analyze --> Category
Analyze --> Condition
Analyze --> Fabric
Analyze --> Decision

Decision --> Resellable
Decision --> NotResellable

Resellable --> PriceEstimation
PriceEstimation --> Marketplace

NotResellable --> Buyback
NotResellable --> ReuseIdeas
NotResellable --> Recycling

Admin --> Marketplace
Recycler --> Recycling
```

---

## 🏗️ System Architecture

<p align="center">
  <img src="https://svg-banners.vercel.app/api?type=origin&text1=Image%20Upload&text2=CNN%20Feature%20Extraction&text3=Multi-Task%20Prediction&text4=Price%20Regression&text5=Decision%20Engine&width=900&height=200"/>
</p>

### Processing Flow

1. **Image Upload**
2. **CNN Backbone → Feature Vector**
3. **Multi-Task Prediction**
   - Category
   - Fabric
   - Condition
   - Resellability
4. **Price Regression**
5. **Lifecycle Decision Engine**

---

## 🚀 Core Features

- 📷 Image-based garment evaluation  
- 🧠 Multi-task CNN  
- 📊 Regression-driven pricing  
- ♻️ Sustainability recommendations  
- 🛍️ Marketplace integration  
- 🔍 Automated condition scoring  

---

## 🧪 Model Pipeline

### Step 1 — Image Input  
User uploads garment image.

### Step 2 — Multi-Task CNN  
Shared backbone predicts:
- Category  
- Fabric  
- Condition  
- Resellability  

### Step 3 — Price Prediction  
Regression model estimates resale value.

### Step 4 — Decision Engine  

If resellable:
→ List with suggested price  

If not:
→ Offer buyback  
→ Suggest reuse  
→ Recommend recycler  

---

## 🏗️ Tech Stack

**ML:** PyTorch / TensorFlow / Scikit-learn / OpenCV  
**Backend:** FastAPI / Flask  
**Frontend:** Streamlit (MVP) → React (Scale)  
**Data:** DeepFashion + resale datasets  

---

## 📁 Project Structure

```
├── data/
├── models/
├── notebooks/
├── app/
├── api/
└── README.md
```

---

## 🌱 Sustainability Impact

- Reduce textile landfill waste  
- Extend garment lifecycle  
- Enable circular fashion economy  
- Promote conscious consumption  

---

## 🎯 Vision

To build a fashion ecosystem where every garment is intelligently evaluated and redirected to its most sustainable next life.

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:4CAF50,100:2E8B57&height=120&section=footer"/>
</p>