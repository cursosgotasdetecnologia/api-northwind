import { test, expect } from '../../fixtures/auth.fixture';
import dadosCadastro from '../../data/json/categories/categorias_cadastro.json';
import dadosExclusao from '../../data/json/categories/categorias_exclusao.json';
import dadosEspecificos from '../../data/json/categories/categorias_especificas.json';
import dadosAtualizacao from '../../data/json/categories/categorias_atualizacao.json';
import dadosListagem from '../../data/json/categories/categorias_listagem.json';
import dadosFiltros from '../../data/json/products/produtos_dados_filtros.json';

import { validarStatusEMensagem } from '../../utils/commons.assertion';
import { validarCategoriaCriada, validarCategoriaPersistida } from '../../utils/categorie.assertion';
import { criarCategoria, atualizarCategoriaCompleta, deletarCategoria } from '../../services/categories.service';

test.describe('Gestão de Categorias', () => {

    test.describe('Listagem de Categorias', () => {

        test('Deve listar todas as categorias com mensagem esperada', async ({ request, authToken }) => {
            const cenario = dadosListagem.listagem_geral;
            /* Como o GET não envia um corpo (data), a estrutura do seu JSON precisa se adaptar para o que ele realmente usa: os Parâmetros de URL ou (params)
             ou simplesmente a Validação do que volta.        
             Para manter o padrão de dados e esperado, mas deixando claro que no GET não há envio de corpo, 
             a melhor prática é trocar a chave dados por params (se houver filtros) ou deixá-la vazia. */

            const response = await request.get('categories', {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });

        test('Deve exigir token JWT válido para acesso à listagem', async ({ request, authToken }) => {
            const cenario = dadosListagem.listagem_sem_token;
            const response = await request.get('categories', {
                //headers: { Authorization: `Bearer ${authToken}` },
            });

            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });
        test('impedir validação de  categoria por id sem autenticação', async ({ request }) => {
            const response = await request.get('categories/3')
            expect(response.status()).toBe(401);
            console.log('Status Code:', response.status());

        });




    });

    test.describe('Criação de Categoria', () => {

        test('Deve criar categoria com sucesso e gerar slug automaticamente', async ({ request, authToken }) => {

        });

        test('Deve validar obrigatoriedade dos campos name e description', async ({ request, authToken }) => {

            const cenario = dadosCadastro.valido;

            const timestamp = Date.now();

            // só sobrescreve os campos que podem conflitar
            const dados = {
                ...cenario.dados,
                name: `Categoria ${timestamp}`,
                description: `Descricao ${timestamp}`
            };

            const response = await request.post('categories', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: dados
            });

            const body = await response.json();

            validarStatusEMensagem(response, body, cenario.esperado);

            // campos obrigatórios presentes
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('description');

            // tipos corretos          
            expect(typeof body.data.name).toBe('string');
            expect(typeof body.data.description).toBe('string');

        });

        test('Deve impedir criação de categoria com nome duplicado', async ({ request, authToken }) => {
            const cenario = dadosCadastro.categoria_duplicada;
            const response = await request.post('categories', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });

        test('Deve validar limites de caracteres do nome acima de 100 caracteres', async ({ request, authToken }) => {
            const cenario = dadosCadastro.categoria_nome_limite_acima;
            const response = await request.post('categories', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });
        test('Deve validar limites de caracteres de descrição da categoria acima de 200 caracteres', async ({ request, authToken }) => {
            const cenario = dadosCadastro.categoria_descricao_limite_acima;
            const response = await request.post('categories', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });
    });

    test.describe('Consulta de Categoria por ID', () => {
        test('Deve retornar 404 para categoria inexistente', async ({ request, authToken }) => {
            const cenario = dadosListagem.listagem_inexistente
            const response = await request.get(`categories/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });

        test('Deve exigir autenticação para consulta por ID', async ({ request }) => {
            const cenario = dadosListagem.listagem_sem_token
            const response = await request.get(`categories/${cenario.dados.id}`, {
                //  headers: { Authorization: `Bearer ${authToken}` },
            });

            const body = await response.json();

            validarStatusEMensagem(response, body, cenario.esperado);

        });

        test('Deve listar categoria com dados de cadastro', async ({ request, authToken }) => {
            const cenario = dadosListagem.listagem_especifica
            const response = await request.get(`categories/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });

    });

    test.describe('Produtos da Categoria', () => {

        test('Deve listar produtos vinculados à categoria', async ({ request, authToken }) => {
            const cenario = dadosFiltros.produtos_categoria10;

            const response = await request.get('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                params: cenario.params
            });

            const body = await response.json();

            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });

        test('Deve retornar lista vazia quando não houver produtos', async ({ request, authToken }) => {
            const response = await request.get('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                params: { category_id: 999 }
            });

            const body = await response.json();
            expect(response.status()).toBe(404);
            expect(body.mensagens).toContain('Nenhum produto encontrado para os filtros aplicados.');
        });

        test('Deve incluir dados relacionais como nome do fornecedor', async ({ request, authToken }) => {
            const response = await request.get('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                params: { category_id: 10 }
            });

            const body = await response.json();
            expect(response.status()).toBe(200);
            expect(body.data.length).toBeGreaterThan(0);
            expect(body.data[0]).toHaveProperty('suppliers');
            expect(body.data[0].suppliers).toHaveProperty('company_name');
        });

        test('Deve retornar 404 quando categoria não existir', async ({ request, authToken }) => {
            const response = await request.get('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                params: { category_id: 99999 }
            });

            const body = await response.json();
            expect(response.status()).toBe(404);
            expect(body.mensagens).toContain('Nenhum produto encontrado para os filtros aplicados.');
        });

        test('Deve validar ID como número positivo', async ({ request, authToken }) => {
            const response = await request.get('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                params: { category_id: -1 }
            });

            const body = await response.json();
            expect(response.status()).toBe(404);
            expect(body.mensagens).toContain('Nenhum produto encontrado para os filtros aplicados.');
        });

        test('Deve exigir autenticação para listagem de produtos', async ({ request }) => {
            const response = await request.get('products', {
                params: { category_id: 10 }
            });

            const body = await response.json();
            expect(response.status()).toBe(401);
            expect(body.mensagens).toContain('Token ausente');
        });

    });

    test.describe('Atualização Completa de Categoria', () => {

        test('Deve atualizar todos os dados da categoria com sucesso', async ({ request, authToken }) => {
            const unique = Math.floor(Math.random() * 1000);

            const novaCategoria = {
                ...dadosCadastro.valido.dados,
                name: `Cat Atualizar ${unique}`,
                description: `Descricao Atualizar ${Date.now()}`
            };

            const createResponse = await criarCategoria(request, authToken, novaCategoria);
            const createBody = await createResponse.json();

            validarStatusEMensagem(createResponse, createBody, dadosCadastro.valido.esperado);
            validarCategoriaCriada(createBody);

            const categoriaAtualizada = {
                name: `Cat Atualizado ${unique}`,
                description: `Descricao Atualizada ${Date.now()}`
            };

            const updateResponse = await atualizarCategoriaCompleta(
                request,
                authToken,
                createBody.data.id,
                categoriaAtualizada
            );
            const updateBody = await updateResponse.json();

            validarStatusEMensagem(updateResponse, updateBody, {
                status: 200,
                mensagem: 'Categoria atualizada com sucesso!'
            });
            validarCategoriaPersistida(updateBody, categoriaAtualizada);
            expect(updateBody.data).toHaveProperty('id', createBody.data.id);
            expect(typeof updateBody.data.slug).toBe('string');

            await deletarCategoria(request, authToken, createBody.data.id);
        });

        test('Deve regerar slug automaticamente quando nome for alterado', async ({ request, authToken }) => {
            const unique = Math.floor(Math.random() * 1000);

            const novaCategoria = {
                ...dadosCadastro.valido.dados,
                name: `Categoria Slug ${unique}`,
                description: `Descricao Slug ${Date.now()}`
            };

            const createResponse = await criarCategoria(request, authToken, novaCategoria);
            const createBody = await createResponse.json();

            validarStatusEMensagem(createResponse, createBody, dadosCadastro.valido.esperado);

            const categoriaId = createBody.data.id;
            const slugOriginal = createBody.data.slug;
            const novoNome = `Categoria Alterado ${unique}`;
            const expectedSlug = novoNome
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            const updateResponse = await atualizarCategoriaCompleta(request, authToken, categoriaId, {
                name: novoNome,
                description: novaCategoria.description
            });
            const updateBody = await updateResponse.json();

            validarStatusEMensagem(updateResponse, updateBody, {
                status: 200,
                mensagem: 'Categoria atualizada com sucesso!'
            });
            expect(updateBody.data).toBeDefined();
            expect(typeof updateBody.data.slug).toBe('string');
            expect(updateBody.data.slug).not.toBe(slugOriginal);
            expect(updateBody.data.slug).toBe(expectedSlug);

            await deletarCategoria(request, authToken, categoriaId);
        });

        test('Deve validar unicidade do nome na atualização', async ({ request, authToken }) => {
        });

        test('Deve retornar erro ao atualizar categoria inexistente', async ({ request, authToken }) => {
        });

        test('Deve validar limites de caracteres na atualização', async ({ request, authToken }) => {
        });

        test('Deve exigir autenticação para atualização completa', async ({ request }) => {
        });

        test('Deve garantir consistência da estrutura JSON de resposta', async ({ request, authToken }) => {
        });

    });

    test.describe('Atualização Parcial de Categoria', () => {

        test('Deve atualizar apenas os campos enviados', async ({ request, authToken }) => {
        });

        test('Deve retornar erro quando nenhum campo for enviado', async ({ request, authToken }) => {
        });

        test('Deve validar apenas os campos enviados na requisição', async ({ request, authToken }) => {
        });

        test('Deve regerar slug apenas quando nome for alterado', async ({ request, authToken }) => {
        });

        test('Deve retornar erro para categoria inexistente', async ({ request, authToken }) => {
        });

        test('Deve exigir autenticação para atualização parcial', async ({ request }) => {
        });

        test('Deve garantir consistência da estrutura JSON de resposta', async ({ request, authToken }) => {
        });

    });

    test.describe('Remoção de Categoria', () => {

        test('Deve validar exclusão da categoria com ID inexistente', async ({ request, authToken }) => {
            const cenario = dadosExclusao.categoria_inexistente
            const response = await request.delete(`categories/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });

        test('Deve impedir excluir categoria com produto vinculado', async ({ request, authToken }) => {
            const cenario = dadosExclusao.categoria_com_produtos

            const response = await request.delete(`categories/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });

        test('Deve criar e depois remover categoria validando o fluxo completo', async ({ request, authToken }) => {

            // 1. cria categoria (dado dinâmico)
            const timestamp = Date.now();

            const novaCategoria = {
                ...dadosCadastro.valido.dados,
                name: `Categoria ${timestamp}`,
                description: `Descricao ${timestamp}`
            };

            const createResponse = await request.post('categories', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: novaCategoria
            });

            const createBody = await createResponse.json();

            expect(createResponse.status()).toBe(201);

            // valida estrutura (reaproveita lógica da aula 61)
            expect(createBody.data).toHaveProperty('id');
            expect(createBody.data.name).toBe(novaCategoria.name);

            const idCriado = createBody.data.id;

            // 2. deleta a categoria criada
            const deleteResponse = await request.delete(`categories/${idCriado}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            const deleteBody = await deleteResponse.json();

            // 3. valida remoção
            expect(deleteResponse.status()).toBe(200);
            expect(deleteBody.mensagens).toBeDefined();

            // 4. duplo check (garante que realmente deletou)
            const getResponse = await request.get(`categories/${idCriado}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            expect(getResponse.status()).toBe(404);

        });

        test('Deve exigir autenticação para remoção', async ({ request, authToken }) => {
            const cenario = dadosExclusao.categoria_excluir_sem_token
            const response = await request.delete(`categories/${cenario.dados.id}`, {
                //  headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });
        test('Deve validar exclusão ao não informar um ID', async ({ request, authToken }) => {
            const cenario = dadosExclusao.categoria_null
            const response = await request.delete(`categories/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            validarStatusEMensagem(response, body, cenario.esperado);
        });
    });
});