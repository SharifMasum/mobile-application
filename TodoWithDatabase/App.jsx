import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View
  } from 'react-native';
import Realm from "realm";

const App = () => {
    const [items, setItems] = React.useState([]);
    const [itemText, setItemText] = React.useState('');
    const realm = new Realm({
        schema: [{name: 'TodoItem', properties: {text: 'string'}}]
    });

    const addToDoItem = () => {
        if (itemText !== '') {
        realm.write(() => {
            realm.create('TodoItem', {text: itemText});
        });
        setItemText('');
        }
    }

    const removeItem = (id) => {
        realm.write(() => {
        const item = realm.objects('TodoItem').filtered('text == $0', id);
        realm.delete(item);
        });
    }

    // Load items from the database
    React.useEffect(() => {
        const items = realm.objects('TodoItem');
        setItems(items);
        items.addListener(() => {
        setItems([...items]);
        });
        return () => {
        items.removeAllListeners();
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.banner}>
            <Text style={styles.bannerText}>ToDo example with Database</Text>
        </View>
        <View style={styles.adToDo}>
            <TextInput style={styles.adToDoTextInput}
            value={itemText}
            onChangeText={(text) => setItemText(text)}
            placeholder="Write a new todo here" />
            <Button title="Add" style={styles.adToDoButton}
            onPress={addToDoItem} />
        </View>
        <ScrollView style={styles.list}>
            {items.map((item, index) => (
            <View key={index} style={styles.listItem}>
                <Text>*   {item.text}</Text>
                <Text
                style={styles.listItemDelete}
                onPress={() => removeItem(item.text)}>X</Text>
            </View>
            ))}
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    banner: {
        backgroundColor: 'cadetblue',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 10,
      },
      bannerText: {
        color: 'white',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20
      },
    adToDo: {
        flexDirection: 'row',
        padding: 10,
    },
    adToDoTextInput: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    adToDoButton: {
        padding: 10,
    },
    list: {
        color: 'black',
        margin: 2
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        margin: 5
    },
    listItemDelete: {
        marginStart: 10,
        color: 'red',
        fontWeight: 'bold',
    }
});

export default App;