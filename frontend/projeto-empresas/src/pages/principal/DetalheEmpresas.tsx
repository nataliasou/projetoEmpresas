import { useParams } from 'react-router-dom';
import { LayoutBase } from '../../shared/layouts';
import { BarraDeFerramentas } from '../../shared/components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { EmpresasService } from '../../shared/services/api/empresas/EmpresasService';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';
import { FormHandles } from '@unform/core';
import { Box, Paper, Grid } from '@mui/material';
import * as yup from 'yup';

interface IFormData {
    nome: string;
    cnpj: string;
    endereco: string;
    telefone: string;
    email: string;
    site: string;
    proprietario: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nome: yup.string().required('Campo é obrigatório').min(4, 'É preciso ter no mínimo 4 caracteres.'),
    cnpj: yup.string().required('Campo é obrigatório').min(14, 'É preciso ter 14 caracteres.').max(14),
    endereco: yup.string().min(10, 'É preciso ter no mínimo 10 caracteres.').default(''),
    telefone: yup.string().min(9, 'É preciso ter 9 caracteres DDD+Número.').max(9).default(''),
    email: yup.string().email('Digite um email válido.').default(''),
    site: yup.string().url('Digite uma url válida').min(4, 'É preciso ter no mínimo 4 caracteres.').default(''),
    proprietario: yup.string().required('Campo é obrigatório').min(4, 'É preciso ter no mínimo 4 caracteres.'),
});

export const DetalheEmpresas: React.FC = () => {
    const { id = 'cadastro' } = useParams<'id'>();

    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        if (id !== 'cadastro') {
            EmpresasService.getById(Number(id))
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/empresas');
                    } else {
                        formRef.current?.setData(result);
                    }
                });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        formValidationSchema.validate(dados, { abortEarly: false })
            .then((dadosValidados) => {
                if (id === 'cadastro') {
                    EmpresasService.create(dadosValidados).then((result) => {
                        if (result instanceof Error) {
                            alert(result.message);
                        } else {
                            console.log(dadosValidados);
                            navigate('/empresas');
                        }
                    });
                } else {
                    EmpresasService.update(Number(id), { empresas_id: Number(id), ...dadosValidados })
                        .then((result) => {
                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                navigate('/empresas');
                            }
                        });
                }
            })
            .catch((errors: yup.ValidationError) => {
                const ValidationErrors: { [key: string]: string } = {};

                errors.inner.forEach(error => {
                    if(!error.path) return;
                    ValidationErrors[error.path] = error.message;
                });

                formRef.current?.setErrors(ValidationErrors);
            });

    };

    const handleDelete = (id: number) => {
        if (confirm('Deseja apagar mesmo?')) {
            EmpresasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado com sucesso!');
                        navigate('/empresas');
                    }
                });
        }
    };

    return (
        <LayoutBase titulo='Cadastro da empresa'>
            <BarraDeFerramentas
                mostrarBotaoSalvar
                mostrarBtnCadastrar={id !== 'cadastro'}
                mostrarBotaoApagar={id !== 'cadastro'}
                mostrarBotaoVoltar

                aoClicarEmSalvar={() => formRef.current?.submitForm()}
                aoClicarEmApagar={() => handleDelete(Number(id))}
                aoClicarEmVoltar={() => navigate('/empresas')}
                aoClicarCadastrar={() => navigate('/empresas/detalhe/cadastro')}
            />


            <Form ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
                    <Grid container direction="column" padding={2} spacing={2}>

                        <Grid item container direction="row" spacing={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <VTextField
                                    fullWidth
                                    label='Nome'
                                    name='nome'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <VTextField
                                    fullWidth
                                    label='CNPJ'
                                    name='cnpj'
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <VTextField
                                    fullWidth
                                    label='Telefone para contato'
                                    name='telefone'
                                />
                            </Grid>
                        </Grid>


                        <Grid item container direction="row" spacing={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <VTextField
                                    fullWidth
                                    label='Endereço'
                                    name='endereco'
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <VTextField
                                    fullWidth
                                    label='E-mail'
                                    name='email'
                                />
                            </Grid>
                        </Grid>

                        <Grid item container direction="row" spacing={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <VTextField
                                    fullWidth
                                    label='Site'
                                    name='site'
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <VTextField
                                    fullWidth
                                    label='Proprietário'
                                    name='proprietario'
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </Form>
        </LayoutBase>
    );
};