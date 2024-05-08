import { FlatList, StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors"
import CategoryItem from "../components/CategoryItem"
import categories from "../data/categories.json"


const Home = ({setCategorySelected}) => {



  return (
    <View style={styles.flatListContainer}>
    <FlatList
      keyExtractor={item => item}
      data={categories.sort()}
      renderItem={({item}) => (
        <CategoryItem 
          selectCategory={setCategorySelected} 
          category={item}
        />
      )}
    />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%',
    backgroundColor: colors.darkOrange,
    height: '100%',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
})
