import React, {Component} from 'react';
import {Button, Card, Icon, message, Modal} from "antd";
import logger from "less/lib/less/logger";
import Addcateory from './Addcateory'
import{reqAddCategory} from'../../api'
export default class Category extends Component {
     state ={ visible:false,}

     //展示添加分类的页面
      showAdd= ()=>{
         this.setState(
             {visible:true}
             )
      }
    handleOk =()=>{
            console.log('ok')
            this.form.validateFields(async(err,values)=>{
                if(!err){//如果前台验证就发送数据，分类到数据库
                       const result = await  reqAddCategory(values)
                    console.log(err,result)

                    const {status,data,msg} =result;
                       if(status===0){//添加分类成功
                           message.success(msg)
                           this.setState(
                               {visible:false,}
                           )

                       }else{
                           message.error(msg)
                       }
                }
            })




      }
      //模态框之外的区域
      handleCancel =()=>{
          console.log('cancel')
          this.setState(
              {visible:false,}
          )
      }
    render() {
        const title ='一级分类'
        const output = (
            <Button type='primary' onClick={this.showAdd}>
            <Icon type='plus'></Icon>
                <span>添加按钮</span>
            </Button>
        )
        return (

                <Card title={title} extra={output} style={{ width: '100%' }}>

                        <Modal
                            title="请添加分类"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Addcateory setForm={(form)=>{
                               this.form=form
                            }}/>


                        </Modal>

                </Card>

        );
    }
}

