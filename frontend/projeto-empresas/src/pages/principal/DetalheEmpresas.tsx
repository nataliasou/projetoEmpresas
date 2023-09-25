import { useParams } from 'react-router-dom';
import { LayoutBase } from '../../shared/layouts';
import { BarraDeFerramentas } from '../../shared/components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { EmpresasService } from '../../shared/services/api/empresas/EmpresasService';
import { LinearProgress } from '@mui/material';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';
import { FormHandles } from '@unform/core';

interface IFormData {
    nome: string;
    cnpj: string;
    endereco: string;
    telefone: string;
    email: string;
    site: string;
    proprietario: string;
}

export const DetalheEmpresas: React.FC = () => {
    const { id = 'cadastro' } = useParams<'id'>();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const formRef = useRef<FormHandles>(null);

    useEffect(() => {
        console.log('oi ' + id);
        if (id !== 'cadastro') {
            EmpresasService.getById(Number(id))
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/empresas');
                    } else {
                        console.log(result);

                        formRef.current?.setData(result);
                    }
                });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);
        if (id === 'cadastro') {
            EmpresasService.create(dados).then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    console.log('oi');
                    alert(result.message);
                } else {
                    navigate('/empresas');
                }
            });
        } else {
            console.log('oiii');
            EmpresasService.update(Number(id), { empresas_id: Number(id), ...dados })
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);

                    } else {
                        navigate('/empresas');
                    }
                });
        }
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

            {isLoading && (
                <LinearProgress variant='indeterminate' />
            )}

            <Form ref={formRef} onSubmit={handleSave}>
                <VTextField placeholder='Nome' name='nome'/>
                <VTextField placeholder='CNPJ' name='cnpj'/>
                <VTextField placeholder='Endereço' name='endereco' />
                <VTextField placeholder='Telefone para contato' name='telefone' />
                <VTextField placeholder='E-mail' name='email' />
                <VTextField placeholder='Site' name='site' />
                <VTextField placeholder='Proprietário' name='proprietario' />

            </Form>
        </LayoutBase>
    );
};