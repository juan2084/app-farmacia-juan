import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'

const LoginScreen = ({navigation}) => {
    const onSubmit = () => {

    }
  return (
    <View style={styles.main}>
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <InputForm
                label={"email"}
                onChange={()=>{}}
                error={""}
            />
            <InputForm 
                label={"password"}
                onChange={()=>{}}
                error={""}
                isSecure={true}
            />
            <SubmitButton 
                onPress={onSubmit}
                title = "Ingresar"
            />
            <Text style={styles.sub}>Aún no tienes cuenta?</Text>
            <Pressable onPress={()=> navigation.navigate('Signup')}>
                <Text style={styles.subLink}>Regístrate</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.platinum,
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        // fontFamily: 'Josefin'
    },
    sub: {
        fontSize: 14,
        color: 'black',
    },
    subLink: {
        fontSize: 14,
        color: 'blue',
    }
})