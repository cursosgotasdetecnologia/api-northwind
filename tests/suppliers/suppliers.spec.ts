import { test, expect } from '../../fixtures/auth.fixture';
import dadosCadastro from '../../data/json/suppliers/fornecedores_cadastro.json';
import dadosExclusao from '../../data/json/suppliers/fornecedor_exclusao.json';
import dadosEspecificos from '../../data/json/suppliers/fornecedores_listagem.json';
import massa from '../../data/json/suppliers/fornecedores_cadastro.json';

import { criarSupplier } from '../../services/supplier.service';
import { validarStatusEMensagem } from '../../utils/commons.assertion';
import { validarStatus } from '../../utils/commons.assertion';
import { validarContentTypeJson } from '../../utils/commons.assertion';
import { validarFornecedorCriado } from '../../utils/supplier.assertions';

import { buscarSupplierPorId } from '../../services/supplier.service';
import { deletarSupplier } from '../../services/supplier.service';

import { fakerPT_BR as faker } from '@faker-js/faker'

test.describe('Gestão de Fornecedores', () => {

    test.describe('Listagem de Fornecedores', () => {

        test('Deve retornar um fornecedor pelo seu ID', async ({ request, authToken }) => {

            const supplierId = 2;

            const response = await request.get(`suppliers/${supplierId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            expect(response.status()).toBe(200);

            const body = await response.json();
            console.log('Supplier retornado:', body);

            // Validação básica de estrutura

            expect(body.data).toHaveProperty('id');
            expect(body.data.id).toBe(supplierId);
            expect(body.data).toHaveProperty('company_name');
        });

        test('Deve retornar erro ao buscar fornecedor com ID inexistente', async ({ request, authToken }) => {

            const supplierId = 999999;

            const response = await request.get(`suppliers/${supplierId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            expect(response.status()).toBe(404);

            const body = await response.json();
            console.log('Erro retornado:', body);
        });

        test('Deve retornar erro ao enviar ID inválido', async ({ request, authToken }) => {

            const supplierId = 'abc';

            const response = await request.get(`suppliers/${supplierId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            expect([400, 404]).toContain(response.status());

            const body = await response.json();
            console.log('Resposta inválida:', body);
        });

        test('Deve retornar erro ao enviar ID nulo', async ({ request, authToken }) => {

            const supplierId = null;

            const response = await request.get(`suppliers/${supplierId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            expect([400, 404]).toContain(response.status());

            const body = await response.json();
            console.log('Resposta ID nulo:', body);
        });

        test('Deve listar fornecedores com paginação e metadados corretamente', async ({ request, authToken }) => {
        });

        test('Deve aplicar filtros de busca textual e ordenação corretamente', async ({ request, authToken }) => {
        });

        test('Deve exigir token JWT válido para acesso à listagem', async ({ request }) => {
        });

        test('Deve validar parâmetros de paginação como números positivos', async ({ request, authToken }) => {
        });

        test('Deve garantir consistência da estrutura JSON de resposta', async ({ request, authToken }) => {
        });


    });

    test.describe('Criação de Fornecedor', () => {

        test('Deve criar fornecedor com sucesso e retornar ID único', async ({ request, authToken }) => {
            const cenario = dadosCadastro.valido;


            const timestamp = Date.now();

            const dados = {
                ...cenario.dados,
                company_name: `Empresa ${timestamp}`,
                email: `teste_${timestamp}@mail.com`,
                cnpj: `248${timestamp}`.slice(0, 14)
            };

            const response = await criarSupplier(request, authToken, dados)

            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
            validarFornecedorCriado(body)
        });


        test('Deve criar fornecedor com sucesso apartir do FAKER - 1 elemento', async ({ request, authToken }) => {
            const cenario = dadosCadastro.valido;

            const dados = {
                ...cenario.dados,
                company_name: faker.company.name(),
                contact_name: faker.person.fullName(),
                email: faker.internet.email(),
                //phone: faker.phone.number('###########'),
                cnpj: faker.string.numeric(14),
                uf: faker.location.state({ abbreviated: true })

            };

            const response = await criarSupplier(request, authToken, dados)

            console.log(dados);

            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
            validarFornecedorCriado(body)

        });

        test('Deve criar fornecedor com sucesso apartir do FAKER - 10 elementos', async ({ request, authToken }) => {
            const cenario = dadosCadastro.valido;
            const timestamp = Date.now();

            for (let i = 1; i <= 20; i++) {

                const dados = {
                    ...cenario.dados,
                    company_name: `${faker.company.name()}_${timestamp}`,
                    contact_name: faker.person.fullName(),
                    email: `${faker.internet.email()}_${timestamp}`,
                    cnpj: `${faker.string.numeric(10)}${timestamp.toString().slice(-4)}`, // 10 + 4 = 14 dígitos
                    uf: faker.location.state({ abbreviated: true})
                };

                const response = await criarSupplier(request, authToken, dados)

                console.log(dados);

                const body = await response.json();
                validarStatusEMensagem(response, body, cenario.esperado);
                validarFornecedorCriado(body)
            }

        });

        test('Deve validar obrigatoriedade do contato do fornecedor', async ({ request, authToken }) => {
            const response = await criarSupplier(
                request,
                authToken,
                massa.fornecedor_contato_obrigatorio.dados
            );

            const body = await response.json();

            validarStatusEMensagem(
                response,
                body,
                massa.fornecedor_contato_obrigatorio.esperado
            );
        });

    });

    test('Deve validar obrigatoriedade do email do fornecedor', async ({ request, authToken }) => {
        const cenario = dadosCadastro.fornecedor_email_obrigatorio;
        const response = await request.post('suppliers', {
            headers: { Authorization: `Bearer ${authToken}` },
            data: cenario.dados
        });
        const body = await response.json();
        validarStatusEMensagem(response, body, dadosCadastro.fornecedor_email_obrigatorio.esperado);
    });

    test('Deve validar obrigatoriedade do CNPJ do fornecedor', async ({ request, authToken }) => {
        const response = await criarSupplier(
            request,
            authToken,
            massa.fornecedor_cnpj_obrigatorio.dados
        );

        const body = await response.json();

        validarStatusEMensagem(
            response,
            body,
            massa.fornecedor_cnpj_obrigatorio.esperado
        );
    });

    test('Deve impedir cadastro com CNPJ duplicado', async ({ request, authToken }) => {

        const timestamp = Date.now();

        // base do JSON (continua sendo usado)
        const base = dadosCadastro.valido.dados;

        // dado dinâmico (evita conflito entre execuções)
        const fornecedor = {
            ...base,
            company_name: `Empresa ${timestamp}`,
            email: `teste_${timestamp}@mail.com`,
            cnpj: `248${timestamp}`.slice(0, 14)
        };

        // 1. cria fornecedor
        const primeiro = await request.post('suppliers', {
            headers: { Authorization: `Bearer ${authToken}` },
            data: fornecedor
        });

        expect(primeiro.status()).toBe(201);

        // 2. tenta duplicar (mesmo CNPJ)
        const duplicado = await request.post('suppliers', {
            headers: { Authorization: `Bearer ${authToken}` },
            data: fornecedor
        });

        const body = await duplicado.json();
        // 3. valida regra de negócio

        expect(duplicado.status()).toBe(409);
        // validação leve (sem acoplar demais)
        expect(body.mensagens).toBeDefined();
    });

    test('Deve exigir autenticação para criação de fornecedor', async ({ request, authToken }) => {
        const cenario = dadosCadastro.fornecedor_cnpj_duplicado;
        const response = await request.post('suppliers', {
            // headers: { Authorization: `Bearer ${authToken}` },
            data: cenario.dados
        });
        const body = await response.json();
        expect(response.status()).toBe(401);

    });

});

test.describe('Consulta de Fornecedor por ID', () => {

    test('Deve retornar fornecedor específico com dados completos', async ({ request, authToken }) => {

        const timestamp = Date.now();

        const dados = {
            company_name: `Empresa ${timestamp}`,
            contact_name: 'Teste QA',
            email: `teste_${timestamp}@mail.com`,
            phone: '(11) 99999-9999',
            cnpj: `128${timestamp}`.slice(0, 14),
            uf: 'SP'
        };

        // 🔹 cria fornecedor
        const createResponse = await criarSupplier(request, authToken, dados);
        const createBody = await createResponse.json();

        expect(createResponse.status()).toBe(201);

        const supplierId = createBody.data.id;

        // 🔹 busca fornecedor criado
        const response = await buscarSupplierPorId(request, authToken, supplierId);
        const body = await response.json();

        expect(response.status()).toBe(200);

        // 🔹 estrutura
        expect(body.data).toHaveProperty('id');
        expect(body.data).toHaveProperty('company_name');
        expect(body.data).toHaveProperty('email');
        expect(body.data).toHaveProperty('cnpj');

        // 🔹 consistência (muito importante)
        expect(body.data.company_name).toBe(dados.company_name);
        expect(body.data.email).toBe(dados.email);
        expect(body.data.cnpj).toBe(dados.cnpj);
    });

    test('Deve validar ID como número positivo', async ({ request, authToken }) => {
        const response = await buscarSupplierPorId(request, authToken, -1);
        const body = await response.json();

        expect(response.status()).toBeGreaterThanOrEqual(400);
    });

    test('Deve retornar 404 para fornecedor inexistente', async ({ request, authToken }) => {
        const id = dadosEspecificos.fornecedor_inexistente.dados.id;

        const response = await buscarSupplierPorId(request, authToken, id);
        const body = await response.json();

        validarStatusEMensagem(
            response,
            body,
            dadosEspecificos.fornecedor_inexistente.esperado
        );
    });


});

test.describe('Produtos do Fornecedor', () => {

    test('Deve listar produtos vinculados ao fornecedor', async ({ request, authToken }) => {
    });

    test('Deve retornar lista vazia quando fornecedor não possui produtos', async ({ request, authToken }) => {
    });

    test('Deve incluir dados relacionais como categoria do produto', async ({ request, authToken }) => {
    });

    test('Deve retornar 404 quando fornecedor não existir', async ({ request, authToken }) => {
    });

    test('Deve validar ID como número positivo', async ({ request, authToken }) => {
    });

    test('Deve exigir autenticação para listagem de produtos', async ({ request }) => {
    });

});

test.describe('Atualização Completa de Fornecedor', () => {

    test('Deve atualizar todos os dados do fornecedor com sucesso', async ({ request, authToken }) => {
    });

    test('Deve validar unicidade de email e nome na atualização', async ({ request, authToken }) => {
    });

    test('Deve retornar erro ao atualizar fornecedor inexistente', async ({ request, authToken }) => {
    });

    test('Deve validar formato de email inválido na atualização', async ({ request, authToken }) => {
    });

    test('Deve validar formato de telefone inválido na atualização', async ({ request, authToken }) => {
    });

    test('Deve exigir autenticação para atualização completa', async ({ request }) => {
    });

    test('Deve garantir consistência da estrutura JSON de resposta', async ({ request, authToken }) => {
    });

});

test.describe('Atualização Parcial de Fornecedor', () => {

    test('Deve atualizar apenas os campos enviados', async ({ request, authToken }) => {
    });

    test('Deve retornar erro quando nenhum campo for enviado', async ({ request, authToken }) => {
    });

    test('Deve validar apenas os campos enviados na requisição', async ({ request, authToken }) => {
    });

    test('Deve validar unicidade apenas para campos alterados', async ({ request, authToken }) => {
    });

    test('Deve retornar erro para fornecedor inexistente', async ({ request, authToken }) => {
    });

    test('Deve exigir autenticação para atualização parcial', async ({ request }) => {
    });

    test('Deve garantir consistência da estrutura JSON de resposta', async ({ request, authToken }) => {
    });

});

test.describe('Upload de Documento do Fornecedor', () => {

    test('Deve permitir upload de arquivo PDF válido', async ({ request, authToken }) => {
    });

    test('Deve rejeitar arquivos que não sejam PDF', async ({ request, authToken }) => {
    });

    test('Deve rejeitar arquivos maiores que 2MB', async ({ request, authToken }) => {
    });

});

