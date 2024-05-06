import { StyleSheet, View } from "react-native"
import Home from "./src/screens/Home"
import { colors } from "./src/constants/colors"
import Header from "./src/components/Header"


const App = () => {
    return (
        <View style={styles.container}>
            <Header Title='Farmacia Juan'/>
                <Home />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        backgroundColor: colors.lightOrange,
        alignItems: "center",
        marginTop: 50

    }
})
 
export default App


// const App = () => {

//     const [textItem, setTextItem] = useState("")
//     const [itemList, setItemList] = useState([])

//     const [modalVisible, setModalVisible] = useState(false)
//     const [itemSelected, setItemSelected] = useState({})

    

//     const handleChangeText = (text) => setTextItem(text)


//     const addItem = () => {
//         setItemList(currentValue => [
//             ...currentValue,
//             { id: Math.random().toString(), value: textItem }
//         ])
//         setTextItem("")
//     }

//     const handleModal = (item) => {
//         setItemSelected(item)
//         setModalVisible(true)
//     }

//     const handleDelete = () => {
//         const filter = itemList.filter(task => task !== itemSelected)
//         setItemList(filter)
//         setModalVisible(false)
//     }

//     const handleCancelModal = () => {
//         setModalVisible(false)
//         setItemSelected({})
//     }

//     return (
//         <View style={styles.container}>
//            <TaskInput
//             textItem={textItem}
//             addItem={addItem}
//             handleChangeText={handleChangeText}
//            />

//             <FlatListCustom
//                 handleModal={handleModal}
//                 itemList={itemList}
//             />

//             <ModalCustom
//                 handleCancelModal={handleCancelModal}
//                 handleDelete={handleDelete}
//                 itemSelected={itemSelected}
//                 modalVisible={modalVisible}
//             />

           
//         </View>
//     )
// }

// export default App;

// const styles = StyleSheet.create({
//     container: {
//         paddingTop: 30,
//         alignItems: "center",
//         backgroundColor: "#888888",
//         flex: 1
//     }
// })