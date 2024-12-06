import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    Button,
    } from 'react-native';

import NativeLocalStorage from './specs/NativeLocalStorage';

const EMPTY = '<empty>';

function App(): React.JSX.Element {
    const [value, setValue] = React.useState<string | null>(null);

    const [editingValue, setEditingValue] = React.useState<string | null>(null);

    React.useEffect(() => {
        const storedValue = NativeLocalStorage?.getItem('myKey');
        setValue(storedValue ?? '');
    }, []);

    function saveValue() {
        NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
        setValue(editingValue);
    }

    function clearAll() {
        NativeLocalStorage?.clear();
        setValue('');
    }

    function deleteValue() {
        NativeLocalStorage?.removeItem(editingValue ?? EMPTY);
        setValue('');
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Text style={styles.text}>
            Current stored value is: {value ?? 'No Value'}
            </Text>
            <TextInput
                placeholder="Enter the text you want to store"
                style={styles.textInput}
                onChangeText={setEditingValue}
            />
            <Button title="Save" onPress={saveValue} />
            <Button title="Clear All" onPress={clearAll} />
            <Button title="Delete Value" onPress={deleteValue} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        margin: 10,
        },
    textInput: {
        margin: 10,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
        },
    });

export default App;
