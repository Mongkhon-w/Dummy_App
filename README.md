# 🚀 Dummy App ด้วย Node.js, Express, Prisma และ MySQL ที่ออกแบบมาเพื่อรองรับ Playwright Template

## 🛠️ Required Tools

* Database: MySQL (XAMPP, Laragon, etc.)
* Runtime/Language: Node.js / JavaScript
* Framework: Express.js
* Template Engine: EJS (สำหรับทำ Web UI)
* ORM: Prisma (เวอร์ชัน 6 เพื่อความเสถียร)
* Automation Testing: Playwright
* Editor: VS Code

## 🏗️ Development Setup
### Initialize Project (First time)
```bash
# สร้างไฟล์ package.json
npm init -y
# ติดตั้ง Backend Dependencies
npm install express ejs
# ติดตั้ง Prisma และ Playwright
npm install prisma@^6.0.0 @prisma/client@^6.0.0 --save-dev
npm install @playwright/test --save-dev
# ติดตั้ง Browser สำหรับ Playwright
npx playwright install
# สร้างไฟล์ตั้งค่าเริ่มต้นของ Prisma
npx prisma init
```

### Environment Variables (.env)
```bash
สร้างไฟล์ .env
(อย่าลืมตั้งค่า `DATABASE_URL` ในไฟล์ `.env` ให้เรียบร้อย)
```

### Create Folder Structure (MVC Pattern)
```bash
# 1. สร้างโฟลเดอร์
mkdir controllers routes views tests

# 2. สร้างไฟล์ทั้งหมด
touch server.js routes/apiRoutes.js routes/webRoutes.js controllers/apiController.js controllers/webController.js views/login.ejs views/dashboard.ejs tests/ui-api-flow.spec.ts
```
### Database Migration
```bash
npx prisma db push
```

## 🏃‍♂️ Running the System

### Terminal 1 (สำหรับรัน Backend Server):
```bash
node server.js
(เซิร์ฟเวอร์จะทำงานที่ http://localhost:3000)
```
### Terminal 2 (สำหรับรัน Automation Test):
```bash
# รันเทสแบบเปิดเบราว์เซอร์ให้เห็นการทำงาน
npx playwright test tests/ui-api-flow.spec.ts --headed
```

## 📡 API Endpoints & Web Routes
โปรเจกต์ Dummy App นี้ถูกออกแบบมาให้มีทั้ง API (สำหรับ Setup Data) และ Web UI (สำหรับ Test UI) ดังนี้:

### ฝั่ง API (สำหรับให้ Playwright ยิงสร้างข้อมูล)

**1. Create Data (POST http://localhost:3000/api/v1/data)

```json
Request Body (JSON):
{
  "name": "Automation Test Flow",
  "status": "active_test"
}
Response (201 Created): ระบบจะบันทึกลง MySQL และคาย ID กลับมาให้ Playwright นำไปเช็กต่อ
```

### ฝั่ง Web UI (สำหรับจำลองผู้ใช้งานจริง)
**1. หน้า Login (GET http://localhost:3000/login)
```bash
ระบบจำลองการเข้าสู่ระบบแบบ Hardcode
Username: test_user
Password: password123
```

**2. หน้า Dashboard (GET http://localhost:3000/dashboard)
```bash
แสดงรายการข้อมูลทั้งหมดที่อยู่ใน Database ออกมาเป็น List (<li>)
Playwright จะเข้ามาค้นหาข้อมูลที่เพิ่งสร้างจาก API บนหน้านี้เพื่อยืนยันความถูกต้อง
```

