import { StyleSheet, View } from "react-native"
import Home from "./src/screens/Home"
import { colors } from "./src/constants/colors"
import Header from "./src/components/Header"
import ItemListCategory from "./src/screens/ItemListCategory"
import { useState } from "react"


const App = () => {
    const [categorySelected, setCategorySelected] = useState("")


    return (
        <View style={styles.container}>
            <Header Title='Farmacia Juan'/>
                {!categorySelected? (<Home setCategorySelected={setCategorySelected}/>)
                : (<ItemListCategory categorySelected={categorySelected} setCategorySelected={setCategorySelected}/>)}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        flex: 1,
        backgroundColor: colors.lightOrange,
        alignItems: "center",
        marginTop: 50

    }
})
 
export default App