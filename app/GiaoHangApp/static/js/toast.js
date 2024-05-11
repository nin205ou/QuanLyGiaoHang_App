import Toast from 'react-native-toast-message';

const showToast = (message, status, position = 'bottom', options = {}) => {
    Toast.show({
        type: status,
        position: position,
        text1: message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 25,
        ...options
    });
}

export {
    showToast,
    Toast
};