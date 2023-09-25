import { BarraDeFerramentas } from '../../shared/components';
import { LayoutBase } from '../../shared/layouts';
import { useEffect, useState } from 'react';
import { IEmpresa, EmpresasService } from '../../shared/services/api/empresas/EmpresasService';
import { Icon, IconButton, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, LinearProgress } from '@mui/material';
import { Enviroment } from '../../shared/enviroment';
import { useNavigate } from 'react-router-dom';


export const Principal: React.FC = () => {

    const [rows, setRows] = useState<IEmpresa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        EmpresasService.getAll()
            .then((result) => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                    return;
                }

                console.log(result);
                setRows(result.data);
                setTotalCount(result.totalCount);
            });
    }, []);

    const handleDelete = (id: number) => {
        if (confirm('Deseja apagar mesmo?')) {
            EmpresasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setRows(oldRows => {
                            return [
                                ...oldRows.filter(oldRow => oldRow.empresas_id !== id),
                            ];
                        });
                        alert('Registro apagado com sucesso!');
                    }
                });
        }
    };

    return (
        <LayoutBase
            titulo='Gerenciamento de Empresas'
            barraDeFerramentas={(
                <BarraDeFerramentas
                    aoClicarCadastrar={() => navigate('/empresas/detalhe/cadastro')}
                />
            )}
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome da Empresa</TableCell>
                            <TableCell>CNPJ</TableCell>
                            <TableCell>Endereço</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Site</TableCell>
                            <TableCell>Proprietário</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.empresas_id}>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(row.empresas_id)}><Icon>delete</Icon></IconButton>
                                    <IconButton onClick={() => navigate(`/empresas/detalhe/${row.empresas_id}`)}><Icon>edit</Icon></IconButton>
                                </TableCell>
                                <TableCell>{row.nome}</TableCell>
                                <TableCell>{row.cnpj}</TableCell>
                                <TableCell>{row.endereco}</TableCell>
                                <TableCell>{row.telefone}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.site}</TableCell>
                                <TableCell>{row.proprietario}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Enviroment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading &&
                            <TableRow>
                                <TableCell colSpan={8}>
                                    (
                                    <LinearProgress variant='indeterminate' />
                                    )
                                </TableCell>
                            </TableRow>
                        }
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBase>
    );
};