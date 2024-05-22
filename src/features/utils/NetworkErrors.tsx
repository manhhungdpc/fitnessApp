import {
  getNetworkStatus,
  useAppDispatch,
  useAppLanguage,
  useCheckingNetwork,
  useNetworkStatus,
} from '@src/app/redux/appSlice';
import Colors from '@src/resources/Colors';
import React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import {Button, Dialog, Portal, Snackbar} from 'react-native-paper';

const NetworkError = () => {
  const langue = useAppLanguage();
  const networkStatus = useNetworkStatus();
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('@src/resources/animation/dog_walk.gif')}
        style={styles.container}>
        <Portal>
          <Dialog visible={!networkStatus}>
            <Dialog.Icon theme={{colors: {primary: Colors.red}}} icon="alert" />
            <Dialog.Title style={styles.title}>
              {langue.network_not_available}
            </Dialog.Title>
            <Dialog.Content>
              <Button
                theme={{colors: {primary: Colors.green}}}
                icon="wifi"
                mode="contained"
                loading={useCheckingNetwork()}
                onPress={() => {
                  return dispatch(getNetworkStatus());
                }}>
                {!useCheckingNetwork() ? langue.try_check_network : ''}
              </Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
        <Snackbar
          visible={networkStatus}
          onDismiss={() => {}}
          action={{
            label: 'Go home',
            onPress: () => {},
          }}>
          Internet connected
        </Snackbar>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default NetworkError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  content: {
    alignContent: 'center',
    justifyContent: 'center',
  },
});
