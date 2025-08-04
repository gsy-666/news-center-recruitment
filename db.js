const { MongoClient } = require('mongodb');

// 从环境变量获取连接地址
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('请在.env文件中配置MONGODB_URI环境变量');
}

// 单例模式：缓存数据库连接实例
let dbInstance = null;

async function connectDB() {
  // 如果已连接，直接返回实例
  if (dbInstance) {
    return dbInstance;
  }

  try {
    const client = await MongoClient.connect(MONGODB_URI);
    console.log('✅ 成功连接到MongoDB数据库');
    dbInstance = client.db(); // 存储数据库实例
    return dbInstance;
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message);
    throw error; // 抛出错误给上层处理
  }
}

module.exports = connectDB;
