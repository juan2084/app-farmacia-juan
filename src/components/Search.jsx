import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import { colors } from "../constants/colors"
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Search = ({ onSearch = () => {}, error = "", goBack = () => {} }) => {
  const [keyword, setKeyword] = useState("")

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          value={keyword}
          onChangeText={setKeyword}
        />
        <Pressable onPress={() => onSearch(keyword)}>
          <Feather name="search" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() =>   setKeyword("") }>
          <MaterialCommunityIcons name="eraser" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      </View>
      <View>
        {error ? <Text style={styles.inputError}>{error}</Text> : null}
      </View>
    </>
   
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  input: {
    width: 250,
    padding: 8,
    fontSize: 18,
    backgroundColor: colors.salmon,
    color: colors.platinum,
    borderRadius: 10,
  },
  inputError: {
    fontSize: 18,
    color: colors.platinum,
    borderRadius: 10,
  },
})
