import { default as knex, User, Location, Post, Message } from '../../db';


export interface PostWithUser extends Post {
  user: User | null,
}

export interface MessageWithUser extends Message {
  user: User | null,
}

export class Messages {
  async getAll(): Promise<Array<Message>> {
    return knex('messages');
  }
  async getAllWithUsers(): Promise<Array<MessageWithUser>> {
    const messages = await knex('messages')
      .select(knex.raw('messages.*, row_to_json(users.*) as user'))
      .innerJoin('users', 'messages.user_id', 'users.user_id');
    return messages;
  }
  async getMessageById(id: string): Promise<Message> {
    const query = knex('messages').where({ id });
    return query.then(([row]) => row);
  }

  async submitMessage({ content, userId }: { content: string, userId: string }): Promise<string> {
    const id = await knex.transaction(trx =>
      trx('messages').insert({
        content,
        user_id: userId,
      })
    );
    return id;
  }
}


export class Posts {
  async getAll(): Promise<Post[]> {
    return knex('posts');
  }
  async getAllWithUsers(): Promise<PostWithUser[]> {
    const posts = await knex
      .table('posts')
      .innerJoin('users', 'posts.user_id', 'users.user_id')
      .select(knex.raw('posts.*, row_to_json(users.*) as author'));
    return posts;
  }
  async getPostById(id: string): Promise<Post> {
    const query = knex('posts').where({ id });
    return query.then(([row]) => row);
  }
}

export class Locations {
  async getAll(): Promise<Array<Location>> {
    return knex('locations');
  }
  async getLocationById(id: string): Promise<Location> {
    const query = knex('locations').where({ id });
    return query.then(([row]) => row);
  }
}

export class Users {
  async getAll(): Promise<Array<User>> {
    return knex('users');
  }
  async getUserById(id: string): Promise<User> {
    const query = knex('users').where({ user_id: id });
    return query.then(([row]) => row);
  }
  async createUser({ userId, name, email, picture, nickname }: { userId: string, name: string, email: string, picture: string, nickname: string }): Promise<string> {
    return knex('users')
      .insert({ user_id: userId, name, email, picture, nickname })
      .returning('user_id');
  }
}
