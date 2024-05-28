import React, { useContext, useState } from "react";
import "./sidebar.css";
import { assets } from "../../../../assests/assets";
import { Context } from "../context/context";

const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const {onSent,prevPrompt,setRecentPrompt,newChat} = useContext(Context)

  const loadPrompt = async (prompt) =>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={()=>setExpand(prev=>!prev)} className="menu" src={assets.menu_icon} alt="" />
        <div className="new-chat" onClick={()=>newChat()}>
          <img src={assets.plus_icon} alt="" />
          {expand ? <p>New Chat</p> : null}
        </div>
        {expand ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item,index)=>{
                return(
                    <div onClick={()=>loadPrompt(item)} className="recent-entry">
                        <img src={assets.message_icon} alt="" />
                        <p>{item.slice(0,18)} ...</p>
                    </div>
                )
            })}
            
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {expand ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {expand ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {expand ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
