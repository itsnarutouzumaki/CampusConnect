import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import dotenv from 'dotenv';
dotenv.config();

const randomID = (len) =>{
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
const Room = () => {
    const roomId=useParams();
    const name="ssjj"
    const lectureId=",,xkd";
    const role="jjdj"//either host or audience
    const title="lecture title";
    const roleCondition =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : ZegoUIKitPrebuilt.Audience;

      const sharedLinks = [
        {
            name:'Join as Audience',
            url:`${window.location.origin}/room/${roomId}`
        }
      ];

       // generate Kit Token
  const appID = process.env.zegocloud_App_Id ;
  const serverSecret = process.env.zegocloud_Server_Secret;
  const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, randomID(5), title);

   // start the call
   let myMeeting = async (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role:roleCondition,
        },
      },
      sharedLinks,
    });

    const api=axios.put('http://localhost:8000/api/chapterLecture/startMeet',{
        videoUrl:sharedLinks,
        lectureId:lectureId
    },{
        headers: {
            "Content-Type": "application/json"
        }
    });
};
  return (
    <div>
      
    </div>
  )
}

export default Room
