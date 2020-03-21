//引入分类模型
const Categorys = require('../schema/categorySchema')

exports.CategoryAdd = async cxt=>{
    const {categoryName,parentId} = cxt.request.body
    const result = await Categorys.findOne({name:categoryName})
    console.log(result)
    if(result){ //如果找到了 就提示分类名称重复
        cxt.body = {
            status:1,
            msg:'该分类名称重复'
        }
    }else{      //如果没有找到该分类 就添加该分类
        const category = await Categorys.create({name:categoryName,parentId})
        cxt.body = {
            status:0,
            data:category,
            msg:'添加分类成功',
        }
    }
}