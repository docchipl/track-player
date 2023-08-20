import axios from "axios";

export default function ServiceGDRIVE(id) {
  const request = axios
    .get(`https://drive.google.com/file/d/${id}/preview`, {
      headers: {
        Referer: `https://drive.google.com/file/d/${id}/preview`,
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    .then(function (response) {
      const {request, status} = response;

      if(status === 200 && request.host && request.host === "accounts.google.com"){
        return {
          status: 403,
          message: "Request access only video.",
        };
      }

      if(status === 200){
        return {
          status: 200,
          message: "Source exists",
        };
      }


    })
    .catch((error) => {
      const {response} = error;

      if(response.status === 404){
        return {
          status: 410,
          message: "Source removed by administrators",
        };
      }

    });

  return request;
}
