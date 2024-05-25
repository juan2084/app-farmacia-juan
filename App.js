import { Platform, SafeAreaView, StatusBar, StyleSheet, } from "react-native"
import { colors } from "./src/constants/colors"
import { useFonts } from "expo-font"
import Navigator from "./src/navigation/Navigator"
import { Provider } from "react-redux"
import store from "./src/store"
import { initSQLiteDB } from "./src/persistence"


(async ()=> {
    try {
        const response = await initSQLiteDB()
        console.log({responseCreatingDB: response});
        console.log("DB initialized");
    } catch (error) {
        console.log({errorCreatingDB: error});
    }
})()







const App = () => {
 
    return (      
        <SafeAreaView style={styles.container}>
            <Provider store={store}>
                <Navigator/>
            </Provider>
        </SafeAreaView>
      )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: colors.lightOrange,
    },
})
 
export default App