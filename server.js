const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const webRoutes = require('./routes/webRoutes');

const app = express();

// รองรับการรับส่งข้อมูลแบบ JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// นำ Route มาใช้งาน
app.use('/api/v1', apiRoutes);
app.use('/', webRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ เซิร์ฟเวอร์ทำงานแล้วที่ http://localhost:${PORT}`);
});