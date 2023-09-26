import { Api } from '../axios-config';


export interface IEmpresa {
    empresas_id: number;
    nome: string;
    cnpj: string;
    endereco: string;
    telefone: string;
    email: string;
    site: string;
    proprietario: string;
}

type TEmpresasTotal = {
    data: IEmpresa[];
    totalCount: number;
}

const getAll = async (): Promise<TEmpresasTotal | Error> => {
    try {
        const { data } = await Api.get('/empresas');

        if (data) {
            return data;
        }

        return new Error('Erro ao listar as empresas.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao listar as empresas.');
    }
};

const getById = async (empresas_id: number): Promise<TEmpresasTotal | Error> => {
    try {
        const { data } = await Api.get(`/empresas/${empresas_id}`);

        if (data) {
            return data;
        }

        return new Error('Erro ao consultar a empresa.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao consultar a empresa.');
    }
};

const create = async (dados: Omit<IEmpresa, 'empresas_id'>): Promise<number | Error> => {
    try {
        const formData = new FormData();
        formData.append('nome', dados.nome);
        formData.append('cnpj', dados.cnpj);
        formData.append('endereco', dados.endereco);
        formData.append('telefone', dados.telefone);
        formData.append('email', dados.email);
        formData.append('site', dados.site);
        formData.append('proprietario', dados.proprietario);

        const { data } = await Api.post<IEmpresa>('/empresas', formData);
        if (data) {
            return data.empresas_id;
        }

        return new Error('Erro ao criar o cadastro da empresa.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o cadastro da empresa.');
    }
};

const update = async (empresas_id: number, dados: IEmpresa): Promise<void | Error> => {
    try {
        await Api.put(`/empresas/${empresas_id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o cadastro da empresa.');
    }
};

const deleteById = async (empresas_id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/empresas/${empresas_id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao deletar o cadastro da empresa.');
    }
};


export const EmpresasService = {
    getAll,
    getById,
    create,
    update,
    deleteById,
};