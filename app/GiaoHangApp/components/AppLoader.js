import React, { Component } from 'react';
import { View, Text } from 'react-native';

const AppLoader = () => {
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       
    },
});

export default AppLoader;