import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { colors } from "../constants/colors";
import SubmitButton from "../components/SubmitButton";
import InputForm from "../components/InputForm";
import { useSignUpMutation } from "../services/authService";
import { setUser } from "../features/User/userSlice";
import { signupSchema } from "../validations/authSchema";


const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [password, setPassword] = useState("");
    const [errorPassword, setErrorPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    const dispatch = useDispatch()
    const [triggerSignUp, result] = useSignUpMutation()

    useEffect(()=> {
        if (result.isSuccess) {
            dispatch(
                setUser({
                    email: result.data.email,
                    idToken: result.data.idToken
                })
            )
        }
    }, [result])

    const  onSubmit = () => {
        try {
            setErrorMail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            const validation = signupSchema.validateSync({email, password, confirmPassword})
            triggerSignUp({email, password, returnSecureToken: true})
        }
        catch (error) {
            console.log(error.message); 

            switch(err.path){
                case "email":
                    setErrorMail(error.message)
                    break;
                case "password":
                    setErrorPassword(error.message)
                    break;
                case "confirmPassword":
                    setErrorConfirmPassword(error.message)
                    break;
                default:
                    break; 
            }
        }

    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Regístrate</Text>
                <InputForm label={"Email"} onChange={setEmail} error={errorMail} />
                <InputForm
                    label={"Contraseña"}
                    onChange={setPassword}
                    error={errorPassword}
                    isSecure={true}
                />
                <InputForm
                    label={"Confirmar contraseña"}
                    onChange={setConfirmPassword}
                    error={errorConfirmPassword}
                    isSecure={true}
                />
                <SubmitButton onPress={onSubmit} title="Enviar" />
                <Text style={styles.sub}>Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.subLink}>Iniciar Sesión</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
        color: colors.black,
    },
    subLink: {
        fontSize: 14,
        color: colors.blue,
    },
});
