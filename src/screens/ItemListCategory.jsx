import { FlatList, FlatListComponent, StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { colors } from '../constants/colors'
import products from '../data/products.json'
import ProductItem from '../components/ProductItem'
import Search from '../components/Search'
 
const ItemListCategory = ({
  setCategorySelected = () => {},
  navigation, 
  route
}) => {
  
    const [keyWord, setKeyword] = useState("")
    const [productFiltered, setProductFiltered] = useState([])
    const [error, setError] =useState("")

    const {category: categorySelected} = route.params

    useEffect(() => {
      regex = /[^a-zA-Z0-9]/
      const hasDigits = (regex.test(keyWord))

      if(hasDigits) {
        setError("Don't use special characters")
        return
      }

      const productsPrefiltered = products.filter(product => product.category === categorySelected)
      const productFilter = productsPrefiltered.filter(product => product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase()))    
      setProductFiltered(productFilter)
      setError("")
    }, [keyWord, categorySelected])
    



  return (
    <View style = {styles.flatListContainer}>
        <Search error={error} onSearch={setKeyword} goBack={() => navigation.goBack()}/>
        <FlatList
            data = {productFiltered} 
            renderItem = {({item}) => <ProductItem product={item} navigation={navigation}/>}
            keyExtractor = {(producto) => producto.id}
        />
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
    flatListContainer: {
      width: '100%',
      backgroundColor: colors.salmon,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    },
  })