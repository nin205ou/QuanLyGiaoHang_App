import React, { createContext, useEffect, useState } from 'react';
import Apis, { authApi, endpoints } from "../Apis";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userInfor, setUserInfor] = useState({});

  const login = (username, password, onLoginSuccess, onLoginFailed) => {

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('grant_type', 'password');
    formData.append('client_id', 'AENcdHOHsUoIgOSKLSNtH5pIZbbJzWhLodGkgCRt');
    formData.append('client_secret', 'GxDX99jOIbBwIeS0YmsSlKV0ltFrO1ZrxUIcV8nhUffz8qA7jd6ouLH1lCkBWU8aSU08qlB2dDhpndKdg6Rb2e9NyQER4MimQyndabuJNGVToplN9jMLh8Rq9bFTOlrm');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    Apis.post(endpoints['login'], formData, config)
      .then(response => {
        console.log(response.data);
        if (response.data.access_token) {
          setUserToken(response.data.access_token);
          setUserInfor({ username });
          AsyncStorage.setItem('userToken', response.data.access_token);
          AsyncStorage.setItem('userInfor', JSON.stringify({ username }));
          onLoginSuccess();
        } else {
          console.log(response.error);
          onLoginFailed("Login failed");
        }
      }
      ).catch(error => {
        onLoginFailed(error.message);
      });
  };

  const logout = (onLogoutSuccess, onLogoutFailed) => {
    try {
      setUserToken(null);
      setUserInfor({});
      AsyncStorage.removeItem('userToken');
      AsyncStorage.removeItem('userInfor');
      onLogoutSuccess();
    } catch (error) {
      onLogoutFailed(error.message);
    }
  };

  const checkLogin = () => {
    AsyncStorage.getItem('userToken').then(token => {
      if (token) {
        setUserToken(token);
      }
    });

    AsyncStorage.getItem('userInfor').then(infor => {
      if (infor) {
        setUserInfor(JSON.parse(infor));
      }
    });
  }

  const register = (data, onRegisterSuccess, onRegisterFailed) => {
    console.log(data);
    Apis.post(endpoints['register'], data, {
      headers: {
        "Content-Type": 'multipart/formdata'
      }
    })
      .then(response => {
        console.log(response);
        // onRegisterSuccess();
        if (response.data.id) {
        } else {
          console.log(response.error);
          onRegisterFailed("Register failed");
        }
      }
      ).catch(error => {
        onRegisterFailed(error.message);
      });
  }

  useEffect(() => checkLogin, [])

  const authContextValue = {
    userToken,
    userInfor,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};