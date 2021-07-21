import { View } from 'native-base';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';

type Props = {
    children: any;
    disableSafeAreaView?: boolean;
};

function PageContainer({ children, disableSafeAreaView = false }: Props) {
    return (
        <ImageBackground
            source={require('../assets/images/background-cool.jpg')}
            style={styles.backgroundImage}
            blurRadius={10}
        >
            <View style={styles.children}>
                {disableSafeAreaView ? (
                    children
                ) : (
                    <SafeAreaView style={[styles.container]}>{children}</SafeAreaView>
                )}
            </View>
        </ImageBackground>
    );
}

export default PageContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    children: {
        flex: 1,
        backgroundColor: 'rgba(241, 241, 241, 0.6)',
    },
});
