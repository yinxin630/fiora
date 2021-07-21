import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';
import { useStore } from '../hooks/useStore';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window');

export default function Loading() {
    const { loading } = useStore().ui;
    if (!loading) {
        return null;
    }

    return (
        <View style={styles.loadingView}>
            <View style={styles.loadingBox}>
                <Spinner color="white" />
                <Text style={styles.loadingText}>{loading}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingView: {
        width: ScreenWidth,
        height: ScreenHeight,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingBox: {
        width: 120,
        height: 120,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 10,
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
    },
});
