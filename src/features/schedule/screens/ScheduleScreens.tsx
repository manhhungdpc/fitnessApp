import {useAppDispatch} from '@src/app/redux/appSlice';
import {ItemSeparator} from '@src/features/home/screen/News';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Card, MD2Colors, Text} from 'react-native-paper';
import {
  fetchSchedules,
  Schedule,
  setPage,
  setSchedule,
  useScheduleLoading,
  useScheduleMaxPages,
  useSchedulePage,
  useSchedules,
} from '../actions/scheduleSlice';

const timeSchedule = (time: string) => {
  const point = time.split(' - ');
  return (
    <View style={styles.timeContainer}>
      <Text variant="titleSmall">{point[0]}</Text>
      <Text variant="titleSmall">{point[1]}</Text>
    </View>
  );
};

const Item = (props: {item: Schedule}) => {
  return (
    <Card>
      <Card.Title title={`${props.item.day} ${props.item.date}`} />
      <Card.Content>
        {props.item.schedules.map((schedule, __idx) => {
          return (
            <Card style={styles.cardCourse} key={__idx}>
              <Card.Title
                title={schedule.name}
                subtitle={`${schedule.pt}\n${schedule.details}`}
                subtitleNumberOfLines={2}
                left={() => timeSchedule(schedule.time)}
              />
            </Card>
          );
        })}
      </Card.Content>
    </Card>
  );
};

const ScheduleScreen = () => {
  const dispatch = useAppDispatch();
  const schedules = useSchedules();
  const loading = useScheduleLoading();
  const page = useSchedulePage();
  const maxPage = useScheduleMaxPages();
  const [onScroll, setOnScroll] = useState(false);

  useEffect(() => {
    dispatch(fetchSchedules());
  }, [dispatch, page]);

  const renderItem = useCallback(
    ({item}: {item: Schedule}) => <Item item={item} />,
    [],
  );

  const handleEndReached = useCallback(() => {
    if (page < maxPage && onScroll) {
      dispatch(setPage(page + 1));
      dispatch(fetchSchedules());
    }
  }, [page, maxPage, onScroll, dispatch]);
  const handleRefresh = useCallback(() => {
    dispatch(setPage(1));
    dispatch(setSchedule([]));
    dispatch(fetchSchedules());
  }, [dispatch]);

  return (
    <FlatList
      data={schedules}
      renderItem={renderItem}
      keyExtractor={(item, __idx) => __idx.toString()}
      ListEmptyComponent={<Text>Chưa có dữ liệu</Text>}
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

export default ScheduleScreen;

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
  cardCourse: {
    marginBottom: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  timeContainer: {
    padding: 0,
    width: 80,
  },
});
