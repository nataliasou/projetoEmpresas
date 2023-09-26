
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import { useAuthContext } from '../../contexts';
import { useState } from 'react';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().required().email('Digite um email válido'),
    senha: yup.string().required().min(5, 'Digite uma senha válida'),
});

interface ILoginProps {
    children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [emailError, setEmailError] = useState('');
    const [senhaError, setSenhaError] = useState('');

    const handleSubmit = () => {
        loginSchema
            .validate({ email, senha }, { abortEarly: false })
            .then(dadosValidados => {
                login(dadosValidados.email, dadosValidados.senha);
            })
            .catch((errors: yup.ValidationError) => {
                errors.inner.forEach(error => {
                    if (error.path === 'email') {
                        setEmailError(error.message);
                    } else if (error.path === 'senha') {
                        setSenhaError(error.message);
                    }
                });
            });
    };

    if (isAuthenticated) return (
        <> {children} </>
    );


    return (
        <Box width='100vw' height='100vw' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>
                        <Typography variant='h6' align='center'>
                            Login
                        </Typography>
                        <TextField
                            fullWidth
                            label='Email'
                            type='email'
                            value={email}
                            error={!!emailError}
                            helperText={emailError}
                            onKeyDown={() => setEmailError('')}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label='Senha'
                            type='password'
                            value={senha}
                            error={!!senhaError}
                            helperText={senhaError}
                            onKeyDown={() => setSenhaError('')}
                            onChange={e => setSenha(e.target.value)}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Button
                            variant='contained'
                            onClick={handleSubmit}
                        >Entrar</Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
};