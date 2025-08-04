const express = require('express');
const router = express.Router();
const recruitmentModel = require('../models/recruitment.model');

// 报名接口
router.post('/apply', async (req, res) => {
  try {
    // 1. 验证请求体是否存在
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: '请求体不能为空'
      });
    }

    // 2. 调用模型层提交数据
    const result = await recruitmentModel.submitApplication(req.body);

    // 3. 返回成功响应
    res.status(201).json({
      success: true,
      message: '报名提交成功',
      data: result
    });
  } catch (error) {
    // 4. 捕获并返回错误信息（区分客户端和服务器错误）
    const statusCode = error.message.includes('缺少必填字段') ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      message: statusCode === 400 ? error.message : '服务器处理失败',
      // 开发环境返回详细错误，生产环境隐藏
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
