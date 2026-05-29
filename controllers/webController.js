const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  if (username === 'test_user' && password === 'password123') {
    res.redirect('/dashboard');
  } else {
    res.status(401).send('ล็อกอินไม่สำเร็จ');
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const allData = await prisma.testData.findMany({
      orderBy: { id: 'desc' }
    });
    res.render('dashboard', { records: allData });
  } catch (error) {
    res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูล');
  }
};