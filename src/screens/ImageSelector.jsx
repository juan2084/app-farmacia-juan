import React, { useState } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ExpoLibrary from "expo-media-library";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/User/userSlice";
import AddButton from "../components/AddButton";
import { colors } from "../constants/colors";
import { useGetProfileImageQuery, usePostProfileImageMutation } from "../services/shopService";


const  ImageSelector = ({ navigation }) => {
    const [image, setImage] = useState(null)
    const [isImageFromCamera, setIsImageFromCamera] = useState(false)
    const [imageURI, setImageURI] = useState(null)

    const { localId } = useSelector((state) => state.auth.value);
    const {data: imageFromBase} = useGetProfileImageQuery(localId)
    const [triggerPostImage, result] = usePostProfileImageMutation();

    const dispatch = useDispatch();

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        return granted;
    };

    const verifyGalleryPermissions = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return granted;
    };
 
    const pickImage = async () => {
        setIsImageFromCamera(true)
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
                    setImageURI(result.assets[0].uri)
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    setImage(image)
                }
            }
        } catch (error) {
            Alert.alert(
                'Error',
                'No tiene permisos para manejar la cámara.',
                [{ text: 'OK' }]
              );
        }       
    };


    const pickLibraryImage = async () => {
        try{
            setIsImageFromCamera(false)
            const permissionLibraryOk = await verifyGalleryPermissions();

            if (permissionLibraryOk) {
                const result = await ImagePicker.launchImageLibraryAsync({
                    base64: true,
                    allowsEditing: true,
                    aspect: [1, 1],
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.1,
                })
               
                if (!result.canceled) {                  
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    setImage(image)
                }
            }
        } catch (error) {
            Alert.alert(
                'Error',
                'No tiene permisos para acceder a la galería.',
                [{ text: 'OK' }]
              );
        }

    }
    
    const confirmImage = async () => {
        try {
            dispatch(setCameraImage(image));
            triggerPostImage({image, localId})
            if (isImageFromCamera) {
                const result = await ExpoLibrary.createAssetAsync(imageURI)
            }
            navigation.goBack()
        } catch (error) {
            Alert.alert(
                'Error',
                'Hubo un problema al intentar guardar la imagen.',
                [{ text: 'OK' }]
              );
        }
      
    };

    return (
        <View style={styles.container}>
            {image || imageFromBase ? (
                <>
                    <Image source={{ uri: image || imageFromBase?.image }} style={styles.image} />
                    <AddButton title="Toma una nueva foto" onPress={pickImage} />
                    <AddButton title="Seleccionar una foto de la galería" onPress={pickLibraryImage} />
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
