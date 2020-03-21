import axios from "axios";
import jsonp from'jsonp';
import {message} from "antd";

import category from "../pages/category/category";
//设置axios的响应体返回格式
axios.interceptors.response.use(res=>res.data);
//暴露请求登录的接口函数
export const reqLogin = (userInfo)=>axios.post('/login',userInfo);


export const reqWeather = (city)=>{
    const url = 'http://api.map.baidu.com/telematics/v3/weather?location='+city+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2&callback=__jp1'
    return new Promise(res=>{
        jsonp(url,{},function(err,data){
            if(data.status==='success'){
                data = data.results[0].weather_data[0]
                res(data)
            }else{  //如果是非法的城市名 就弹窗提示
                message.error('非法的城市名')
                // res('非法的城市名')
            }
        })
    })
}
export const reqAddCategory =categoryInfo=>axios.post('/category/add',categoryInfo)

