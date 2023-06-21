export interface Countryy {
    id: string;
    nome: string;
    sigla: string;
    continente: string;
    status: string;
    dataCadastro: Date;

    states?: State[];
};

export interface State {
    id: string;
    nome: string;
    sigla: string;
    status: string;
    dataCadastro: Date;
    countryId?: string;

    cities?: City[];
};

export interface City {
    id: string;
    nome: string;
    status: string;
    dataCadastro: Date;
    stateId?: string;
};

export interface Suppliers {
    fornecedorId: string;
    nome: string;
    razaoSocial: string;
    cnpj: number;
    cep: number;
    numero: number;
    complemento: string;
    status: string;
    dataCadastro: Date;
    observacao: string;
};

export interface Partners {
    fornecedorId: string;
    nome: string;
    razaoSocial: string;
    cnpj: number;
    cep: number;
    numero: number;
    complemento: string;
    status: string;
    dataCadastro: Date;
    observacao: string;
}
