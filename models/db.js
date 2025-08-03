const { MongoClient } = require('mongodb');

// 连接字符串
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// 数据库名称
const dbName = 'newsCenterDB';

// 连接数据库
async function connectDB() {
  try {
    await client.connect();
    console.log('成功连接到MongoDB数据库');
    return client.db(dbName);
  } catch (err) {
    console.error('数据库连接失败:', err);
    throw err;
  }
}

module.exports = { connectDB, client };