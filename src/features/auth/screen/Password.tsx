import React, {useEffect, useRef, useState} from 'react';

import {Image, StyleSheet, View} from 'react-native';

import {
  Avatar,
  Button,
  Card,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';

import Video, {VideoRef} from 'react-native-video';
import Colors from '@src/resources/Colors';
import {TextInputLabelProp} from 'react-native-paper/lib/typescript/components/TextInput/types';
import {useAppDispatch, useAppLanguage} from '@src/app/redux/appSlice';
import {
  fetchAccessToken,
  HelpText,
  setUsername,
  useAuthUsername,
  useHelpText,
  UserStatus,
  useUser,
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
  backScreen: ()=>void;
}) => {
  const [textInput, setTextInput] = useState('');

  return (
    <Card style={styles.card}>
      <Card.Title
        title=""
        subtitle=""
        left={() => (
          <IconButton icon="arrow-left" size={30} onPress={props.backScreen} />
        )}
      />
      <Card.Content>
        <View style={styles.logo}>{props.avatar}</View>
        <TextInput
          label={props.label}
          value={textInput}
          onChangeText={setTextInput}
          style={styles.input}
          keyboardType="default"
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <Text style={styles.helpText}>
          {props.help_text !== undefined &&
          props.help_text.password !== undefined
            ? props.help_text.password
            : ''}
        </Text>
        <Button
          icon="account-arrow-right"
          mode="contained"
          disabled={textInput.length < 8}
          onPress={() => props.action(textInput)}>
          Tiếp tục
        </Button>
      </Card.Content>
    </Card>
  );
};

const PasswordLoginScreen = () => {
  const dispatch = useAppDispatch();
  const language = useAppLanguage();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const helpText = useHelpText();

  const username = useAuthUsername() || '';
  const user = useUser();
  useEffect(() => {
    if (isFocused && user !== null && user.status === UserStatus.pending) {
      return navigation.navigate(ScreenNames.CHANGE_PASSWORD_SCREEN);
    }
  }, [isFocused, navigation, user]);

  const actionCheck = (password: string) => {
    return dispatch(fetchAccessToken(username, password));
  };

  const backScreen = () => {
    dispatch(setUsername(null));
    navigation.navigate(ScreenNames.LOGIN_USERNAME_SCREEN);
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.backgroundVideo}>
        <BackgroundVideo />
      </View>
      <View style={styles.form}>
        <UserInput
          avatar={
            <Image
              source={require('@src/resources/images/icons/logopasword.png')}
              style={styles.image}
            />
          }
          label={language.auth.password_title}
          help_text={helpText}
          title={language.auth.password_title}
          action={actionCheck}
          backScreen={backScreen}
        />
      </View>
    </View>
  );
};

export default PasswordLoginScreen;

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
