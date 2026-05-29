const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createData = async (req, res) => {
  const { name, status } = req.body;
  try {
    const newData = await prisma.testData.create({
      data: { name, status }
    });
    // ส่งออกข้อมูลในรูปแบบ JSON
    res.status(201).json({ id: newData.id, name: newData.name, status: newData.status });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create data' });
  }
};