import React from 'react';
import {FasterImageView} from '@candlefinance/faster-image';
import {StyleSheet} from 'react-native';
import {getImageWithBaseUrl} from '@src/base/common';

const ImageWithBaseUrl = (props: {url: string; borderRadius?: number | 0}) => {
  return (
    <FasterImageView
      style={styles.image}
      onSuccess={() => {}}
      onError={() => {}}
      source={{
        transitionDuration: 0.3,
        borderRadius: 0,
        cachePolicy: 'discWithCacheControl',
        showActivityIndicator: true,
        url: getImageWithBaseUrl(props.url),
      }}
    />
  );
};

export {ImageWithBaseUrl};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
