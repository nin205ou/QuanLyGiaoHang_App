import React, { createContext, useEffect, useState } from 'react';
import Apis, { authApi, endpoints } from "../Apis";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const configLogin = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    Apis.post(endpoints['login'], formData, configLogin)
      .then( async response => {
        if (response.data.access_token) {
          setUserToken(response.data.access_token);
          await AsyncStorage.setItem('userToken', response.data.access_token);
          const user = await authApi(response.data.access_token).get(endpoints['current_user']);
          setUserInfor({ userId: user.data.id, userName: user.data.username, role: user.data.role });
          await AsyncStorage.setItem('userInfor', JSON.stringify({ userName: user.data.username, role: user.data.role, userId: user.data.id }));
          onLoginSuccess();
        } else {
          onLoginFailed(response.data);
        }
      }
      ).catch(error => {
        let errorMessage = error.response.data.error_description || error.response.data.error || error.message;
        onLoginFailed(errorMessage);
      });
  };

  const logout = async (onLogoutSuccess, onLogoutFailed) => {
    try {
      setUserToken(null);
      setUserInfor({});
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfor');
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
    const configRegister = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    Apis.post(endpoints['register'], data, configRegister)
      .then(response => {
        if (response.data.id) {
          onRegisterSuccess();
        } else {
          onRegisterFailed("Đăng ký thất bại!!!");
        }
      }
      ).catch(error => {
        let errorMessage = error.response.data.error_description || error.response.data.error || error.message;
        onRegisterFailed(errorMessage);
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