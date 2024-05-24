import React, { useState } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/User/userSlice";
import AddButton from "../components/AddButton";
import { colors } from "../constants/colors";
import { usePostProfileImageMutation } from "../services/shopService";
// import { saveImage } from "../Features/User/userSlice";

const  ImageSelector = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const { localId } = useSelector((state) => state.auth.value);

    const [triggerPostImage, result] = usePostProfileImageMutation();
    console.log(localId);

    const dispatch = useDispatch();


    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        return granted;
    };
 
    const pickImage = async () => {

        try{
            const permissionCameraOk = await verifyCameraPermissions();

            if (permissionCameraOk) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                    quality: 0.1,
                });
    
                if (!result.canceled) {
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    setImage(image)
                }
            }
        } catch (error) {
            console.log(error)
        }       
    };
    
    const confirmImage = async () => {
        try {
            dispatch(setCameraImage(image));
            triggerPostImage({image, localId})
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
      
    };

    return (
        <View style={styles.container}>
            {image ? (
                <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <AddButton title="Toma una nueva foto" onPress={pickImage} />
                    <AddButton title="Confirmar foto" onPress={confirmImage} />
                </>
            ) : (
                <>
                    <View style={styles.noPhotoContainer}>
                        <Text>No hay foto que mostrar...</Text>
                    </View>
                    <AddButton title="Toma una foto" onPress={pickImage} />
                </>
            )}
        </View>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
    noPhotoContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: colors.platinum,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
