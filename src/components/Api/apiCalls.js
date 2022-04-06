export const callAPI = async (route, token, body, method = "POST") => {
  // var url = process.env.REACT_APP_API_ENDPOINT + route;
  // console.log("Bodyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",body)
  // console.log("Tokennnnnnnnnnnnnnnnnnnn",token)
  let url = `http://${window.location.hostname}:2025/api/` + route;


  if (body != null) {
    body = JSON.stringify(body);
  }

  //console.log('Calling endpoint: ' + url + " with data: " + body);

  var config = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  if (body != null) {
    config.body = body;
    // console.log("configggggggggggggg bodyyyyy",config.body)
  }

  var Data = await fetch(url, config)
    .then(async (response) => {
      // console.log("##################response",response)
      // console.log("################urllllllllllllllllll",url)
      if (response.ok) return Promise.resolve(response.json());

      return Promise.resolve(response.json()).then((responseInJson) => {
        // This will end up in ERROR part
        
        return Promise.reject(responseInJson.Message);
      });
    })
    .then(function (result) {
      // console.log("API response ==>" + JSON.stringify(result));
      return result;
    })
    .catch(function (error) {
      // console.log("error:" + JSON.stringify(error));
      throw error;
    });
   
  return Data;
};
