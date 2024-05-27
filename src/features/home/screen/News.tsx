import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  fetchNewsList,
  News,
  setDetailId,
  setNews,
  setPage,
  useHomeLoading,
  useHomeMaxPages,
  useHomePage,
  useNewsList,
} from '../action/homeSlice';
import {useAppDispatch} from '@src/app/redux/appSlice';
import {DefaultLoading} from '@src/features/utils/Loading';
import {Card, Icon, MD2Colors, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@src/app/navigator/RootParam';
import ScreenNames from '@src/app/navigator/ScreenNames';
import {getImageWithBaseUrl} from '@src/base/common';

const Item = (props: {item: News}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootStackParamList>();

  const onPress = () => {
    dispatch(setDetailId(props.item.id));
    navigation.navigate(ScreenNames.NEW_DETAILS);
  };
  return (
    <Card onPress={() => onPress()}>
      <Card.Cover source={{uri: getImageWithBaseUrl(props.item.introImage)}} />
      <Card.Content>
        <Text style={styles.itemTitle} variant="titleMedium">
          {props.item.name}
        </Text>
        <Icon source={'newspaper-check'} size={30} color={MD2Colors.green400} />
      </Card.Content>
    </Card>
  );
};

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const NewsScreen = () => {
  const dispatch = useAppDispatch();
  const news = useNewsList();
  const loading = useHomeLoading();
  const page = useHomePage();
  const maxPage = useHomeMaxPages();
  const [onScroll, setOnScroll] = useState(false);

  useEffect(() => {
    dispatch(setNews([]));
    dispatch(setPage(1));
    dispatch(fetchNewsList(1));
  }, [dispatch, page]);

  const renderItem = useCallback(
    ({item}: {item: News}) => <Item item={item} />,
    [],
  );

  const handleEndReached = useCallback(() => {
    if (page < maxPage && onScroll) {
      dispatch(setPage(page + 1));
      dispatch(fetchNewsList(page + 1));
    }
  }, [page, maxPage, onScroll, dispatch]);
  const handleRefresh = useCallback(() => {
    dispatch(setNews([]));
    dispatch(setPage(1));
    dispatch(fetchNewsList(1));
  }, [dispatch]);

  return (
    <FlatList
      data={news}
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

export default NewsScreen;

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
