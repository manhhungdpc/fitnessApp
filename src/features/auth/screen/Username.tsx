/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  StyleSheet,
} from 'react-native';


import {TouchableOpacity} from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';

const styles = StyleSheet.create({});
// const UserLoged = (props: any) => {
  // const users = props.users;
  // const dispatch = useDispatch();
  // return (
  //   <View style={styles.UserLogged}>
  //     <View style={styles.LoggedContainer}>
  //       {users.map((_user: any, _index: Number) => {
  //         return (
  //           <View style={styles.profileLoggedContainer}>
  //             <TouchableOpacity
  //               onPress={() => {}}
  //               style={styles.profileLoggedImageContainer}>
  //               <Image
  //                 source={{uri: ''}}
  //                 style={styles.profileLoggedImageContainer}
  //               />
  //               <IconButton
  //                 onPress={() => {}}
  //                 icon="credit-card-remove-outline"
  //                 size={20}
  //                 style={styles.iconRemoveLogged}
  //               />
  //             </TouchableOpacity>
  //             <Text style={styles.phoneText}>{}</Text>
  //           </View>
  //         );
  //       })}
  //     </View>
  //     <TouchableOpacity
  //       onPress={() => props.loginOther(true)}
  //       style={styles.loginOtherAccountContainer}>
  //       <Text style={styles.loginOtherAccount}>
  //         Đăng nhập bằng tài khoản khác
  //       </Text>
  //     </TouchableOpacity>
  //   </View>
  // );
// }


const UserInput = () => {
  return <></>;
};

const UsernameLoginScreen = ({}) => {
  return (<UserInput />);
};



export default UsernameLoginScreen;
