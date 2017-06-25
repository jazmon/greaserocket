import * as config from '../knexfile';
import * as Knex from 'knex';

const env: string = process.env.NODE_ENV || 'development';
console.log('env', env);

const knex = Knex(config[env]);

export default knex;

knex.migrate.latest([config]);

export interface User {
  user_id: string | null,
  created_at: string,
  updated_at: string,
  name: string | null,
  email: string | null,
  nickname: string | null,
  picture: string | null,
}

export interface Location {
  id: string,
  created_at: string,
  updated_at: string,
  latitude: number | null,
  longitude: number | null,
  title: string | null,
  description: string | null,
}

export interface Message {
  id: string,
  created_at: string,
  updated_at: string,
  content: string | null,
  user_id: string | null,
}

export interface Post {
  id: string,
  created_at: string,
  updated_at: string,
  content: string | null,
  user_id: string | null,

}
