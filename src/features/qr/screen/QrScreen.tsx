import React, {useEffect} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import {fetchQrCode, useQrCode, useQrCodeLoading} from '../action/qrSlice';
import {
  setError,
  useAppDispatch,
  useAppLanguage,
} from '@src/app/redux/appSlice';
import Colors from '@src/resources/Colors';
import {useUser} from '@src/features/auth/action/authSlice';

const QrScreen = () => {
  const qrCode = useQrCode();
  const qrLoading = useQrCodeLoading();
  const dispatch = useAppDispatch();
  const user = useUser();
  const language = useAppLanguage();
  useEffect(() => {
    dispatch(fetchQrCode());
  }, [dispatch]);
  return (
    <ScrollView
      contentContainerStyle={styles.qrCodeContainer}
      refreshControl={
        <RefreshControl
          refreshing={qrLoading}
          onRefresh={() => dispatch(fetchQrCode())}
        />
      }>
      <Button
        icon="account-convert"
        mode="elevated"
        onPress={() => setError('on develop')}
        style={styles.btnReferalContainer}>
        <Text>{language.callToReferral}</Text>
      </Button>
      <Card style={styles.cardContainer}>
        <Card.Content>
          <View style={styles.contentContainer}>
            <Text
              variant="titleMedium"
              adjustsFontSizeToFit={true}
              style={styles.topContent}>
              {language.qrWelcomeText}
            </Text>
            <Text
              variant="titleMedium"
              adjustsFontSizeToFit={true}
              style={styles.fullname}>
              {user?.fullname}
            </Text>
          </View>
          <QRCode
            value={qrCode ? qrCode : 'NA'}
            size={250}
            color="black"
            backgroundColor="white"
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default QrScreen;

const styles = StyleSheet.create({
  qrCodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.danger30,
  },
  cardContainer: {},
  contentContainer: {
    padding: 20,
  },
  fullname: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  bottomContent: {},
  topContent: {
    textTransform: 'uppercase',
    color: Colors.green,
    fontWeight: 'bold',
  },
  btnReferalContainer: {
    position: 'absolute',
    top: 80,
    right: 20,
    backgroundColor: Colors.success90,
    color: Colors.natural90,
  },
});
