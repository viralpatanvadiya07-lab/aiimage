# 🚀 Complete Deployment Guide (GitHub, Vercel & Render)

Maine aapke code mein Vercel ke liye zaruri settings (`vercel.json` aur `server.js` mein serverless config) already add kar di hain. Ab aap apne project ko easily deploy kar sakte hain. 

Niche diye gaye steps ko carefully follow karein:

---

## 🟢 STEP 1: Code ko GitHub par Push karein

Sabse pehle aapko apne project ko GitHub par dalna hoga kyunki Vercel aur Render dono GitHub se apka code read karte hain.

1. **GitHub par ek naya repository banayein** (Example name: `imageai-project`)
2. Apne VS Code ke terminal mein yeh commands run karein (Make sure aap main folder `New folder` mein hain):

```bash
git init
git add .
git commit -m "Initial commit for Deployment"
git branch -M main
git remote add origin https://github.com/AAPKA_USERNAME/AAPKA_REPO_NAME.git
git push -u origin main
```
*(Yaha `AAPKA_USERNAME` aur `AAPKA_REPO_NAME` ko apne GitHub details se replace karein)*

---

## 🟠 STEP 2: Backend ko Render par Deploy karein

Render backend (Express/Node.js) host karne ke liye ek behtareen aur free platform hai.

1. **Render.com** par jaayein aur apne GitHub se login karein.
2. Dashboard par **New +** button par click karein aur **Web Service** select karein.
3. **Build and deploy from a Git repository** choose karein aur apna wahi GitHub repo select karein.
4. Settings mein yeh details fill karein:
   - **Name:** imageai-backend
   - **Root Directory:** `backend` *(Yeh likhna bahut zaroori hai!)*
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables (Advanced):** Yaha apne `backend/.env` file wale secret variables daalein:
   - `MONGODB_URI` = `Aapka MongoDB Link`
   - `JWT_SECRET` = `Aapka Secret Key`
   - `RAZORPAY_KEY_ID` = `Aapki Razorpay Key`
   - `RAZORPAY_KEY_SECRET` = `Aapki Razorpay Secret`
6. **Create Web Service** par click karein.
7. Deployment poori hone ke baad Render aapko ek URL dega (Jaise: `https://imageai-backend.onrender.com`). **Is URL ko copy kar lein**, yeh aage frontend mein kaam aayega.

---

## 🔵 STEP 3: Frontend ko Vercel par Deploy karein

1. **Vercel.com** par jaayein aur GitHub se login karein.
2. Dashboard par **Add New...** > **Project** par click karein.
3. Apna wahi GitHub repo import karein.
4. Import karte waqt settings mein yeh details dhyaan se change karein:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend` *(Edit button pe click karke `frontend` select karein)*
5. **Environment Variables** section expand karein aur wahan ye variable add karein:
   - Name: `VITE_API_URL`
   - Value: `https://imageai-backend.onrender.com` *(Ye wo backend URL hai jo Render ne Step 2 mein diya tha)*
6. **Deploy** button par click karein.

---

### 🎉 Congratulations!
Aapki website ab poori tarah se live aur internet par available hai!

**Note:**
- Vercel par page refresh karne pe *404 Not Found* ki error na aaye, iske liye maine `frontend/vercel.json` file already add kar di hai.
- Backend ko bhi Vercel par deploy karne ke configurations maine `backend/server.js` aur `backend/vercel.json` mein kar diye hain, lekin Express backend ke liye **Render** zyada accha aur stable option hai. Isliye is guide mein Render ka use sikhaya gaya hai.
