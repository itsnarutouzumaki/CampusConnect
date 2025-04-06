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
  // const roomId = useParams().roomId;
  // const lectureID = useParams().lectureID;
  const { roomId, lectureID } = useParams();
  const location = useLocation();
  const containerRef = useRef(null);

  const searchParams = new URLSearchParams(location.search);
  const name = location.state?.name || searchParams.get('name') || 'Guest';
  const role = location.state?.role || searchParams.get('role') || 'Audience';
  
  const roleCondition = role === 'host' ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience;

  const sharedLinks = [
    {
      name: 'Join as Audience',
      url: `${window.location.origin}/teacher/room/${roomId}/${lectureID}?name=${name}&role=Audience`
    }
  ];
  

  const appID = Number(import.meta.env.VITE_ZegoCloud_AppID);
  const serverSecret = import.meta.env.VITE_Zegocloud_Server_secret;
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID, serverSecret, roomId, randomID(5), name
  );

  useEffect(() => {
    let zp;

    const myMeeting = async () => {
      zp = ZegoUIKitPrebuilt.create(kitToken);
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

      try {
        if(lectureID){
        const response = await axios.put('/api/chapterLecture/startMeet', {
          videoUrl: sharedLinks[0].url,
          lectureId: lectureID
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log("Lecture updated successfully", response.data);
        }
      } catch (error) {
        console.error("Error calling startMeet API:", error.message);
      }
    };

    myMeeting();

    return () => {
      if (zp) {
        zp.leaveRoom();
        console.log("Left Zego room");
      }
    };
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
