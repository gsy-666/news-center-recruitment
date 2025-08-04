const { MongoClient } = require('mongodb');

// 直接从环境变量读取，不要硬编码
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('请在 .env 文件中设置 MONGODB_URI 环境变量');
}

// 连接数据库的函数
async function connectDB() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    console.log('成功连接到 MongoDB Atlas');
    return client.db(); // 返回数据库实例
  } catch (error) {
    console.error('数据库连接失败:', error);
    throw error; // 让错误冒泡，方便日志排查
  }
}

module.exports = connectDB;