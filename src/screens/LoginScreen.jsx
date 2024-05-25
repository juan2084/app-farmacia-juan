import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { colors } from '../constants/colors'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useSignInMutation } from '../services/authService'
import { setUser } from '../features/User/userSlice'
import { useDispatch } from 'react-redux'
import { insertSession } from '../persistence'

const LoginScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const [triggerSignIn, result] = useSignInMutation()
    const [email, setEmail] =  useState()
    const [password, setPassword] = useState()
    

    useEffect(() => {
        if (result?.data && result.isSuccess) {
            insertSession({
                email: result.data.email,
                localId: result.data.localId,
                token: result.data.idToken,
            })
                .then((response) => {
                    dispatch(
                        setUser({
                            email: result.data.email,
                            idToken: result.data.idToken,
                            localId: result.data.localId,
                        })
                    )
                })
                .catch((err) => {
                    console.log(err)
                })
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
                label={"Email"}
                onChange={setEmail}
                error={""}
            />
            <InputForm 
                label={"Contraseña"}
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