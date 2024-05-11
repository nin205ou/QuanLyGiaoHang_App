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

export {
    emailValidation,
    phoneValidation,
    passwordValidation,
    cccdValidation,
}