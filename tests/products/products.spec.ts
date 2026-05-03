import { test, expect } from '../../fixtures/auth.fixture';
import dadosCadastro from '../../data/json/products/produtos_dados_cadastro.json';
import dadosExclusao from '../../data/json/products/produtos_dados_exclusao.json';
import dadosEspecificos from '../../data/json/products/produtos_dados_especificos.json';
import daosAtualizacao from '../../data/json/products/produtos_dados_atualizacao.json';
import dadosFiltros from '../../data/json/products/produtos_dados_filtros.json';
import dadosMidia from '../../data/json/products/produtos_dados_midia.json';

import { validarStatusEMensagem } from '../../utils/commons.assertion';
import { validarStatus } from '../../utils/commons.assertion';
import { validarContentTypeJson } from '../../utils/commons.assertion';

import { validarProdutoCriado } from '../../utils/product.assertion';
import { validarProdutoPersistido } from '../../utils/product.assertion';

import { listarProdutos } from '../../services/product.service';
import { criarProduto } from '../../services/product.service';
import { allure } from 'allure-playwright';


test.describe('Gestão de Catálogo de Produtos', () => {

    test.describe('Criação de Novos Produtos', () => {
        test('Deve cadastrar produto com retorno de dados registrados', async ({ request, authToken }) => {
            const cenario = dadosCadastro.valido;
            //  gera valor único (evita conflito de nome/sku)
            const timestamp = Date.now();

            const dados = {
                ...cenario.dados,
                name: `Produto ${timestamp}`,
                sku: `SKU-${timestamp}`
            };
            const response = await criarProduto(request, authToken, dados);

            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
            validarProdutoCriado(body);
        });
        test('Deve validar estrutura do produto criado', async ({ request, authToken }) => {
            const cenario = dadosCadastro.valido;

            //  gera valor único (evita conflito de nome/sku)
            const timestamp = Date.now();

            const dados = {
                ...cenario.dados,
                name: `Produto ${timestamp}`,
                sku: `SKU-${timestamp}`
            };

            const response = await criarProduto(request, authToken, dados);

            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
            validarProdutoCriado(body);
            validarProdutoPersistido(body, dados);

        });
        test('Deve validar erro de preço negativo', async ({ request, authToken }) => {
            const cenario = dadosCadastro.preco_negativo;

            const response = await criarProduto(request, authToken, cenario.dados);

            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });
        test('Deve validar produto já cadastrado', async ({ request, authToken }) => {
            const cenario = dadosCadastro.produto_duplicado;

            const response = await criarProduto(request, authToken, cenario.dados);

            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });
        test('Deve validar produto null no cadastro', async ({ request, authToken }) => {
            const cenario = dadosCadastro.produto_null;

            const response = await criarProduto(request, authToken, cenario.dados);

            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);

            validarContentTypeJson(response)


        });
        test('Deve impedir produto com sku duplicado', async ({ request, authToken }) => {
            const cenario = dadosCadastro.sku_duplicado;

            const response = await criarProduto(request, authToken, cenario.dados);

            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });
        test('Deve impedir criar um produto com sku não informado', async ({ request, authToken }) => {
            const cenario = dadosCadastro.sku_inexistente;

            const response = await request.post('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });
        test('Deve impedir criar um produto com fornecedor inexistente', async ({ request, authToken }) => {
            const cenario = dadosCadastro.fornecedor_inexistente;

            const response = await request.post('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });
        test('Deve impedir criar um produto com categoria inexistente', async ({ request, authToken }) => {
            const cenario = dadosCadastro.categoria_inexistente;

            const response = await request.post('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });

    });

    test.describe('Consulta e Busca de Produtos ', () => {
        test('Deve permitir a listagem de produtos com paginação simples', async ({ request, authToken }) => {

            const response = await listarProdutos(request, authToken, {
                page: 1,
                limit: 10
            });

            validarStatus(response, 200)
        })

        test('Deve filtrar produtos por múltiplos critérios simultaneamente', async ({ request, authToken }) => {

            const response = await listarProdutos(request, authToken, {
                page: 1,
                limit: 3,
                search: 'mochila',
                category_id: 2,
                supplier_id: 7
            });
            validarStatus(response, 200)

            const body = await response.json();
            console.log('Produtos retornados', response.body);
        });
        test('Deve exibir as informações de categorias e fornecedores vinculados aos produtos', async ({ request, authToken }) => {

            const response = await listarProdutos(request, authToken, {
                category_id: 2,
                supplier_id: 7
            });
            validarStatus(response, 200)

            const body = await response.json();
            console.log('Produtos retornados', body.data);
        });
        test('Deve permitir a ordenação de produtos por múltiplos campos (nome, preço, estoque)', async ({ request, authToken }) => {
        });
        test('Deve validar aninhamento de categorias e fornecedores', async ({ request, authToken }) => {

            const cenario = dadosEspecificos.produto_existente

            const response = await request.get(`products/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            })

            expect(response.status()).toBe(cenario.esperado.status)

            const body = await response.json()

            // mensagem de sucesso
            expect(body.mensagens).toContain(cenario.esperado.mensagem)

            // campos principais
            expect(body.data).toHaveProperty('id')
            expect(body.data).toHaveProperty('name')
            expect(body.data).toHaveProperty('sku')
            expect(body.data).toHaveProperty('price')
            expect(body.data).toHaveProperty('stock_quantity')

            // objetos aninhados
            console.log('Categoria:', body.data.categories.name)
            console.log('Fornecedor:', body.data.suppliers.company_name)

            expect(body.data.categories.name.length).toBeGreaterThan(0)
            expect(body.data.suppliers.company_name.length).toBeGreaterThan(0)

            // tipos dos aninhados
            expect(typeof body.data.categories.name).toBe('string')
            expect(typeof body.data.suppliers.company_name).toBe('string')



        });
        test('Deve validar um produto conhecido de uma lista existente', async ({ request, authToken }) => {

            const cenario = dadosEspecificos.produto_existente

            const response = await request.get(`products/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` }
            })

            expect(response.status()).toBe(cenario.esperado.status)

            const body = await response.json()

            // mensagem de sucesso
            expect(body.mensagens).toContain(cenario.esperado.mensagem)

            // campos principais
            expect(body.data).toHaveProperty('id')
            expect(body.data).toHaveProperty('name')
            expect(body.data).toHaveProperty('sku')
            expect(body.data).toHaveProperty('price')
            expect(body.data).toHaveProperty('stock_quantity')

            // objetos aninhados
            console.log('Categoria:', body.data.categories.name)
            console.log('Fornecedor:', body.data.suppliers.company_name)

            expect(body.data.categories.name.length).toBeGreaterThan(0)
            expect(body.data.suppliers.company_name.length).toBeGreaterThan(0)

            // tipos dos aninhados
            expect(typeof body.data.categories.name).toBe('string')
            expect(typeof body.data.suppliers.company_name).toBe('string')



        });

    });

    test.describe('Atualização de Produtos ', () => {
        test('Deve garantir a atualização total dos dados de um produto existente', async ({ request, authToken }) => {
            const productId = 357;
            const response = await request.put(`products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                data: {
                    name: 'Produto Via Playwright',
                    price: 1000,
                    stock_quantity: 1000,
                    sku: 'NOV-098',
                    category_id: 10,
                    supplier_id: 10
                }
            });

            const body = await response.json();

            expect(response.status()).toBe(400);
            // Garante que o nome que você enviou é o que a API salvou e retornou
            expect(body.data.name).toBe('Produto Via Playwright');
            expect(body.data.price).toBe(1000);
            // Valida se a mensagem de sucesso está presente e correta
            expect(body.mensagens[0]).toBe('Produto atualizado com sucesso!');

            // Garante que a API continua retornando os dados do fornecedor e categoria vinculados
            expect(body.data.categories).toHaveProperty('name');
            expect(body.data.suppliers).toHaveProperty('company_name');


        })
        test('Deve permitir a atualização parcial de campos específicos', async ({ request, authToken }) => {

            const productId = 363;

            const response = await request.patch(`products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                data: {
                    "stock_quantity": 2000
                }

            });

            expect(response.status()).toBe(404);

            const body = await response.json();
            expect(body.mensagens[0]).toBe('Produto atualizado com sucesso!');


        });
        test('Deve regerar o slug do produto apenas quando o nome for alterado', async ({ request, authToken }) => {
        });
        test('Deve validar a unicidade de SKU e nome durante a atualização', async ({ request, authToken }) => {
        });
    });

    test.describe('Exclusão de Produtos', () => {
        test.skip('Deve remover um produto permanentemente e validar sua inexistência', async ({ request, authToken }) => {

            const productId = 380;

            const response = await request.delete(`products/${productId}`, {
                headers: { authorization: `Bearer ${authToken}` },
            });

            expect(response.status()).toBe(404);

            // A Prova Real
            const check = await request.get(`products/${productId}`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            expect(check.status()).toBe(500);

        });
        test('Deve retornar erro 404 ao tentar remover um produto que não existe', async ({ request, authToken }) => {
        });

        test('Deve validar exclusão informando id inexistente', async ({ request, authToken }) => {
            const cenario = dadosExclusao.produto_inexistente
            const response = await request.delete(`products/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });
    });

    test.describe('Listagem de Produtos', () => {
        test('Deve retornar produtos paginados no limite definido de 4 itens', async ({ request, authToken }) => {
            const cenario = dadosFiltros.produtos_paginados

            const response = await request.get('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                params: cenario.params
            });
            expect(response.status()).toBe(cenario.esperado.status);

            const body = await response.json();
            // retornou exatamente o que foi pedido
            expect(body.data.length).toBe(4)


            // metadados de paginação presentes
            expect(body.pagination).toHaveProperty('page')
            expect(body.pagination).toHaveProperty('total')
            expect(body.pagination).toHaveProperty('limit')

            validarStatusEMensagem(response, body, cenario.esperado);


        });

        test('Deve retornar produtos da segunda página e no limite definido de 4 itens', async ({ request, authToken }) => {
            const cenario = dadosFiltros.produtos_segunda_pagina

            const response = await request.get('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                params: cenario.params
            });
            expect(response.status()).toBe(cenario.esperado.status);

            const body = await response.json();
            // retornou exatamente o que foi pedido
            expect(body.data.length).toBe(4)
            // metadados de paginação presentes
            expect(body.pagination).toHaveProperty('page')
            expect(body.pagination).toHaveProperty('total')
            expect(body.pagination).toHaveProperty('limit')
            validarStatusEMensagem(response, body, cenario.esperado);
            // página correta
            expect(body.pagination.page).toBe(2)
            expect(body.pagination.limit).toBe(4)
        });

        test('Deve retornar produtos da categoriade ID 10', async ({ request, authToken }) => {
            const cenario = dadosFiltros.produtos_categoria10

            const response = await request.get('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                params: cenario.params
            });
            expect(response.status()).toBe(cenario.esperado.status);

            const body = await response.json();

            // metadados de paginação presentes
            expect(body.pagination).toHaveProperty('page')
            expect(body.pagination).toHaveProperty('total')
            expect(body.pagination).toHaveProperty('limit')

            body.data.forEach((produto: any) => {
                expect(produto.category_id).toBe(cenario.params.category_id)
            })
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });

        test('Deve retornar produtos do fornecedor de ID 10', async ({ request, authToken }) => {
            const cenario = dadosFiltros.produtos_fornecedor10

            const response = await request.get('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                params: cenario.params
            });
            expect(response.status()).toBe(cenario.esperado.status);

            const body = await response.json();

            // metadados de paginação presentes
            expect(body.pagination).toHaveProperty('page')
            expect(body.pagination).toHaveProperty('total')
            expect(body.pagination).toHaveProperty('limit')

            body.data.forEach((produto: any) => {
                expect(produto.supplier_id).toBe(cenario.params.supplier_id)
            })

            validarStatusEMensagem(response, body, cenario.esperado);
        });

        test('Deve validar ordenação por nome os produtos listados', async ({ request, authToken }) => {
            const cenario = dadosFiltros.produtos_paginados_ordenados

            const response = await request.get('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                params: cenario.params
            });
            expect(response.status()).toBe(cenario.esperado.status);

            const body = await response.json();

            // metadados de paginação presentes
            expect(body.pagination).toHaveProperty('page')
            expect(body.pagination).toHaveProperty('total')
            expect(body.pagination).toHaveProperty('limit')

            // valida ordenação de todos os itens
            for (let i = 0; i < body.data.length - 1; i++) {
                const atual = body.data[i].name
                const proximo = body.data[i + 1].name
                expect(atual <= proximo).toBeTruthy()
            }


            validarStatusEMensagem(response, body, cenario.esperado);
        });

    });

    test.describe('Gerenciamento de Mídia', () => {
        test('Deve permitir o upload de imagens PNG para um produto específico', async ({ request, authToken }) => {
        });
        test('Deve validar o formato e o tamanho máximo do arquivo de imagem', async ({ request, authToken }) => {
        });
    });
    
});