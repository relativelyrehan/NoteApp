import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

const DATA = [
  {
    id: 0,
    title: 'Reset',
  },
  {
    id: '1',
    title: 'Javascript',
  },
  {
    id: '2',
    title: 'Java',
  },
  {
    id: '3',
    title: 'Dart',
  },
];

const Item = ({title, handleClick}) => (
  <TouchableOpacity onPress={() => handleClick(title)} style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const MultiSelect = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [show, setShow] = useState(false);

  const handleClick = val => {
    if (val === 'Reset') {
      setSelectedItems([]);
      return;
    }
    if (selectedItems.indexOf(val) !== -1) return;
    else {
      setSelectedItems([...selectedItems, val]);
    }
  };

  const renderItem = ({item}) => (
    <Item title={item.title} handleClick={handleClick} />
  );

  return (
    <SafeAreaView>
      <View style={styles.inputView}>
        {selectedItems.map((val, key) => (
          <Text style={styles.inputValue} key={key}>
            {val}
          </Text>
        ))}
        <TextInput
          style={{height: 20, width: 280}}
          onChangeText={() => setShow(true)}
          onPressOut={() => setShow(false)}
          onBlur={() => setShow(false)}
          onKeyPress={event =>
            console.log(
              ' ---------------------------',
              event.key,
              '------------------------------',
            )
          }
        />
      </View>
      {show && (
        <View style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#5b010010',
    marginTop: StatusBar.currentHeight || 0,
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#000bbb',
    height: 30,
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  inputValue: {
    fontWeight: '700',
    fontSize: 14,
    marginRight: 4,
  },
  item: {
    padding: 4,
    borderRadius: 4,
    marginVertical: 2,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    color: 'rgb(46,73,137)',
    fontWeight: '800',
  },
});

export default MultiSelect;
