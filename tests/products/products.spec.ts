import { test, expect } from '../../fixtures/auth.fixture';
import dadosCadastro from '../../data/json/products/produtos_dados_cadastro.json';
import dadosExclusao from '../../data/json/products/produtos_dados_exclusao.json';
import dadosEspecificos from '../../data/json/products/produtos_dados_especificos.json';
import daosAtualizacao from '../../data/json/products/produtos_dados_atualizacao.json';
import dadosFiltros from '../../data/json/products/produtos_dados_filtros.json';
import dadosMidia from '../../data/json/products/produtos_dados_midia.json';



test.describe('Gestão de Catálogo de Produtos', () => {

    test.describe('Criação de Novos Produtos', () => {
        test('Deve validar erro de preço negativo', async ({ request, authToken }) => {
            const cenario = dadosCadastro.preco_negativo;

            console.log(cenario.dados)

            const response = await request.post('products', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                data: cenario.dados
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });
        test('Deve validar produto já cadastrado', async ({ request, authToken }) => {
            const cenario = dadosCadastro.produto_duplicado;

            const response = await request.post('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });
        test('Deve validar produto null no cadastro', async ({ request, authToken }) => {
            const cenario = dadosCadastro.produto_null;

            const response = await request.post('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });
        test('Deve impedir produto com sku duplicado', async ({ request, authToken }) => {
            const cenario = dadosCadastro.sku_duplicado;

            const response = await request.post('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });
        test('Deve impedir criar um produto com sku não informado', async ({ request, authToken }) => {
            const cenario = dadosCadastro.sku_inexistente;

            const response = await request.post('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });
        test('Deve impedir criar um produto com fornecedor inexistente', async ({ request, authToken }) => {
            const cenario = dadosCadastro.fornecedor_inexistente;

            const response = await request.post('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });
        test('Deve impedir criar um produto com categoria inexistente', async ({ request, authToken }) => {
            const cenario = dadosCadastro.categoria_inexistente;

            const response = await request.post('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                data: cenario.dados
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });

    });

    test.describe('Consulta e Busca de Produtos ', () => {
        test('Deve permitir a listagem de produtos com paginação simples', async ({ request, authToken }) => {

            const response = await request.get('products?page=1&limit=10', {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            expect(response.status()).toBe(200);

        })
        test('Deve filtrar produtos por múltiplos critérios simultaneamente', async ({ request, authToken }) => {

            const response = await request.get('products', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                params: {
                    page: 1,
                    limit: 3,
                    search: 'mochila',
                    category_id: 2,
                    supplier_id: 7
                }
            });
            expect(response.status()).toBe(200);

            const body = await response.json();
            console.log('Produtos retornados', body.data);
        });
        test('Deve exibir as informações de categorias e fornecedores vinculados aos produtos', async ({ request, authToken }) => {

            const response = await request.get('products', {
                headers: { Authorization: `Bearer ${authToken}` },
                params: {
                    category_id: 2,
                    supplier_id: 7
                }
            });
            expect(response.status()).toBe(200);

            const body = await response.json();
            console.log('Produtos retornados', body.data);
        });
        test('Deve permitir a ordenação de produtos por múltiplos campos (nome, preço, estoque)', async ({ request, authToken }) => {
        });
        test('Deve validar parâmetros de página e limite como números positivos', async ({ request, authToken }) => {
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

            expect(response.status()).toBe(200);
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

            expect(response.status()).toBe(200);

            const body = await response.json();
            expect(body.mensagens[0]).toBe('Produto atualizado com sucesso!');


        });
        test('Deve regerar o slug do produto apenas quando o nome for alterado', async ({ request, authToken }) => {
        });
        test('Deve validar a unicidade de SKU e nome durante a atualização', async ({ request, authToken }) => {
        });
    });

    test.describe('Exclusão de Produtos', () => {
        test('Deve remover um produto permanentemente e validar sua inexistência', async ({ request, authToken }) => {

            const productId = 380;

            const response = await request.delete(`products/${productId}`, {
                headers: { authorization: `Bearer ${authToken}` },
            });

            expect(response.status()).toBe(200);

            // A Prova Real
            const check = await request.get(`products/${productId}`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });
            expect(check.status()).toBe(404);

        });
        test('Deve retornar erro 404 ao tentar remover um produto que não existe', async ({ request, authToken }) => {
        });

        test('Deve validar exclusão informando id inexistente', async ({ request, authToken }) => {
            const cenario = dadosExclusao.produto_inexistente
            const response = await request.delete(`products/${cenario.dados.id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            const body = await response.json();
            expect(response.status()).toBe(cenario.esperado.status);
            expect(body.mensagens).toContain(cenario.esperado.mensagem);
        });




    });

    test.describe('Listagem de Produtos', () => {
        test('Deve retornar produtos paginados', async ({ request, authToken }) => {

            const response = await request.get('products', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                params: {
                    page: 1,
                    limit: 5
                }
            });
            expect(response.status()).toBe(200);

            const body = await response.json();
            console.log('Produtos retornados', body.data);
        });
    });

    test.describe('Gerenciamento de Mídia', () => {
        test('Deve permitir o upload de imagens PNG para um produto específico', async ({ request, authToken }) => {
        });
        test('Deve validar o formato e o tamanho máximo do arquivo de imagem', async ({ request, authToken }) => {
        });
    });
});