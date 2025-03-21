import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try{
    const response = await fetch('/auth/login', {
      method:'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if(!response.ok){
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }
    const data = await response.json();
    return data
  }catch (err){
    alert('Error from login')
    return Promise.reject('Could not fetch user data')
  }
}

const createUser = async (userInfo: UserLogin) => {
  try{
    const response = await fetch('/auth/createUser', {
      method:'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(userInfo)
    });
    if(!response.ok){
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }
    const data = await response.json();
    return data
  }catch (err){
    alert('Username taken')
    console.log('Error from create user: ', err)
    return Promise.reject('Could not fetch user data')
  }
}

export { login, createUser };
