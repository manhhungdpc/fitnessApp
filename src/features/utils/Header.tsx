import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useUser} from '../auth/action/authSlice';
import {Text} from 'react-native-paper';
import {ImageWithBaseUrl} from './Image';
import Colors from '@src/resources/Colors';

const Avatar = () => {
  const user = useUser();
  return (
    <View style={styles.avatarContainer}>
      {user && user.profilePicture && (
        <ImageWithBaseUrl url={user.profilePicture} />
      )}
      {!user ||
        (!user.profilePicture && (
          <Image
            source={require('@src/resources/images/icons/profile.jpg')}
            style={styles.image}
          />
        ))}
    </View>
  );
};

const NameTag = () => {
  const user = useUser();
  return (
    <View style={styles.nameTagContainer}>
      <Text style={styles.fullname}>{user?.fullname}</Text>
      <Text style={styles.phone}>{user?.phone}</Text>
    </View>
  );
};

const Header1 = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSide}>
        <View style={styles.headerAvatar}>
          <Avatar />
        </View>
        <View style={styles.headerNametag}>
          <NameTag />
        </View>
      </View>
    </View>
  );
};

const Header2 = () => {
  return (
    <View style={styles.headerContainer}>
      <Avatar />
    </View>
  );
};

export {Header1, Header2};

const styles = StyleSheet.create({
  image: {},
  avatarContainer: {},
  nameTagContainer: {},
  headerContainer: {
    height: '20%',
    backgroundColor: Colors.ready10,
    alignItems: 'baseline',
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
  headerAvatar: {
    flex: 1,
  },
  headerNametag: {
    flex: 3,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'baseline',
    padding: 20,
  },
  fullname: {},
  phone: {},
  leftSide: {
    width: '70%',
    flexDirection: 'row',
  },
});
