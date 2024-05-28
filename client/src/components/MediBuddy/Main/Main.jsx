import React, { useContext } from 'react';
import './main.css';
import { assets } from '../../../assests/assets';
import { Context } from './context/context';
import medilogo from '../../../assests/MediBuddy.jpg';
const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSent();
    }
  };

  return (
    <div className='main overflow-hidden font-medium'>
      <div className="nav">
        <p>MediBuddy</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="mainbuddy-container">

        {!showResult ? (
          <>
            <div className="greet">
              <p><span>Hello, Friend</span></p>
              <p>How Can I Help You Today?</p>
            </div>
            <div className="lg:cards hidden lg:flex">
              <div className="card">
                <p>Virtual Doctor Assistance: Users can interact with the chatbot to receive guidance on symptoms, treatments, and preventions.</p>
                <img src={assets.doctor_icon} alt="" />
              </div>
              <div className="card">
                <p>Healthcare Recommendations: Medibuddy provides personalized healthcare recommendations based on input and medical history.</p>
                <img src={assets.healthcare} alt="" />
              </div>
              <div className="card">
                <p>Symptom Assessment: Medibuddy helps users evaluate their health status by asking targeted questions about their symptoms. </p>
                <img src={assets.symptom} alt="" />
              </div>
              <div className="card">
                <p>24/7 Availability: Medibuddy is available 24/7, allowing users to access healthcare information and support anytime, anywhere.</p>
                <img src={assets.t247_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={medilogo} alt="" />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here ...' onKeyDown={handleKeyDown} />
            <div>
              {/* <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" /> */}
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            An IntelliDoc Intellectual Property owned and maintained by Team RansomWare
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
