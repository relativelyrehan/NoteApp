import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  Animated,
  PanResponder,
} from 'react-native';
import Dialog from 'react-native-dialog';

const MainPage = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [show, setShow] = useState(false);
  const [val, setVal] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {toValue: {x: 0, y: 0}}).start();
      },
    }),
  ).current;

  const handleNoteSubmit = note => {
    setNotes([...notes, note]);
    setShow(false);
  };

  return (
    <>
      {console.log(panResponder)}
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#000"></StatusBar>
        <View
          style={{
            ...styles.container,
          }}>
          <Text style={styles.heading}>Your Notes</Text>
          {notes.length > 0 ? (
            notes.map(value => {
              return (
                <Animated.View
                  style={{
                    transform: [{translateX: pan.x}],
                  }}
                  {...panResponder.panHandlers}>
                  {console.log(pan.x, pan.y, 'to lowe')}

                  <View
                    style={{
                      backgroundColor: 'rgb(106, 120, 98)',
                      padding: 16,
                      borderRadius: 8,
                      marginTop: 10,
                      marginBottom: 10,
                      width: 300,
                    }}>
                    {console.log(value)}
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '500',
                        fontSize: 18,
                        letterSpacing: 1,
                      }}>
                      {value}
                    </Text>
                  </View>
                </Animated.View>
              );
            })
          ) : (
            <View>
              <Text style={styles.heading}>No New Notes</Text>
              <Image
                source={require('../assets/images/add-notes.png')}
                style={{width: 240, height: 250, resizeMode: 'contain'}}
              />
            </View>
          )}
          <View>
            <Dialog.Container visible={show}>
              <Dialog.Title>Add note</Dialog.Title>
              <Dialog.Input onChangeText={note => setNote(note)}></Dialog.Input>
              <Dialog.Button label="Cancel" onPress={() => setShow(false)} />
              <Dialog.Button
                label="Add"
                onPress={() => handleNoteSubmit(note)}
              />
            </Dialog.Container>
          </View>
          <TouchableOpacity
            title="Press me"
            style={{
              ...styles.primaryButton,
              position: 'absolute',
              bottom: 30,
              right: 10,
              width: 40,
              height: 40,
              borderRadius: 1000,
            }}
            onPress={() => setShow(true)}>
            <Text style={{color: '#fff', fontWeight: '800', fontSize: 24}}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: 'rgb(46,73,137)',
    fontWeight: '800',
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  formField: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C9B693',
    marginTop: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderRadius: 4,
    borderColor: '#9E7777',
  },
  primaryButton: {
    backgroundColor: '#EF79BC',
    marginTop: 10,
    flex: 1,
    maxHeight: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    height: 20,
    width: 250,
  },
});

export default MainPage;
