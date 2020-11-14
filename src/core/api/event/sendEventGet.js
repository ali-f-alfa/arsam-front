import { sendGetRequest } from "../api";

const sendEventGet = ({eventId, tokenId}) => {
  return sendGetRequest({
      url: `https://localhost:44373/api/event/get?id=${eventId}`,
      headers: {
        'Authorization': `Bearer ${tokenId}`
    }})
}

export default sendEventGet;