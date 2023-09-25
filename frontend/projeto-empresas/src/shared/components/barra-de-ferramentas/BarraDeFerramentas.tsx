import { Box, Button, Icon, Paper, TextField, useTheme, Typography } from '@mui/material';

interface IBarraDeFerramentasProps {
    textoBusca?: string;
    mostrarBtnCadastrar?: boolean;
    mostrarInputBusca?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;

    aoMudarTextBusca?: (novoTexto: string) => void;
    textoBtnCadastrar?: string;

    aoClicarCadastrar?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
}
export const BarraDeFerramentas: React.FC<IBarraDeFerramentasProps> = ({
    textoBusca = '',
    mostrarInputBusca = false,
    aoMudarTextBusca,
    textoBtnCadastrar = 'Cadastrar',
    mostrarBtnCadastrar = true,

    mostrarBotaoVoltar = false,
    mostrarBotaoApagar = false,
    mostrarBotaoSalvar = false,

    aoClicarCadastrar,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
}) => {
    const theme = useTheme();

    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            alignItems="center"
            height={theme.spacing(5)}
            component={Paper}
        >
            {mostrarInputBusca && (<TextField
                size="small"
                value={textoBusca}
                onChange={(e) => aoMudarTextBusca?.(e.target.value)}
                placeholder='Procurar empresa'
            />)}


            <Box flex={1} display="flex" justifyContent="end">
                {mostrarBtnCadastrar && (<Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    onClick={aoClicarCadastrar}
                    startIcon={<Icon>add</Icon>}
                >{textoBtnCadastrar}
                </Button>)}

                {(mostrarBotaoSalvar) && (
                    <Button
                        color='primary'
                        disableElevation
                        variant='contained'
                        onClick={aoClicarEmSalvar}
                        startIcon={<Icon>save</Icon>}
                    >
                        <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            Salvar
                        </Typography>
                    </Button>
                )}

                {(mostrarBotaoApagar) && (
                    <Button
                        color='primary'
                        disableElevation
                        variant='outlined'
                        onClick={aoClicarEmApagar}
                        startIcon={<Icon>delete</Icon>}
                    >
                        <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            Apagar
                        </Typography>
                    </Button>
                )}

                {(mostrarBotaoVoltar) && (
                    <Button
                        color='primary'
                        disableElevation
                        variant='outlined'
                        onClick={aoClicarEmVoltar}
                        startIcon={<Icon>arrow_back</Icon>}
                    >
                        <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                            Voltar
                        </Typography>
                    </Button>
                )}
            </Box>

        </Box>
    );
};