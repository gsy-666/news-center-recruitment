require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件配置
app.use(cors());
app.use(express.json({ limit: '10mb' })); // 增加请求体大小限制
app.use(express.static(path.join(__dirname, 'public')));

// 打印请求日志（方便调试）
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 验证环境变量
if (!process.env.MONGODB_URI) {
  console.warn('⚠️ 警告: 未配置MONGODB_URI环境变量，数据库连接将失败');
}

// 路由挂载
app.use('/api', apiRoutes);

// 404处理
app.use((req, res) => {
  res.status(404).json({ success: false, message: '接口不存在' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log('环境:', process.env.NODE_ENV || 'development');
});
