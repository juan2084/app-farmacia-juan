import { FlatList, StyleSheet, Text, View } from "react-native"
import { colors } from "../constants/colors"
import CategoryItem from "../components/CategoryItem"
import { useGetCategoriesQuery } from "../services/shopService"


const Home = ({route, navigation}) => {

  const {data: categories, error, isLoading} = useGetCategoriesQuery()


  return (
    <View style={styles.flatListContainer}>
    <FlatList
      keyExtractor={item => item}
      data={categories}
      renderItem={({item}) => (
        <CategoryItem 
          navigation={navigation} 
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
