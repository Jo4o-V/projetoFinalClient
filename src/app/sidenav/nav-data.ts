import { INavbarData } from "../helpers/helper_Sidenav";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'home',
        icon: 'fal fa-home',
        label: 'Home'
    },
    {
        routeLink: 'products',
        icon: 'fal fa-shirt',
        label: 'Produtos',
        items: [
            {
                routeLink: 'products/register-new-product',
                label: 'Novo Produto'
            },
            {
                routeLink: 'products/stock',
                label: 'Estoque Produtos'
            },
            {
                routeLink: 'products/category',
                label: 'Categorias'
            }
        ]
    },
    {
        routeLink: 'rents',
        icon: 'fal fa-file',
        label: 'Aluguéis',
        items: [
            {
                routeLink: 'database/internal/customers',
                label: 'Clientes'
            },
            {
                routeLink: 'rents/register-new-realise',
                label: 'Novo Aluguel'
            },
            {
                routeLink: 'rents/contracts',
                label: 'Contratos'
            }
        ]
    },
    {
        routeLink: 'database',
        icon: 'fal fa-chart-bar',
        label: 'Dados/Info.',
        items: [
            {
                routeLink: 'database/internal',
                label: 'Internos',
                items: [
                    {
                        routeLink: 'database/internal/collaborators',
                        label: 'Colaboradores'
                    },
                    {
                        routeLink: 'database/internal/locations',
                        label: 'Locais'
                    }
                ]
            },
            {
                routeLink: 'database/external',
                label: 'Externos',
                items: [
                    {
                        routeLink: 'database/external/suppliers',
                        label: 'Fornecedores'
                    },
                    {
                        routeLink: 'database/external/partners',
                        label: 'Parceiros'
                    }
                ]
            },
            {
                routeLink: 'database/places',
                label: 'Localidades'
            }
        ]
    },
    {
        routeLink: 'about',
        icon: 'fal fa-cog',
        label: 'Sobre',
        // expanded: true, --> Deixa o submenu inicialmente aberto
        items: [
            {
                routeLink: 'about/help',
                label: 'Ajuda'
            }
        ]
    }
];