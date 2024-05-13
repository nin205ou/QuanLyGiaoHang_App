import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ title, onPress, backgroundColor = 'green', styleOptions, disabled=false }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: '100%',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: backgroundColor,
                borderRadius: 5,
                alignItems: 'center',
                ...styleOptions,
                opacity: disabled ? 0.5 : 1
            }}
            disabled={disabled}
        >
            <Text style={{ fontSize: 14, color: 'white' , opacity: disabled ? 0.5 : 1 }}> {title} </Text>
        </TouchableOpacity>
    );
};

export default Button;