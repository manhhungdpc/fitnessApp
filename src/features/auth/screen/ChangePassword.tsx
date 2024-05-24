import React, {useEffect, useRef, useState} from 'react';

import {Image, StyleSheet, View} from 'react-native';

import {Button, Card, Text, TextInput} from 'react-native-paper';

import Video, {VideoRef} from 'react-native-video';
import Colors from '@src/resources/Colors';
import {TextInputLabelProp} from 'react-native-paper/lib/typescript/components/TextInput/types';
import {useAppDispatch, useAppLanguage} from '@src/app/redux/appSlice';
import {
  changePasswordFirstTime,
  HelpText,
  useAuthUsername,
  useHelpText,
} from '../action/authSlice';

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
  action: (arg0: string, arg1: string, arg2: string) => void;
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.logo}>{props.avatar}</View>
        <TextInput
          label="Mật khẩu hiện tại"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          style={styles.input}
          keyboardType="default"
          autoCapitalize="none"
          secureTextEntry={true}
          left={<TextInput.Icon icon="lock" size={15} />}
          right={<TextInput.Icon icon="eye" size={15} />}
        />
        <Text style={styles.helpText}>
          {props.help_text !== undefined &&
          props.help_text.re_password !== undefined
            ? props.help_text.re_password
            : ''}
        </Text>
        <TextInput
          label="Mật khẩu mới"
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
          keyboardType="default"
          autoCapitalize="none"
          secureTextEntry={true}
          left={<TextInput.Icon icon="form-textbox-password" size={15} />}
          right={<TextInput.Icon icon="eye" size={15} />}
        />
        <Text style={styles.helpText}>
          {newPassword.length < 8 ? 'Mật khẩu ít nhất 8 ký tự' : ''}
        </Text>
        <TextInput
          label="Nhập lại mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          keyboardType="default"
          autoCapitalize="none"
          secureTextEntry={true}
          left={<TextInput.Icon icon="form-textbox-password" size={15} />}
          right={<TextInput.Icon icon="eye" size={15} />}
        />
        <Text style={styles.helpText}>
          {newPassword !== confirmPassword ? 'Mật khẩu mới không khớp' : ''}
        </Text>
        <Button
          icon="account-arrow-right"
          mode="contained"
          disabled={
            currentPassword.length < 8 ||
            newPassword.length < 8 ||
            confirmPassword.length < 8 ||
            newPassword !== confirmPassword
          }
          onPress={() =>
            props.action(currentPassword, newPassword, confirmPassword)
          }>
          Tiếp tục
        </Button>
      </Card.Content>
    </Card>
  );
};

const ChangePasswordScreen = () => {
  const dispatch = useAppDispatch();
  const language = useAppLanguage();
  const username = useAuthUsername() || '';

  const actionCheck = (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    return dispatch(
      changePasswordFirstTime(
        currentPassword,
        newPassword,
        confirmPassword,
        username,
      ),
    );
  };

  const helpText = useHelpText();

  useEffect(() => {}, []);
  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.backgroundVideo}>
        <BackgroundVideo />
      </View>
      <View style={styles.form}>
        <UserInput
          avatar={
            <Image
              source={require('@src/resources/images/icons/change_password.jpg')}
              style={styles.image}
            />
          }
          label={language.auth.password_title}
          help_text={helpText}
          title={language.auth.password_title}
          action={actionCheck}
        />
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

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
    width: 40,
    height: 40,
  },
  card: {
    padding: 16,
  },
  input: {
    marginBottom: 10,
    height: 45,
  },
  button: {
    marginTop: 16,
  },
  helpText: {
    fontSize: 12,
    color: Colors.red,
  },
});
