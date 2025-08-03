const { connectDB } = require('./db');
const { ObjectId } = require('mongodb');

class RecruitmentModel {
  constructor() {
    this.collectionName = 'applications';
  }

  // 提交报名信息
  async submitApplication(applicationData) {
    const db = await connectDB();
    // 添加提交时间
    applicationData.submittedAt = new Date();
    // 设置初始状态
    applicationData.status = 'pending'; // pending, approved, rejected, interviewed
    return db.collection(this.collectionName).insertOne(applicationData);
  }

  // 获取所有报名信息
  async getAllApplications() {
    const db = await connectDB();
    return db.collection(this.collectionName).find({}).sort({ submittedAt: -1 }).toArray();
  }

  // 根据ID获取报名信息
  async getApplicationById(id) {
    const db = await connectDB();
    return db.collection(this.collectionName).findOne({ _id: new ObjectId(id) });
  }

  // 更新报名状态
  async updateApplicationStatus(id, status) {
    const db = await connectDB();
    return db.collection(this.collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );
  }
}

module.exports = new RecruitmentModel();