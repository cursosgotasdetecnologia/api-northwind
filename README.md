# API Northwind - Testes Automatizados
![CI](https://github.com/cursosgotasdetecnologia/api-northwind/actions/workflows/api-tests.yml/badge.svg)

[![QA Pipeline - API Tests](https://github.com/cursosgotasdetecnologia/api-northwind/actions/workflows/api-tests.yml/badge.svg?branch=main&event=push)](https://github.com/cursosgotasdetecnologia/api-northwind/actions/workflows/api-tests.yml)


![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=flat&logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

Suite completa de testes automatizados para a API Northwind, garantindo qualidade e confiabilidade em operações CRUD e validações de negócio.  
Com 113 testes passando, cobre 100% dos endpoints críticos com validações rigorosas de contrato e performance.

<!-- ![Demo do Relatório Allure](demo.gif) -->

## 🚀 Destaques do Projeto

- Pipeline CI/CD funcional rodando a cada push e pull request
- 113 testes automatizados com zero falsos positivos
- Relatório Allure público e acessível sem login
- Arquitetura escalável com Service Objects e Fixtures
- Testes data-driven com múltiplos cenários por endpoint
- Validação completa de contrato de API (schema, status, tempo de resposta)

## 📋 Pré-requisitos

- Node.js versão 18 ou superior
- Verifique a versão instalada:
  ```bash
  node --version
  ```

## 🛠️ Instalação e Execução

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/cursosgotasdetecnologia/api-northwind.git
cd api-northwind
npm install
```

Execute os testes localmente:

```bash
npm run test
```

Para gerar relatório Allure:

```bash
npm run allure:generate
npm run allure:open
```

## 📁 Estrutura de Pastas

```
tests/          # Arquivos de teste organizados por módulo
fixtures/       # Dados de teste e configurações
services/       # Objetos de serviço para interações com API
utils/          # Utilitários auxiliares
data/           # Dados de teste estáticos
schemas/        # Esquemas de validação JSON
```

## 🧪 Tipos de Testes Cobertos

- **CRUD Operations**: GET, POST, PUT, PATCH, DELETE para todos os endpoints
- **Validações de Contrato**: Schema JSON, códigos de status HTTP, headers obrigatórios
- **Regras de Negócio**: Lógica específica da API Northwind (categorias, produtos, pedidos)
- **Cenários de Erro**: Tratamento de entradas inválidas e falhas esperadas
- **Performance**: Tempos de resposta e limites de timeout

## 📊 Métricas e Cobertura

| Métrica                | Valor  |
| ---------------------- | -----  |
| Total de Testes        | 113    |
| Testes Passando        | 113    |
| Testes Falhando        | 0      |
| Cobertura de Código    | 95%    |
| Cobertura de Endpoints | 100%   |

## 📈 Relatório ao Vivo

Veja o relatório ao vivo → [Allure Report](https://cursosgotasdetecnologia.github.io/api-northwind/allure/)

## 🛠️ Tecnologias Utilizadas

- ![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=flat&logo=playwright&logoColor=white) - Framework de testes end-to-end
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) - Tipagem estática
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) - Runtime JavaScript
- ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white) - CI/CD
- ![Allure](https://img.shields.io/badge/Allure-FF6B35?style=flat&logo=allure&logoColor=white) - Relatórios de teste

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📞 Contato

- **LinkedIn**: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)
- **E-mail**: seu.email@exemplo.com
- **GitHub**: [cursosgotasdetecnologia](https://github.com/cursosgotasdetecnologia)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
