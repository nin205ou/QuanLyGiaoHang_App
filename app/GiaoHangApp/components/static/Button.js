import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ title, onPress, backgroundColor = 'green', styleOptions }) => {
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
                ...styleOptions
            }}
        >
            <Text style={{ fontSize: 14, color: 'white' }}> {title} </Text>
        </TouchableOpacity>
    );
};

export default Button;