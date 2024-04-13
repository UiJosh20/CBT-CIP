import * as yup from 'yup'

export const verifyTokenSchema = yup.object({
    token: yup.string().required('Please enter token')
    .max(6, 'Password must be 6 characters')
});