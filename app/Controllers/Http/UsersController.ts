import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const userPaylod = request.only([
      'email',
      'username',
      'password',
      'avatar',
    ]);

    const user = await User.create(userPaylod);

    return response.created({ user });
  }
}
