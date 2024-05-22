import { object, string, ref } from "yup"

export const signupSchema = object().shape({
    email: string().required("El email es obligatorio").email("No es un email válido"),
    password: string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: string()
        .oneOf([ref("password"), null], "La contraseña debe coincidir")
        .required(),
})
