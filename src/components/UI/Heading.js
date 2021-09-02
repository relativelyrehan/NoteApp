import React from 'react';
import {Text, StyleSheet} from 'react-native';

function Heading({children, style}) {
  return <Text style={{...styles.heading, ...style}}>{children}</Text>;
}

const styles = StyleSheet.create({
  heading: {
    color: 'rgb(46,73,137)',
    fontWeight: '800',
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
});

export default Heading;
