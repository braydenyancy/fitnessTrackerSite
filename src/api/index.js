const baseURL = 'https://fitnesstrac-kr.herokuapp.com/api/2206-FTB-ET-WEB-PT'

export const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username,
            password
          }
        })
      })
  
      const result = await response.json();
  
      return result;
  
    } catch (ex) {
      console.log('error logging in user')
    }
  }
  
  export const registerUser = async (username, password) => {
    try {
      const response = await fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      })
      const result = await response.json();
      return result;
    } catch (error) {
      console.log('error registering user')
    }
  }