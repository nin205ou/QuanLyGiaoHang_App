import React, { useState } from 'react';
import { TextInput } from 'react-native';

const InputSingle = (props) => {
    const [value, setValue] = useState('');

    const onChangeText = (text) => {
        setValue(text);
        if (props.onChangeText) {
            props.onChangeText(text);
        }
    };

    return (
        <TextInput
            placeholder={props.placeholder}
            style={props.style}
            value={value}
            onChangeText={onChangeText}
        />
    );
};

export default InputSingle;
