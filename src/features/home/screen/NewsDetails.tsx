import {useAppDispatch} from '@src/app/redux/appSlice';
import React, {useEffect} from 'react';
import {
  fetchNewsDetails,
  useHomeLoading,
  useNewDetails,
} from '../action/homeSlice';
import {VideoPlayer} from '@src/features/utils/RenderHtml';
import {ScrollView, RefreshControl, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const NewDetails = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNewsDetails());
  }, [dispatch]);
  const loading = useHomeLoading();
  const details = useNewDetails();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {
            dispatch(fetchNewsDetails());
          }}
        />
      }>
      <View style={styles.sessionContainer}>
        {details?.videoUrl && (
          <VideoPlayer
            uri={details?.videoUrl}
            poster={
              'https://admin.alphasius.com/static/upload/MVP/Asset%202.png'
            }
          />
        )}
        <View style={styles.p}>
          <Text variant="titleMedium" style={styles.span}>
            {details?.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewDetails;

const styles = StyleSheet.create({
  container: {},
  sessionContainer: {
    padding: 10,
  },
  p: {},
  span: {},
});
