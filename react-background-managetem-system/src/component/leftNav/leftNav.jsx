import React, {Component} from 'react';
import {Menu, Icon, Button,}from'antd';
import {NavLink,withRouter} from "react-router-dom";
import configMenu from'../../config/configMenu';

const { SubMenu } = Menu;
class leftNav extends Component {
     UNSAFE_componentWillMount() {//初始化菜单栏结构
        this.menus = this.getMenus(configMenu)
     }

     getMenus = (menus) => {
         const {pathname} = this.props.location
         return menus.map(item => {
             if (item.children) {
                 const result = item.children.filter(cItem=>pathname===cItem.key)
                 if(result.length){
                     this.defaultOpenKeys =item.key
                 }
                 return <SubMenu
                     key={item.key}
                     title={
                         <span>
                             <Icon type={item.icon}/>
                             <span>{item.title}</span>
                         </span>
                     }
                 >
                     {
                         this.getMenus(item.children)
                     }
                 </SubMenu>
             } else {
                 return <Menu.Item key={item.key}>
                     <NavLink to={item.key}>
                         <Icon type={item.icon}/>
                         <span>{item.title}</span>
                     </NavLink>

                 </Menu.Item>
             }
         })
     }
        render() {
         const {pathname} =this.props.location
         return (
             <Menu
                 defaultSelectedKeys={[pathname]}
                 defaultOpenKeys={['sub1']}
                 mode="inline"
                 theme="dark"
             >
                 {
                     this.menus
                 }
             </Menu>

         );
     }
 }
 export default withRouter(leftNav)
