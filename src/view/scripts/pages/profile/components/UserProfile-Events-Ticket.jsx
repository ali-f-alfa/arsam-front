import React, {useState, useEffect} from 'react';
import axios from "axios";
import UserEventsForm from "./ShowUserEventsTicket/UserEventsForm";
import UserTicketsForm from "./ShowUserEventsTicket/UserTicketsForm"
import { Tabs, Button } from 'antd';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { CalendarOutlined ,
  ThunderboltOutlined,
  TeamOutlined,
  ShakeOutlined,
  ContainerOutlined
 } from '@ant-design/icons';





const UserEventsTickets=({user,status})=>{

  const history = useHistory();

  const { TabPane } = Tabs;

  function handelClick(){
    history.replace("/createevent");
  }

  function redirect(){
    // <div className="empty-div"><pre>               </pre></div>
    history.replace("/filter");

  }


  const operations = {
  // left:<Button className="btn2 center-button2" onClick={redirect}>
  //   <svg>
  //     <defs>
  //       <linearGradient id="grad1">
  //         <stop offset="0%" stop-color="#7183f5" />
  //         <stop offset="100%" stop-color="#74ddfc" />
  //       </linearGradient>
  //     </defs>
  //     <rect fill="none" stroke="url(#grad1)"></rect>
  //   </svg>
  //
  //   <span className="center-span">Filter Page</span>
  //
  // </Button>
  // ,
  left:<pre id="not-selectable">                 </pre>
  ,
  right:<Button className="btn2 center-button2" onClick={handelClick}>
    <svg>
      <defs>
        <linearGradient id="grad1">
          <stop offset="0%" stop-color="#7183f5" />
          <stop offset="100%" stop-color="#74ddfc" />
        </linearGradient>
      </defs>
      <rect fill="none" stroke="url(#grad1)"></rect>
    </svg>

    <span className="center-span">Create Event</span>

  </Button>
};

  // function callback(key) {
  // console.log(key);
  // }


  return(
    <div id="user-events-form-components">
      <Tabs defaultActiveKey="1" centered tabBarExtraContent={operations}>

        <TabPane
        tab={
          <div>
            <CalendarOutlined/>
            Events
          </div>
        }
        key="1">
          <UserEventsForm
          events={user.adminInEvents}
          isAdmin={true}
          status={status}
          />
        </TabPane>

        <TabPane
        tab={
          <div>
            <TeamOutlined twoToneColor="#006d75"/>
            Participations
          </div>
        }
        key="2">
          <UserEventsForm
          events={user.inEvents}
          isAdmin={false}
          status={status}
          />
        </TabPane>

        <TabPane
        tab={
          <div>
            <ContainerOutlined/>
            Tickets
          </div>
        }
        key="3">
          <UserTicketsForm
            tickets={user.tickets}
            status={status}
          />
        </TabPane>


      </Tabs>
    </div>
  );
}



const mapStateToProps = (state) => {
    return{
        user: state.profile.user,
        status: state.profile.status
    }
  }

export default connect(mapStateToProps)(UserEventsTickets);
