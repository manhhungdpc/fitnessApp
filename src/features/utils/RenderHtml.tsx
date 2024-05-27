import React from 'react';

import {StyleSheet, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';
import Video from 'react-native-video';
import {
  setError,
  setMediaPlaying,
  useAppDispatch,
  useMediaPlaying,
} from '@src/app/redux/appSlice';
import Dimens from '@src/resources/Dimens';
import { MD2Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  eventDetail: {
    fontSize: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'justify',
  },
  videoContainer: {
    width: '100%',
    backgroundColor: 'black',
    minHeight: 200,
    marginBottom: 8,
    marginTop: 8,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

function pausePlayingMedia(
  source: any,
  playingSource: any,
  isFocused: boolean,
) {
  if (!isFocused) {
    return true;
  }
  return source !== playingSource;
}

export function VideoPlayer(props: {uri: any; poster: string | undefined}) {
  const mediaPlaying = useMediaPlaying();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  return (
    <View style={styles.videoContainer}>
      <Video
        source={{
          uri: props.uri,
          headers: {
            'Content-Type': 'video/mp4',
          },
        }}
        ref={ref => {
          this.player = ref;
        }}
        onBuffer={() => {}}
        onError={error => {
          dispatch(setError(error));
        }}
        style={styles.backgroundVideo}
        bufferConfig={{
          minBufferMs: 10000,
          maxBufferMs: 15000,
          bufferForPlaybackMs: 1500,
          bufferForPlaybackAfterRebufferMs: 2500,
        }}
        fullscreen={true}
        controls={true}
        paused={pausePlayingMedia(props.uri, mediaPlaying, isFocused)}
        poster={props.poster}
        minLoadRetryCount={5}
        onProgress={() => {
          if (mediaPlaying !== props.uri) {
            dispatch(setMediaPlaying(props.uri));
          }
        }}
      />
    </View>
  );
}

export default function CustomHtmlRender(props: {
  content: any;
  tagsStyles: any;
  classesStyles: any;
  customHTMLElementModels: any;
  renderers: any;
  contentWidth: number | undefined;
}) {
  let content = props.content;
  const tagsStyles = {
    h1: {
      color: MD2Colors.lightGreen600,
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'justify',
    },
    h2: {
      color: MD2Colors.lightGreen600,
      fontWeight: 'bold',
      fontSize: 22,
      textAlign: 'justify',
    },
    h3: {
      color: MD2Colors.lightGreen600,
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'justify',
    },
    h4: {
      color: MD2Colors.lightGreen600,
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'justify',
    },
    p: {
      color: '#333333',
      fontSize: 17,
      textAlign: 'justify',
      fontWeight: '500',
    },
    span: {
      color: '#333333',
      fontSize: 17,
      textAlign: 'justify',
      fontWeight: '500',
    },
    img: {
      maxWidth: '100%',
      marginBottom: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    a: {
      color: MD2Colors.brown300,
    },
    ...props.tagsStyles,
  };
  const classesStyles = {
    'text-center': {
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    'text-justify': {
      textAlign: 'justify',
    },
    ...props.classesStyles,
  };

  const customHTMLElementModels = {
    video: HTMLElementModel.fromCustomModel({
      tagName: 'video',
      mixedUAStyles: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        backgroundColor: 'blue',
      },
      contentModel: HTMLContentModel.block,
    }),
    ...props.customHTMLElementModels,
  };

  const renderers = {
    video: VideoRender,
    ...props.renderers,
  };

  return (
    <RenderHtml
      source={{html: content}}
      contentWidth={
        props.contentWidth ? props.contentWidth : Dimens.screenWidth
      }
      tagsStyles={tagsStyles}
      enableExperimentalMarginCollapsing={true}
      classesStyles={classesStyles}
      customHTMLElementModels={customHTMLElementModels}
      renderers={renderers}
    />
  );
}

const VideoRender = (tnode: any) => {
  return (
    <VideoPlayer
      uri={tnode.domNode.attribs.src}
      poster={tnode.domNode.attribs.poster}
    />
  );
};
