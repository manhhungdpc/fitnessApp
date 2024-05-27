import {useAppDispatch} from '@src/app/redux/appSlice';
import {getImageWithBaseUrl} from '@src/base/common';
import {logout, useUser} from '@src/features/auth/action/authSlice';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, IconButton, Text} from 'react-native-paper';

// const avatar = (uri: string) => <Avatar.Image source={{uri: uri}} size={100} />;

const ProfileScreen = () => {
  const user = useUser();
  const dispatch = useAppDispatch();
  return (
    <Card>
      <View style={styles.container}>
        <Avatar.Image
          source={{uri: getImageWithBaseUrl(user?.profilePicture || '')}}
          size={100}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{user?.fullname}</Text>
          <Text style={styles.subtitle}>{user?.phone}</Text>
        </View>
      </View>
      <Card.Content>
        <View>{/* Your card content goes here */}</View>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="logout" onPress={() => dispatch(logout())} />
      </Card.Actions>
    </Card>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    marginRight: 16, // Adjust margin as needed
  },
  textContainer: {
    flex: 1, // Take up remaining space
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  iconButton: {
    marginLeft: 'auto',
  },
});
