import React, {Component} from 'react';
import { Select, Form, Input, } from "antd";
const { Option } = Select;
class Addcateory extends Component {
    UNSAFE_componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const {getFieldDecorator}= this.props.form
        //子组件向父组件传递
        return (
              <Form>
                  <Form.Item>
                      {getFieldDecorator('parentId',{
                          initialValue:'0'
                      })(//收集Option的value的值
                          <Select>
                              <Option value="0">一级分类</Option>

                          </Select>
                      )}


                  </Form.Item>
                  <Form.Item>
                      {
                          getFieldDecorator('categoryName',{
                              rules:[
                                  {required:true,message:'分类名称不能为空'}
                              ]
                          })(
                              <Input placeholder="请输入名称"/>
                          )}




                  </Form.Item>
              </Form>
        );
    }
}
export default Form.create()(Addcateory)