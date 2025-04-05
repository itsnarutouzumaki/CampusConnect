import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const randomID = (len = 5) => {
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

function Room() {
  const title = "Live Class";
  const roomId = useParams().roomId;
  const lectureID=useParams().lectureID;
  const location = useLocation();
  const containerRef = useRef(null);

//  const lectureId = "67e786a82c5de1d375bc1aa4";
  const { name = 'Guest', role = 'Audience' } = location.state || {};
  const roleCondition = role === 'host' ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience;

  const sharedLinks = [
    {
      name: 'Join as Audience',
      url: `${window.location.origin}/room/${roomId}`
    }
  ];

  const appID = Number(import.meta.env.VITE_ZegoCloud_AppID);
  const serverSecret = import.meta.env.VITE_Zegocloud_Server_secret;
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID, serverSecret, roomId, randomID(5), name
  );

  useEffect(() => {
    const myMeeting = async () => {
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: containerRef.current,
        sharedLinks,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role: roleCondition,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
            showAudioVideoSettingsButton: true,
            showScreenSharingButton: true,
            showTextChat: true,
            showUserList: true
          }
        }
      });

      //  Call API after joining room
      try {
        const response = await axios.put('/api/chapterLecture/startMeet', {
          videoUrl: sharedLinks[0].url,
          lectureId: lectureID
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log("Lecture updated successfully", response.data);
      } catch (error) {
        console.error("Error calling startMeet API:", error.message);
      }
    };

    myMeeting();
  }, []);

  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}

export default Room;
