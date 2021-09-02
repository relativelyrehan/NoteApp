import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export function ButtonPrimary({onPress, children}) {
  return (
    <TouchableOpacity
      title="Press me"
      style={styles.primaryButton}
      onPress={onPress}>
      <Text style={styles.fontStyles}>{children}</Text>
    </TouchableOpacity>
  );
}

export function ButtonSecondary({onPress, children}) {
  return (
    <TouchableOpacity
      title="Press me"
      style={styles.secondaryButton}
      onPress={onPress}>
      <Text style={styles.secondaryFontStyles}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#EF79BC',
    marginTop: 10,
    flex: 1,
    maxHeight: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    height: 20,
    width: 250,
  },
  secondaryButton: {
    marginTop: 10,
    flex: 1,
    maxHeight: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    height: 20,
    width: 250,
  },
  fontStyles: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryFontStyles: {
    color: 'rgb(46,73,137)',
    fontWeight: '700',
    fontSize: 16,
  },
});
