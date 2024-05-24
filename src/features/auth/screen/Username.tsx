import React, {useEffect, useRef, useState} from 'react';

import {Image, StyleSheet, View} from 'react-native';

import {Button, Card, Text, TextInput} from 'react-native-paper';

import Video, {VideoRef} from 'react-native-video';
import Colors from '@src/resources/Colors';
import {TextInputLabelProp} from 'react-native-paper/lib/typescript/components/TextInput/types';
import {useAppDispatch, useAppLanguage} from '@src/app/redux/appSlice';
import {
  fetchAccountList,
  HelpText,
  useAuthUsername,
  useHelpText,
} from '../action/authSlice';
import {
  useNavigation,
  useIsFocused,
  NavigationProp,
} from '@react-navigation/native';
import ScreenNames from '@src/app/navigator/ScreenNames';
import {RootStackParamList} from '@src/app/navigator/RootParam';

const BackgroundVideo = () => {
  const videoRef = useRef<VideoRef>(null);
  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.layer} />
      <Video
        source={require('@src/resources/animation/background_video2.mp4')}
        ref={videoRef}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
      />
    </View>
  );
};

const UserInput = (props: {
  title: any;
  label: TextInputLabelProp | undefined;
  help_text: HelpText | undefined;
  avatar: any;
  action: (arg0: string) => void;
}) => {
  const [textInput, setTextInput] = useState('');
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.logo}>{props.avatar}</View>
        <TextInput
          label={props.label}
          value={textInput}
          onChangeText={setTextInput}
          style={styles.input}
          keyboardType="numeric"
          autoCapitalize="none"
        />
        <Text style={styles.helpText}>
          {props.help_text !== undefined &&
          props.help_text.username !== undefined
            ? props.help_text.username
            : ''}
        </Text>
        <Button
          icon="account-arrow-right"
          mode="contained"
          disabled={textInput.length < 9}
          onPress={() => props.action(textInput)}>
          Tiếp tục
        </Button>
      </Card.Content>
    </Card>
  );
};

const UsernameLoginScreen = () => {
  const dispatch = useAppDispatch();
  const language = useAppLanguage();

  const actionCheck = (phone: string) => {
    return dispatch(fetchAccountList(phone));
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const helpText = useHelpText();

  const username = useAuthUsername();

  useEffect(() => {
    if (isFocused && username !== null) {
      return navigation.navigate(ScreenNames.LOGIN_PASSWORD_SCREEN);
    }
  }, [isFocused, navigation, username]);
  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.backgroundVideo}>
        <BackgroundVideo />
      </View>
      <View style={styles.form}>
        <UserInput
          avatar={
            <Image
              source={require('@src/resources/images/icons/app.png')}
              style={styles.image}
            />
          }
          label={language.auth.username_title}
          help_text={helpText}
          title={language.auth.username_title}
          action={actionCheck}
        />
      </View>
    </View>
  );
};

export default UsernameLoginScreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  layer: {
    backgroundColor: Colors.black,
    opacity: 0.6,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    width: '100%',
    height: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  form: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    width: '80%',
    zIndex: 12,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 70,
    height: 70,
  },
  card: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  helpText: {
    fontSize: 12,
    color: Colors.red,
  },
});
