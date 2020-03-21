const mongoose =  require('mongoose')

//设置用户表的数据格式
const categorySchema = new mongoose.Schema({
   name:String, //分类的名字
   parentId:{       //如果是'0' 表示是一级分类 如果不是'0' 就是二级分类
       type:String,
       default:'0'
   }
})

//project 数据库下的categorys  使用categorySchema
module.exports = mongoose.model('categorys',categorySchema)