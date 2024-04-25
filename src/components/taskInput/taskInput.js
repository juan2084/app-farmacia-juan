import React from 'react'
import { StyleSheet, TextInput, View, Button } from 'react-native'

const TaskInput = ({textItem, addItem, handleChangeText}) => {
  return (
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            onChangeText={handleChangeText}
            value={textItem}
            placeholder={"Vaciar el contenido..."}
        />
        <Button title="ADD" color="#5555ff" onPress={addItem} />
    </View>
  )
}

export default TaskInput

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "black",
        width: 250,
        fontSize: 16
    }
})