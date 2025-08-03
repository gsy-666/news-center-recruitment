const { connectDB } = require('./db');

class DepartmentModel {
  constructor() {
    this.collectionName = 'departments';
  }

  // 获取所有部门
  async getAllDepartments() {
    const db = await connectDB();
    return db.collection(this.collectionName).find({}).toArray();
  }

  // 根据ID获取部门
  async getDepartmentById(id) {
    const db = await connectDB();
    return db.collection(this.collectionName).findOne({ _id: id });
  }

  // 初始化部门数据
  async initializeDepartments() {
    const db = await connectDB();
    const count = await db.collection(this.collectionName).countDocuments();

    // 如果集合为空，则插入初始数据
    if (count === 0) {
      const departments = [
        {
          name: '网络部',
          icon: 'laptop-code',
          description: '信息学院新闻中心网络部是学院线上宣传与网络运营的核心力量...',
          skills: ['推文策划与撰写技巧', '图文排版与设计', '新媒体运营策略'],
          requirements: ['对新媒体有浓厚兴趣', '会使用排版工具者优先', '有创新思维和策划能力']
        },
        {
          name: '摄影部',
          icon: 'camera',
          description: '运动会的激情、会议的严肃、活动的璀璨……我们用镜头定格这些重要瞬间...',
          skills: ['摄影构图与光影技巧', '图片后期处理（PS）', '新闻摄影的特殊要求'],
          requirements: ['热爱摄影，有审美能力', '了解基础图片处理', '有责任心，能按时完成任务']
        },
        {
          name: '编辑部',
          icon: 'pen-fancy',
          description: '编辑部主要负责各种新闻文案的撰写，用笔尖捕捉精彩的瞬间...',
          skills: ['新闻写作技巧与规范', '采访与沟通技巧', '稿件编辑与校对'],
          requirements: ['具备优秀的文字表达能力', '有较强的逻辑思维能力', '认真细致，有责任心']
        },
        {
          name: '剪辑部',
          icon: 'video',
          description: '想让镜头讲故事？来这里，学长学姐手把手教你剪片技巧...',
          skills: ['视频剪辑软件操作', '字幕制作与配乐', '短视频策划与制作'],
          requirements: ['对视频制作有浓厚兴趣', '会使用剪辑软件者优先', '有创意，懂视觉表达']
        }
      ];

      return db.collection(this.collectionName).insertMany(departments);
    }
  }
}

module.exports = new DepartmentModel();