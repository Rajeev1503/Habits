
const fetchHelper = async (url, method, bodyData)=> {

  if(!bodyData)
  {
    try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "content-type": "application/json",
          }
        });
        const responseData = await response.json();
        if(!response.ok){
          throw new Error("Login failed message fron frontend : " + responseData.message);
        }
        return JSON.stringify(responseData);
        
      } catch (error) {
        console.log("error login try catch : " + error);
        return;
      }
  }
 else {
    try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(bodyData)
        });

        const responseData = await response.json();
        if(!response.ok){
          throw new Error("Login failed message fron frontend : " + responseData.message);
        }

        return JSON.stringify(responseData);
        
      } catch (error) {
        console.log("error login try catch : " + error);
        return;
      }
  }
}

export default fetchHelper;