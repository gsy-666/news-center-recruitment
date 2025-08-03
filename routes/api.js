const express = require('express');
const router = express.Router();
const recruitmentModel = require('../models/recruitment.model');
const departmentModel = require('../models/departments.model');

// 初始化部门数据
router.get('/init-departments', async (req, res) => {
  try {
    const result = await departmentModel.initializeDepartments();
    res.json({
      success: true,
      message: '部门数据初始化成功',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '初始化失败',
      error: err.message
    });
  }
});

// 获取所有部门信息
router.get('/departments', async (req, res) => {
  try {
    const departments = await departmentModel.getAllDepartments();
    res.json({
      success: true,
      data: departments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '获取部门信息失败',
      error: err.message
    });
  }
});

// 根据ID获取部门信息
router.get('/departments/:id', async (req, res) => {
  try {
    const department = await departmentModel.getDepartmentById(req.params.id);
    if (department) {
      res.json({
        success: true,
        data: department
      });
    } else {
      res.status(404).json({
        success: false,
        message: '部门不存在'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '获取部门信息失败',
      error: err.message
    });
  }
});

// 提交报名信息
router.post('/apply', async (req, res) => {
  try {
    // 简单数据验证
    const requiredFields = ['name', 'studentId', 'major', 'phone', 'department', 'reason'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `缺少必要信息: ${missingFields.join(', ')}`
      });
    }

    const applicationData = req.body;
    const result = await recruitmentModel.submitApplication(applicationData);

    res.json({
      success: true,
      message: '报名成功',
      applicationId: result.insertedId
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '报名失败',
      error: err.message
    });
  }
});

// 获取所有报名信息（管理员功能）
router.get('/applications', async (req, res) => {
  try {
    const applications = await recruitmentModel.getAllApplications();
    res.json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '获取报名列表失败',
      error: err.message
    });
  }
});

// 根据ID获取报名信息（管理员功能）
router.get('/applications/:id', async (req, res) => {
  try {
    const application = await recruitmentModel.getApplicationById(req.params.id);
    if (application) {
      res.json({
        success: true,
        data: application
      });
    } else {
      res.status(404).json({
        success: false,
        message: '报名信息不存在'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '获取报名信息失败',
      error: err.message
    });
  }
});

// 更新报名状态（管理员功能）
router.patch('/applications/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'approved', 'rejected', 'interviewed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `无效的状态值，允许的值: ${validStatuses.join(', ')}`
      });
    }

    const result = await recruitmentModel.updateApplicationStatus(req.params.id, status);

    if (result.modifiedCount > 0) {
      res.json({
        success: true,
        message: '状态更新成功'
      });
    } else {
      res.status(404).json({
        success: false,
        message: '更新失败，未找到对应报名信息'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '更新状态失败',
      error: err.message
    });
  }
});

module.exports = router;