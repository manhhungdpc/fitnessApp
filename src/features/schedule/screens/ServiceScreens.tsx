import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@src/app/navigator/RootParam';
import ScreenNames from '@src/app/navigator/ScreenNames';
import {useAppDispatch} from '@src/app/redux/appSlice';
import {getImageWithBaseUrl} from '@src/base/common';
import {ItemSeparator} from '@src/features/home/screen/News';
import {DefaultLoading} from '@src/features/utils/Loading';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Card, MD2Colors, Text} from 'react-native-paper';
import {
  fetchSchedules,
  fetchServices,
  Service,
  setPage,
  setScheduleId,
  setServices,
  useScheduleLoading,
  useScheduleMaxPages,
  useSchedulePage,
  useServices,
} from '../actions/scheduleSlice';

const Item = (props: {item: Service}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootStackParamList>();

  const onPress = () => {
    dispatch(setScheduleId(props.item.id));
    dispatch(fetchSchedules());
    const timer = setTimeout(() => {
      navigation.navigate(ScreenNames.SCHEDULE_SCREEN);
      clearTimeout(timer);
    }, 100);
  };
  return (
    <Card onPress={() => onPress()}>
      {props.item && props.item.cover && (
        <Card.Cover source={{uri: getImageWithBaseUrl(props.item.cover)}} />
      )}
      <Card.Content>
        <Text style={styles.itemTitle} variant="titleMedium">
          {props.item.name}
        </Text>
        {/* <Icon source={'calendar-check'} size={30} color={MD2Colors.green400} /> */}
      </Card.Content>
    </Card>
  );
};

const ServiceScreen = () => {
  const dispatch = useAppDispatch();
  const services = useServices();
  const loading = useScheduleLoading();
  const page = useSchedulePage();
  const maxPage = useScheduleMaxPages();
  const [onScroll, setOnScroll] = useState(false);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch, page]);

  const renderItem = useCallback(
    ({item}: {item: Service}) => <Item item={item} />,
    [],
  );

  const handleEndReached = useCallback(() => {
    if (page < maxPage && onScroll) {
      dispatch(setPage(page + 1));
      dispatch(fetchServices());
    }
  }, [page, maxPage, onScroll, dispatch]);
  const handleRefresh = useCallback(() => {
    dispatch(setPage(1));
    dispatch(setServices([]));
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <FlatList
      data={services}
      renderItem={renderItem}
      keyExtractor={(item, __idx) => item.id.toString()}
      ListEmptyComponent={<DefaultLoading />}
      onScrollBeginDrag={() => setOnScroll(true)}
      onScrollEndDrag={() => setOnScroll(false)}
      onEndReachedThreshold={0.1}
      horizontal={false}
      numColumns={1}
      onEndReached={handleEndReached}
      onRefresh={handleRefresh}
      refreshing={loading}
      showsVerticalScrollIndicator={false}
      style={styles.listContainer}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  separator: {height: 10},
  listContainer: {
    flex: 1,
    backgroundColor: MD2Colors.blueGrey700,
    paddingLeft: 20,
    paddingRight: 20,
  },
  itemTitle: {
    marginTop: 10,
  },
});
