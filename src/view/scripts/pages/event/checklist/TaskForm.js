import { Button, Form, Input, Row, Col } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { sendCreateTaskPost } from '../../../../../core/event/Tasks/api';
import '../../../../styles/components/tasks.scss'

export default class TaskForm extends React.Component{

  formReference = React.createRef();
    constructor(props){
        super(props);


        this.state = {
            title :  '',
            status : 'To Do',
            eventId :  props.event,
            error : ''
        }

    }

    onChangeTitle = (e) => {
        this.setState(() => ({title: e}))
    }

    onSuccess = ({data}) =>{
      this.onChangeTitle('');
      this.formReference.current.resetFields();
      console.log(this.state.title)
      this.props.onSubmit({
        name : data.name,
        status : data.status,
        assignedMembers : data.assignedMembers,
        id : data.id,
        eventId : data.eventId
    })
    }


    onSubmit = (e) => {

        e.preventDefault();

          if(this.state.title){
            sendCreateTaskPost({Name : this.state.title, EventId : this.state.eventId, Order : 0, Status : 1})
            .then(this.onSuccess)
          }
          else{
              this.setState(() => ({error : 'Please enter a title '}))
          }
          
        }

    render() {
       
        return (

                <Form
                    name="basic"
                    onSubmitCapture={this.onSubmit }
                   ref={this.formReference}
                   className="center-form"
                    >
                   <Row>
                   <Col span={18} offset={1}><Form.Item
                   label="Title"
                   name="Title"
                   rules={[{ required: true, message: this.state.error }]}
               >
                   <Input type='text'
                  //  allowClear={true}
                   placeholder="My task"
                   value={this.state.title}
                   onChange={(e) => {this.onChangeTitle(e.target.value)}}
                   className="get-border-radius get-shadow"
                   />

                  </Form.Item></Col>
                  <Col offset={1}><Form.Item>
                  <Button className="Task-Button-Style" type="primary" htmlType="submit">
                  Submit
                  </Button>
                </Form.Item></Col>
                  </Row>

                    </Form>

        )
    }
}
