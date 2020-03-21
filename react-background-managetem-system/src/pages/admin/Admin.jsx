import React, {Component} from 'react';
import {Layout} from'antd';
import {Redirect,Switch,Route} from'react-router-dom';

import storageUtils from "../../utiles/storageUtils";
import LeftNav from "../../component/leftNav/leftNav";
import Header from "../../component/header/header";
import home from '../../pages/home/home';
import category from "../category/category";
import product from "../product/product";
import User from "../user/user";
import Role from "../role/role";
import bar from "../bar/bar";
import Line from "../line/line";
import Pie from "../pie/pie";


const {  Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    render() {


        const user =storageUtils.getUser();
        if(!user._id){
        return  <Redirect to='/login'/>

        }
        return (
            <Layout style={{height:'100%'}}>
                   <Sider>
                       <LeftNav/>
                   </Sider>
                   <Layout>
                       <Header/>

                       <Content style={{backgroundColor:'#fff',margin:20}}>
                           <Switch>
                               <Route path='/admin/home' component={home} />
                               <Route path='/admin/category' component={category}/>
                               <Route path='/admin/product' component={product}/>
                               <Route path='/admin/user' component={User}/>
                               <Route path='/admin/Role' component={Role}/>
                               <Route path='/admin/charts/bar' component={bar}/>
                               <Route path='/admin/charts/line' component={Line}/>
                               <Route path='/admin/charts/pie' component={Pie}/>
                           </Switch>
                       </Content>
                       <Footer>Footer</Footer>
                   </Layout>
               </Layout>

        );
    }
}
