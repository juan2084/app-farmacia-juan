import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { colors } from '../constants/colors'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useSignInMutation } from '../services/authService'
import { setUser } from '../features/User/userSlice'
import { useDispatch } from 'react-redux'

const LoginScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const [triggerSignIn, result] = useSignInMutation()
    const [email, setEmail] =  useState()
    const [password, setPassword] = useState()

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(
                setUser({
                    email: result.data.email,
                    idToken: result.data.idToken
                })
            )
        }
    }, [result])
    

    const onSubmit = () => {
        triggerSignIn({email, password})
    }
  return (
    <View style={styles.main}>
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <InputForm
                label={"email"}
                onChange={setEmail}
                error={""}
            />
            <InputForm 
                label={"password"}
                onChange={setPassword}
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