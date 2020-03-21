import React, {Component} from 'react';
import {withRouter}from'react-router-dom';
import storageUtils from "../../utiles/storageUtils";
import'./header.less';
import configMenu from'../../config/configMenu';
import { Modal, Button } from 'antd';
import {reqWeather}from'../../api';

const { confirm } = Modal;

 class Header extends Component {
      state ={
          currentTime:new Date().toLocaleString(),
          weatherInfo:{},
      }
     UNSAFE_componentWillMount() {
         this.user = storageUtils.getUser()

     }
        getCurrentTime=()=>{
       this.timer =  setInterval(()=>{
                this.setState({
                    currentTime:new Date().toLocaleString()
                })
        },1000)
 }
    componentWillUnmount() {
          //退出时清除定时器
          clearInterval(this.timer)
    }

     componentDidMount(){
         this.getCurrentTime()
         this.getWeather()
         this.getTitle()

     }
     getWeather = async ()=>{
         const result = await reqWeather('兰州')
         this.setState({weatherInfo:result})
     }
     getTitle =()=>{
          const {pathname} =this.props.location
          // configMenu.filter(item=>{
          //     return pathname === item.key
          // })
         let title =''//先定义标题的空串 箭头函数进入循环遍历
         configMenu.forEach(item=>{
             //如果是从一级菜单的key中找到和pathname一致的
             if(pathname===item.key)title = item.title
             if(item.children){  //如果是从二级菜单的key中找到和pathname一致的
                 const result = item.children.find(cItem=>pathname === cItem.key)
                 if(result) title = result.title
             }

         })
         return title
 }
    loginOut = ()=>{

        confirm({
            title: '您要确定退出吗?',

            content: '退出前请确保您所修改的内容已保存  !',
            onOk:()=> {
                //点击ok执行函数
                //退出时remove存储本地的数据防止手动更改路由造成重新渲染admin组件
                //观察箭头函数的this指向问题 this指向loginOut的实例化对象
                this.props.history.push('./login')
                storageUtils.removeUser()
            },
            onCancel() {
                //点击取消执行函数

            },
        });
    }

    render() {
          const{currentTime,weatherInfo}=this.state
        const {dayPictureUrl,temperature,wind,weather} = weatherInfo

        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎,{this.user.username}</span>
                    <button      onClick={this.loginOut}>退出</button>
                </div>
                <div className='header-bottom'>
                    <span className='header-bottom-left'>{this.getTitle()}</span>

                    <div className='header-bottom-right'>

                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt=""/>
                        <span>{weather}</span>
                        <span>{temperature}</span>
                        <span>{wind}</span>
                    </div>

                </div>
            </div>
        );
    }
}
export default withRouter(Header)