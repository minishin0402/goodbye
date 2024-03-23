import React, { Component, useState, createRef, useEffect } from "react";
import axios from "axios";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import ChatList from "../chatList/ChatList";

export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  chatItms = [
    {
      key: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "어 안녕하세요?",
    },

  ];

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  setChatList = async(typ, msgTxt) => {
    this.chatItms.push({
      key: this.chatItms.length+1,
      type: typ,
      msg: msgTxt,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    });

    this.setState({ chat: [...this.chatItms] });
    this.scrollToBottom();
  };
  resChat = async (msg) => {
    console.log(msg)
    try {
      const response = await axios.post("http://good-bye.kro.kr/api/target/chat/", {
        seq: "2",
        chat: msg,
      });
      console.log("굳:");
      console.log(response);
      let resMsg = response.data.receivedChat;
      console.log(resMsg);
      if (resMsg != "") {
        console.log(resMsg);
        this.setChatList("other", resMsg); // 'this'를 바인딩하기 위해 화살표 함수로 변경
      }
    } catch (error) {
      // 오류발생시 실행
      console.log(error);
    }
  };

   componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        
        if (this.state.msg != "") {
          this.setChatList("", this.state.msg);
          this.resChat(this.state.msg);
          console.log("완료");
        
          this.setState({ msg: "" });
        }
      }
    });
    this.scrollToBottom();
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
              <p>Tim Hover</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.msg}
            />
            <button className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
