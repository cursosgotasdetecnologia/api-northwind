# API Northwind - Testes Automatizados ![CI/CD](https://github.com/SEU_USUARIO/SEU_REPO/actions/workflows/api-tests.yml/badge.svg)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-000000?style=flat&logo=playwright)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat&logo=githubactions)
![Allure](https://img.shields.io/badge/Allure-ff4088?style=flat&logo=alluretestreport)

## Descrição

Automação de testes de API para o Northwind, com cobertura completa de CRUD, validações de contrato e regras de negócio. Pipeline CI/CD integrado ao GitHub Actions e relatórios Allure publicados como artifact.

---

## ✨ Destaques do Projeto

- ✅ Pipeline CI/CD funcional em GitHub Actions para cada push
- ✅ 113 testes automatizados executando com consistência
- ✅ Cobertura completa de CRUD: GET / POST / PUT / PATCH / DELETE
- ✅ Validações de contrato e business rules com assertivas fortes
- ✅ Relatórios visuais Allure para análise rápida de resultados
- ✅ Arquitetura escalável com Fixtures, Service Objects e testes data-driven
- ✅ Zero “na minha máquina funciona” — foco em estabilidade e replicabilidade

---

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Acesso à API Northwind
- Terminal / CLI funcionando

---

## 🚀 Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar todos os testes API
npx playwright test

# Executar testes com relatório Allure
npx playwright test --reporter=list
```

---

## 📊 Estrutura do Projeto

```text
.
├── allure-results/
├── fixtures/
├── services/
├── tests/
│   ├── api/
│   └── contract/
├── utils/
├── playwright.config.ts
├── package.json
└── README.md
```

---

## 🧪 Tipos de Testes Cobertos

- CRUD completo
  - GET
  - POST
  - PUT
  - PATCH
  - DELETE
- Validação de contrato (schema / payload)
- Validação de regras de negócio
- Testes data-driven com diferentes combinações de payload
- Verificação de status codes e mensagens de erro
- Autenticação e autorização de endpoints (quando aplicável)

---

## 📈 Métricas e Cobertura

- Total de testes: **113**
- Foco em:
  - robustez de API
  - consistência de status codes
  - validação de resposta
  - contratos JSON
  - fluxo completo de CRUD

---

## 📄 Relatório de Testes

Acompanhe os resultados no Allure Report gerado pela pipeline:

- Artifact Allure disponível no GitHub Actions após cada execução

> Confira o relatório para visualizar falhas, evidências e histórico de execução.

---

## 🔧 Tecnologias Utilizadas

- 🧪 Playwright
- 🟦 TypeScript
- 🌐 Node.js
- ⚙️ GitHub Actions
- 📊 Allure Report
- 🧩 Fixtures e Service Objects
- 📁 Estrutura modular orientada à manutenção

---

## 🤝 Como Contribuir

1. Fork deste repositório
2. Crie uma branch de feature: `git checkout -b feature/nome-da-melhoria`
3. Faça suas alterações e adicione testes
4. Abra um Pull Request descrevendo a mudança
5. Aguarde revisão e aprovação

---

## 📫 Contato

- 🚀 Tech Lead / QA Automation
- 📧 [Seu Email Aqui]
- 🔗 [LinkedIn / Perfil Profissional Aqui]

---

## 📄 Licença

Este projeto está licenciado sob a licença [MIT](LICENSE).
