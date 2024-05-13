const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const phoneValidation = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
}

const passwordValidation = (password) => {
    return password.length >= 6;
}

const cccdValidation = (cccd) => {
    if (cccd.length === 0) {
        return "Vui lòng nhập số CCCD";
    }

    if (cccd.length !== 12) {
        return "Số CCCD phải có 12 chữ số";
    }

    const regex = /^[0-9]{9,12}$/;
    if (!regex.test(cccd)) {
        return "Số CCCD chỉ được phép chứa số";
    }

    return 'Validated';
}

const priceValidation = (price) => {
    if (price == 0) {
        return "Vui lòng nhập giá";
    }

    const regex = /^[0-9]+$/;
    if (!regex.test(price)) {
        return "Giá chỉ được phép chứa số";
    }

    if (price < 1000) {
        return "Giá quá thấp. Vui lòng nhập giá cao hơn";
    }

    if (price > 10000000) {
        return "Giá quá cao. Vui lòng nhập giá thấp hơn";
    }

    return 'Validated';
}

const otpValidation = (otp) => {
    if (otp.length === 0) {
        return "Vui lòng nhập mã OTP";
    }

    if (otp.length !== 6) {
        return "Mã OTP phải có 6 chữ số";
    }

    const regex = /^[0-9]{6}$/;
    if (!regex.test(otp)) {
        return "Mã OTP chỉ được phép chứa số";
    }

    return 'Validated';
}

const userNameValidation = (userName) => {
    if (userName.length === 0) {
        return "Vui lòng nhập tên đăng nhập";
    }

    if (userName.length < 6) {
        return "Tên đăng nhập phải có ít nhất 6 ký tự";
    }

    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(userName)) {
        return "Tên đăng nhập không được chứa khoảng trắng hoặc ký tự đặc biệt";
    }

    return 'Validated';

}

export {
    emailValidation,
    phoneValidation,
    passwordValidation,
    cccdValidation,
    priceValidation,
    otpValidation,
    userNameValidation
}