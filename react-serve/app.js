const Koa= require('koa');
const Router =require('koa-router');
const static =require('koa-static');

const mongoose =require('mongoose');
const bodyParser =require('koa-bodyparser');
const{CategoryAdd}=require('./controller/category')

//new函数启动
const app= new Koa();
const router = new Router();

//创建用户名结构模型
const Users =require('./schema/userSchema')
app.use(bodyParser());
app.use(static('./public'))
app.use(router.routes())





router.post('/login',async cxt=>{
  //获取用户的密码和用户名
  //根据用户名和密码查找  如果找到了该用户 则登录成功 
  //否则 用户名或者密码不正确
    const {username,password} = cxt.request.body
    const user =await Users.findOne({username,password})
   console.log(user)
   if(user){
     cxt.body ={
       status:0,
       data:user,
       msg:'用户登录成功'
     }
   }else{
     cxt.body ={
       status:1,
       msg:'用户登录失败,账号或密码不正确'
     }
   }
  
})

router.post('/category/add',CategoryAdd)
mongoose.connect('mongodb://localhost:27018/project',{
  useNewUrlParser:true,
  useUnifiedTopology:true

}).then(()=>{
  console.log('数据库链接成功')
  app.listen(6000,()=>{
    console.log('6000端口开启成功')
  })
}).catch(()=>{
  console.log('数据库链接失败')
})