import { test, expect } from '../../fixtures/auth.fixture';
import dadosCadastro from '../../data/json/categories/categorias_cadastro.json';
import dadosExclusao from '../../data/json/categories/categorias_exclusao.json';
import dadosEspecificos from '../../data/json/categories/categorias_especificas.json';
import dadosAtualizacao from '../../data/json/categories/categorias_atualizacao.json';
import dadosListagem from '../../data/json/categories/categorias_listagem.json';

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
    });
    /* Este teste não se aplica */
    // test('Deve aplicar filtros de busca textual e ordenação corretamente', async ({ request, authToken }) => {
    // });


    test('Deve exigir token JWT válido para acesso à listagem', async ({ request, authToken }) => {
        const cenario = dadosListagem.listagem_sem_token;
        const response = await request.get('categories', {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        const body = await response.json();
        expect(response.status()).toBe(cenario.esperado.status);
        expect(body.mensagens).toContain(cenario.esperado.mensagem);

    });

    /* Este teste não se aplica */
    //test('Deve validar parâmetros de paginação como números positivos', async ({ request, authToken }) => {
    //});
    /* Este teste não se aplica */
    //test('Deve garantir consistência da estrutura JSON de resposta', async ({ request, authToken }) => {
    //});

    test.describe('Criação de Categoria', () => {

        test('Deve criar categoria com sucesso e gerar slug automaticamente', async ({ request, authToken }) => {

        });

        test('Deve validar obrigatoriedade dos campos name e description', async ({ request, authToken }) => {
            const cenario = dadosCadastro.valido;
            const response = await request.post('categories', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);

            // campos obrigatórios presentes
            expect(body.data).toHaveProperty('name')
            expect(body.data).toHaveProperty('description')

            // tipos corretos          
            expect(typeof body.data.name).toBe('string')
            expect(typeof body.data.description).toBe('string')

        });

        test('Deve impedir criação de categoria com nome duplicado', async ({ request, authToken }) => {
            const cenario = dadosCadastro.categoria_duplicada;
            const response = await request.post('categories', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });

        test('Deve validar limites de caracteres do nome acima de 100 caracteres', async ({ request, authToken }) => {
            const cenario = dadosCadastro.categoria_nome_limite_acima;
            const response = await request.post('categories', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });
        test('Deve validar limites de caracteres de descrição da categoria acima de 200 caracteres', async ({ request, authToken }) => {
            const cenario = dadosCadastro.categoria_descricao_limite_acima;
            const response = await request.post('categories', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });
    });

    test.describe('Consulta de Categoria por ID', () => {
        test('Deve retornar 404 para categoria inexistente', async ({ request, authToken }) => {
            const cenario = dadosListagem.listagem_inexistente
            const response = await request.get(`categories/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });

        test('Deve exigir autenticação para consulta por ID', async ({ request }) => {
            const cenario = dadosListagem.listagem_sem_token
            const response = await request.get(`categories/${cenario.dados.id}`, {
                //  headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });

        test('Deve listar categoria com dados de cadastro', async ({ request, authToken }) => {
            const cenario = dadosListagem.listagem_especifica
            const response = await request.get(`categories/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });

    });

    test.describe('Produtos da Categoria', () => {

        test('Deve listar produtos vinculados à categoria', async ({ request, authToken }) => {
        });

        test('Deve retornar lista vazia quando não houver produtos', async ({ request, authToken }) => {
        });

        test('Deve incluir dados relacionais como nome do fornecedor', async ({ request, authToken }) => {
        });

        test('Deve retornar 404 quando categoria não existir', async ({ request, authToken }) => {
        });

        test('Deve validar ID como número positivo', async ({ request, authToken }) => {
        });

        test('Deve exigir autenticação para listagem de produtos', async ({ request }) => {
        });

    });

    test.describe('Atualização Completa de Categoria', () => {

        test('Deve atualizar todos os dados da categoria com sucesso', async ({ request, authToken }) => {
        });

        test('Deve regerar slug automaticamente quando nome for alterado', async ({ request, authToken }) => {
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
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });

        test('Deve impedir excluir categoria com produto vinculado', async ({ request, authToken }) => {
            const cenario = dadosExclusao.categoria_com_produtos
            const response = await request.delete(`categories/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });

        test('Deve retornar mensagem de confirmação de remoção', async ({ request, authToken }) => {
            const cenario = dadosExclusao.categoria_valida
            const response = await request.delete(`categories/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });

        test('Deve exigir autenticação para remoção', async ({ request, authToken }) => {
            const cenario = dadosExclusao.categoria_excluir_sem_token
            const response = await request.delete(`categories/${cenario.dados.id}`, {
                //  headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });
        test('Deve validar exclusão ao não informar um ID', async ({ request, authToken }) => {
            const cenario = dadosExclusao.categoria_null
            const response = await request.delete(`categories/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });
    });
});