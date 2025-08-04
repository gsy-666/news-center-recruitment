const connectDB = require('../db');

class RecruitmentModel {
  constructor() {
    this.collectionName = 'applications'; // 集合名称，确保与数据库一致
  }

  // 提交报名信息
  async submitApplication(applicationData) {
    try {
      // 1. 验证必填字段
      const requiredFields = ['name', 'studentId', 'major', 'phone', 'department', 'reason'];
      const missingFields = requiredFields.filter(field => !applicationData[field]);
      if (missingFields.length > 0) {
        throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
      }

      // 2. 获取数据库连接
      const db = await connectDB();
      const collection = db.collection(this.collectionName);

      // 3. 处理数据格式（避免类型错误）
      const application = {
        ...applicationData,
        studentId: String(applicationData.studentId), // 强制转为字符串，避免数字类型冲突
        phone: String(applicationData.phone),
        submittedAt: new Date(), // 提交时间
        status: 'pending' // 默认为待处理状态
      };

      // 4. 执行插入操作
      const result = await collection.insertOne(application);
      if (!result.acknowledged) {
        throw new Error('数据插入未被数据库确认');
      }

      return {
        success: true,
        applicationId: result.insertedId
      };
    } catch (error) {
      console.error('❌ 提交报名失败:', error.message);
      throw error; // 传递错误给接口层
    }
  }
}

module.exports = new RecruitmentModel();
