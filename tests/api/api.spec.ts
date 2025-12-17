import { test, expect } from '@playwright/test';
import { validateApiSchema } from '../support/utils/schemaValidator.ts';
import { validateResponseUsuario } from '../support/utils/validations.ts';

test.describe('Cadastro De Usuário', () => {
  test('Cadastrar um novo usuário', async ({ request }) => {
    const response = await request.post('/usuarios', {
      data: {
        "nome": "Gremio",
        "email": "gremio@teste.com",
        "password": "gremio123",
        "administrador": "true"
      }
    });

    const body = await response.json();

    // Mostra o response da requisição
    console.log(body)

    // Validação do retorno da resposta da API
    expect(response.status()).toBe(201);

    expect(body.message).toBe('Cadastro realizado com sucesso')

    // Validação de schema
    // Caminho relativo ao diretório 'schemas'
    const isSchemaValid = validateApiSchema(body, '../../schemas/usuarios/sucesso/cadastro-usuario.json', 'cadastroSucesso');
    expect(isSchemaValid).toBe(true);

  })

  test('Remover um usuário', async ({ request }) => {
    const cadastro = await request.post('/usuarios', {
      data: {
        "nome": "Gremio",
        "email": "gremio@teste.com",
        "password": "gremio123",
        "administrador": "true"
      }
    });

    const bodyCadastro = await cadastro.json();
    const usuario = bodyCadastro._id

    const deleteUsuario = await request.delete(`/usuarios/${usuario}`)

    const body = await deleteUsuario.json();

    // Mostra o response da requisição
    console.log(body)

    // Validação do retorno da resposta da API
    expect(deleteUsuario.status()).toBe(200);

    expect(body.message).toBe('Registro excluído com sucesso')

    // Validação de schema
    // Caminho relativo ao diretório 'schemas'
    const isSchemaValid = validateApiSchema(body, '../../schemas/usuarios/sucesso/cadastro-usuario.json', 'deletaCadastroSucesso');
    expect(isSchemaValid).toBe(true);
  })

  test('Listar usuários', async ({ request }) => {
    const response = await request.get('/usuarios');

    const body = await response.json();

    // Mostra o response da requisição
    console.log(body)

    // Validação do retorno da resposta da API
    expect(response.status()).toBe(200);

    expect(body.usuarios[0].nome).toBe('Fulano da Silva')
    expect(body.usuarios[0].email).toBe('fulano@qa.com')
    expect(body.usuarios[0].password).toBe('teste')
    expect(body.usuarios[0].administrador).toBe('true')
    expect(body.usuarios[0]._id).toBe('0uxuPY0cbmQhpEz1')

    // Validação de schema
    // Caminho relativo ao diretório 'schemas'
    const isSchemaValid = validateApiSchema(body, '../../schemas/usuarios/sucesso/consulta-usuario.json', 'listagemUsuarioSucesso');
    expect(isSchemaValid).toBe(true);

  })

  test.only('Buscar usuário por ID', async ({ request }) => {
    const response = await request.get('/usuarios/0uxuPY0cbmQhpEz1');

    const body = await response.json();

    // Mostra o response da requisição
    console.log(body)

    // Validação do retorno da resposta da API
    expect(response.status()).toBe(200);

    validateResponseUsuario(body);

    // Validação de schema
    // Caminho relativo ao diretório 'schemas'
    const isSchemaValid = validateApiSchema(body, '../../schemas/usuarios/sucesso/consulta-usuario.json', 'buscaUsuarioSucesso');
    expect(isSchemaValid).toBe(true);
  })

  test('Editar usuário', async ({ request }) => {
    const usuario = await request.put('/usuarios/C0s022MYLYAonh2r', {
      data: {
        "nome": "Marcos12345",
        "email": "marcos12345@teste.com",
        "password": "marcos12345",
        "administrador": "false"
      }
    });

    const body = await usuario.json();

    // Mostra o response da requisição
    console.log(body)

    // Validação do retorno da resposta da API
    expect(usuario.status()).toBe(200);

    expect(body.message).toBe('Registro alterado com sucesso')

    const user = await request.get('/usuarios/C0s022MYLYAonh2r');
    const bodyUser = await user.json();

    expect(bodyUser.nome).toBe('Marcos12345')
    expect(bodyUser.email).toBe('marcos12345@teste.com')
    expect(bodyUser.password).toBe('marcos12345')
    expect(bodyUser.administrador).toBe('false')
    expect(bodyUser._id).toBe('C0s022MYLYAonh2r')

  })

})