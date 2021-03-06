import { Tooltip, Comment, Avatar, Form, Button, Input } from "antd";
import moment from "moment";
import React, { useEffect, useState} from "react";
import { Spin, Typography, Row, Col } from "antd";
import ReplyModal from './ReplyModal';
import { addComment, getComments } from "../../../../../../core/api/actions/EventActions";
import CommentList from './CommentList';
import Editor from './Editor';

const { TextArea } = Input;





const Comments = (props) => {

  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    props.dispatch(
      getComments
      ({
        payload:{
          eventId: props.eventId,
          tokenId: localStorage.getItem("userToken")
        }
      })
    )

  }, []);


  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);


      props.dispatch(
        addComment
        (
          {
            payload:{
              tokenId: localStorage.getItem("userToken"),
              data:
              {
              EventId: props.eventId,
              Description: value
              }
            }
          }
        )
      );


    setSubmitting(false);
    setValue("");

  };

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
  };



  function getRandomColor(firstLetter) {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(firstLetter.charCodeAt(0) * i + 14) % 16];
    }
    return color;
  }

  // console.log("props:",props);
  // console.log("com",com);
  return (
    <div>

    <div id="outer-component">
      <div id="comment-components">

      <CommentList
      addCommentStatus={props.event.addCommentStatus}
      addReplyStatus={props.event.addReplyStatus}
      getCommentStatus={props.event.getCommentStatus}
      comments={props.event.comments}
      dispatch={props.dispatch}
      eventId={props.eventId}/>

      </div>
    </div>

    {(props.userToken!==undefined && props.userToken!=="" && props.userToken!==null)?
      <Comment
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
      :
      <div></div>
    }
    </div>
  );
};
export default Comments;
