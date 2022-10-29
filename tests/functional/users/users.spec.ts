import Database from '@ioc:Adonis/Lucid/Database';
import { test } from '@japa/runner';

test.group('User', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();
    return () => Database.rollbackGlobalTransaction();
  });

  test('it should create an user', async ({ client, assert }) => {
    const userPayload = {
      email: 'teste@teste.com',
      username: 'teste',
      password: 'teste',
      avatar: 'https://avatars.githubusercontent.com/u/24613695?v=4',
    };
    const response = await client.post('/users').json(userPayload);

    const { password, avatar, ...expected } = userPayload;

    response.assertStatus(201);
    response.assertBodyContains({ user: expected });
    assert.notExists(response.body().user.password, 'Password defined');
  });
});
