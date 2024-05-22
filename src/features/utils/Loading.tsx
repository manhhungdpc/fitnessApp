import React from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const DefaultLoading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require('@src/resources/animation/dumbell2.json')}
        style={styles.item}
        autoPlay
        loop
      />
    </SafeAreaView>
  );
};

const ListLoading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require('@src/resources/animation/list_loading.json')}
        style={styles.item}
        autoPlay
        loop
      />
    </SafeAreaView>
  );
};

export {DefaultLoading, ListLoading};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '100%',
    height: '100%',
  },
});
