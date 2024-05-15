import React, { createContext, useEffect, useState } from 'react';
import Apis, { authApi, endpoints } from "../Apis";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userInfor, setUserInfor] = useState({});

  const login = (username, password, onLoginSuccess, onLoginFailed) => {
    let isErrorOccurred = false;

    Apis.post(endpoints['users'] + "check_accept_shipper/",
      { user_name: username }
      ,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    ).catch(error => {
      isErrorOccurred = true;
      onLoginFailed(error.response.data.message);
    }).finally(() => {
      if (!isErrorOccurred) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('grant_type', 'password');
        formData.append('client_id', 'rGq3uPRLFggk39YZfodGIgGkhF7vsW3ygYXeB1fh');
        formData.append('client_secret', '8aEQfWrX7GPbBQLcxO47N6e1el7c1mCbdA0OvjJOvxTwKyXmJ3Pfp6TGSYH7zgdqfIhPEuXc9GPVbiQP6RqdujEgU8CiZ0g3TQGf77N0Nxp4TmWRuw2o1psnznTaBuZu');

        const configLogin = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };

        Apis.post(endpoints['login'], formData, configLogin)
          .then(async response => {
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
      }
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

  const sendOTP = (email, onSendOTPSuccess, onSendOTPFailed) => {
    const configSendOTP = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    Apis.post(endpoints['otps'], {
      email: email
    }, configSendOTP)
      .then(response => {
        if (response.status === 201) {
          onSendOTPSuccess();
        } else {
          onSendOTPFailed("Gửi mã OTP thất bại!!!");
        }
      }
      ).catch(error => {
        onSendOTPFailed(error.response.data.message);
      });
  }

  useEffect(() => checkLogin, [])

  const authContextValue = {
    userToken,
    userInfor,
    login,
    logout,
    register,
    sendOTP,
    checkLogin
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};