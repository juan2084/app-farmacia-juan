import { Platform, SafeAreaView, StatusBar, StyleSheet, } from "react-native"
import { colors } from "./src/constants/colors"
import Navigator from "./src/navigation/Navigator"
import { Provider } from "react-redux"
import store from "./src/store"
import { initSQLiteDB } from "./src/persistence"
import { Alert } from 'react-native';



(async ()=> {
    try {
        const response = await initSQLiteDB()     
    } catch (error) {
        Alert.alert(
            'Error',
            'Hubo un problema al cargar los datos. Por favor, intenta nuevamente más tarde.',
            [{ text: 'OK' }]
          );
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