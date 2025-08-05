const { MongoClient } = require('mongodb');

// 从环境变量获取连接地址
const MONGODB_URI = process.env.MONGODB_URI;

// 增加环境变量检查的详细日志
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI 环境变量未配置！');
  throw new Error('请配置 MONGODB_URI 环境变量');
} else {
  // 只打印协议部分，避免泄露密码
  const uriStart = MONGODB_URI.split('://')[0] + '://[隐藏的凭据]@' + MONGODB_URI.split('@')[1];
  console.log('📌 正在使用的 MongoDB 连接协议:', uriStart);
}

let dbInstance = null;

async function connectDB() {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    console.log('🔗 开始连接 MongoDB...');
    const client = await MongoClient.connect(MONGODB_URI, {
      // 增加连接超时和重试配置，适应云环境
      serverSelectionTimeoutMS: 5000, // 5秒超时
      retryWrites: true
    });
    console.log('✅ 成功连接到 MongoDB');
    dbInstance = client.db();
    return dbInstance;
  } catch (error) {
    console.error('❌ 数据库连接失败（详细信息）:', error); // 打印完整错误
    throw error;
  }
}

module.exports = connectDB;