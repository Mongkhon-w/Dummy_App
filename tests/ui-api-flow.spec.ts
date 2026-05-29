import { test, expect } from '@playwright/test';

// =====================================================================
// 📌 ส่วนที่ 1: กำหนดตัวแปรและข้อมูลทดสอบ (เชื่อมกับ Localhost ของเรา)
// =====================================================================
const TEST_CONFIG = {
  // ชี้ไปที่ API และ Web Routes ของ Node.js Server ที่เรารันไว้
  apiEndpoint: 'http://localhost:3000/api/v1/data', 
  webUrl: 'http://localhost:3000/login',          
  dashboardUrl: 'http://localhost:3000/dashboard',    

  credentials: {
    username: 'test_user',
    password: 'password123'
  },
  
  // ข้อมูลที่จะยิง API ไปสร้างใน MySQL
  payload: {
    name: 'Automation Test Flow',
    status: 'active_test'
  }
};

test.describe('E2E Testing: ระบบจัดการข้อมูลและเข้าสู่ระบบ', () => {
  
    // ตัวแปรนี้จะเก็บ ID ของข้อมูลที่เราสร้างผ่าน API เพื่อใช้ตรวจสอบบนหน้า Dashboard
  let createdRecordId: number;

  test('ควรสร้างข้อมูลผ่าน API สำเร็จ และตรวจสอบข้อมูลนั้นบนหน้า Dashboard ได้', async ({ page, request }) => {
    
    // =====================================================================
    // 📌 ส่วนที่ 2: การทดสอบฝั่ง API (ยิงไปที่ Express API Route)
    // =====================================================================
    await test.step('1. ส่ง API Request เพื่อสร้างข้อมูลทดสอบลง Database', async () => {
      const response = await request.post(TEST_CONFIG.apiEndpoint, {
        data: TEST_CONFIG.payload
      });

      // ตรวจสอบว่า API คืนค่า 201 Created กลับมา
      expect(response.status()).toBe(201); 

      // เก็บค่า ID ของข้อมูลที่เพิ่งสร้าง
      const responseBody = await response.json();
      createdRecordId = responseBody.id; 
      
      // พิมพ์ log ออกมาดูเพื่อให้แน่ใจว่าได้ ID จริง
      console.log(`✅ API สร้างข้อมูลสำเร็จ: ID = ${createdRecordId}`);
    });

    // =====================================================================
    // 📌 ส่วนที่ 3: การควบคุมฝั่งหน้าเว็บ (เปิดหน้าเว็บที่ Render จาก EJS)
    // =====================================================================
    await test.step('2. เข้าสู่ระบบผ่านหน้าเว็บ UI', async () => {
      await page.goto(TEST_CONFIG.webUrl);

      // กรอกฟอร์มล็อกอิน (อ้างอิงจาก id ในไฟล์ login.ejs)
      await page.locator('#username').fill(TEST_CONFIG.credentials.username);
      await page.locator('#password').fill(TEST_CONFIG.credentials.password);
      
      // กดปุ่ม Login
      await page.locator('#btn-login').click();

      // รอให้ระบบ Redirect ไปหน้า Dashboard
      await page.waitForURL(TEST_CONFIG.dashboardUrl);
    });

// =====================================================================
    // 📌 ส่วนที่ 4: การตรวจสอบความถูกต้อง (หาข้อมูลบนหน้า Dashboard)
    // =====================================================================
    await test.step('3. ตรวจสอบข้อมูลบน Dashboard', async () => {
      
      // 📍 ค้นหา tag <li> ที่มีคำว่า "ID: [เลขล่าสุดที่เพิ่งสร้าง]" ซ่อนอยู่
      const targetElement = page.locator('li', { hasText: `ID: ${createdRecordId}` });

      // ยืนยันว่าข้อมูลนั้นแสดงผลอยู่บนหน้าเว็บจริงๆ
      await expect(targetElement).toBeVisible();
      
      // พิมพ์ log ออกมาดูเพื่อยืนยันว่าเจอข้อมูลที่ถูกต้อง
      console.log(`✅ พบข้อมูลล่าสุดที่สร้างจาก API (ID: ${createdRecordId}) บนหน้า Dashboard อย่างถูกต้อง`);

      await page.waitForTimeout(5000); // รอ 5 วินาทีเพื่อให้เห็นผลลัพธ์ก่อนจบการทดสอบ
    });

  });
});