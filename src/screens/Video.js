// Load the module
import React from 'react';
import Video from 'react-native-video';
import {StyleSheet} from 'react-native';
const background = require('../assets/apps.mp4');

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

export default VideoPlayer = () => {
  return (
    // <Video
    //   source={{
    //     uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    //   }}
    //   controls={true}
    //   style={styles.backgroundVideo}
    // />

    <Video source={background} controls={true} style={styles.backgroundVideo} />
  );
};
// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
    width: 400,
  },
});
