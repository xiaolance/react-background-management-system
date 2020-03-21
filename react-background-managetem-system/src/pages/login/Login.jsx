import React, {Component} from 'react';
import './login.less';
import {Form, Icon, Input, Button,message,Select}from'antd';
import {reqLogin}from'../../api/index';
import storageUtils from "../../utiles/storageUtils";
console.log(storageUtils)
class  Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        message.warning('正在登录中请稍等...',.5)
        this.props.form.validateFields(async (err, values) => {
            if (!err){
           const result = await reqLogin(values)
                const {msg,data,status} = result;
                if(status===0){
                    storageUtils.saveUser(data)
                    message.success('用户登录成功',1)
                    this.props.history.push('./admin')

                }else {
                    message.error('登录失败,账号或密码错误',1)
               }
                }

        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-form'>
               <h2 className="login-title">react后台管理系统</h2>
                <Form>
                    <Form.Item>
                        {getFieldDecorator('username',{
                            rules:[
                                {
                                    max:12,message:'用户名最长为12位数'
                                },
                                {
                                    min:5,message: '用户名最小长度为5位数'
                                },
                                {
                                    required:true,message:'用户名不能为空'
                                },
                                {
                                    whitespace:true,message:'用户名不能包含空格'
                                }

                                ]
                        })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />
                        )}

                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('password',{
                            rules: [
                                {
                                    max:12,message:'密码最长为12位数'
                                },
                                {
                                    min:5,message: '密码最小长度为5位数'
                                },
                                {
                                    required:true,message:'密码不能为空'
                                },
                                {
                                    whitespace:true,message:'密码不能包含空格'
                                }
                            ]}
                        )(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        )}

                    </Form.Item>
                    <Form.Item>


                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                            ghost
                            onClick={this.handleSubmit}
                        >
                            Log in
                        </Button>

                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm
