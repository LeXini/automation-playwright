import { test, expect } from '@playwright/test';

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

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.message).toBe('Cadastro realizado com sucesso')
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

    expect(deleteUsuario.status()).toBe(200);

    const body = await deleteUsuario.json();
    expect(body.message).toBe('Registro excluído com sucesso')
  })

  test('Listar usuários', async ({ request }) => {
    const response = await request.get('/usuarios');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.usuarios[0].nome).toBe('Fulano da Silva')
    expect(body.usuarios[0].email).toBe('fulano@qa.com')
    expect(body.usuarios[0].password).toBe('teste')
    expect(body.usuarios[0].administrador).toBe('true')
    expect(body.usuarios[0]._id).toBe('0uxuPY0cbmQhpEz1')
  })

  test('Buscar usuário por ID', async ({ request }) => {
    const response = await request.get('/usuarios/0uxuPY0cbmQhpEz1');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.nome).toBe('Fulano da Silva')
    expect(body.email).toBe('fulano@qa.com')
    expect(body.password).toBe('teste')
    expect(body.administrador).toBe('true')
    expect(body._id).toBe('0uxuPY0cbmQhpEz1')
  })

  test('Editar usuário', async ({ request }) => {
    const usuario = await request.put('/usuarios/iDCtyKqC3HXBw6TK', {
      data: {
        "nome": "Marcos12345",
        "email": "marcos12345@teste.com",
        "password": "marcos12345",
        "administrador": "false"
      }
    });

    expect(usuario.status()).toBe(200);

    const body = await usuario.json();
    expect(body.message).toBe('Registro alterado com sucesso')

    const user = await request.get('/usuarios/iDCtyKqC3HXBw6TK');
    const bodyUser = await user.json();

    expect(bodyUser.nome).toBe('Marcos12345')
    expect(bodyUser.email).toBe('marcos12345@teste.com')
    expect(bodyUser.password).toBe('marcos12345')
    expect(bodyUser.administrador).toBe('false')
    expect(bodyUser._id).toBe('iDCtyKqC3HXBw6TK')

  })

})