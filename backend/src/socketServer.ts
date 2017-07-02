import * as socketio from 'socket.io';
import logger from './logger';
import knex from './db';
import * as Joi from 'joi';

import * as http from 'http';
import { validateRequest } from './utils/validator';
import { User } from './types';
import { schema as userSchema } from './endpoints/users';

const DEFAULT_ROOM = 'general';
const printJson = (json: string) => JSON.stringify(json, null, 2);

type SocketEvent =
  | 'connection'
  | 'disconnect'
  | 'new_message'
  | 'message_emitted'
  | 'error';

const doesUserExist = async (userId: string): Promise<boolean> => {
  return (
    (await knex('users').select('user_id').where('user_id', userId).count()) > 0
  );
};

const onNewUserConnect = (
  socket: SocketIO.Socket,
  io: SocketIO.Server,
) => async (user: User) => {
  try {
    validateRequest(user, userSchema);
    const userAlreadyExists: boolean = await doesUserExist(user.userId);
    if (!userAlreadyExists) {
      knex('users').insert({
        user_id: user.userId,
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
      });
    }
    socket.join(DEFAULT_ROOM);
    io.in(DEFAULT_ROOM).emit('user joined', { name: user.name });
  } catch (error) {
    socket.emit('error', error);
  }
};

const onUserDisconnect = () => {
  logger.info('user disconnected');
};

const onNewMessage = (socket: SocketIO.Socket, io: SocketIO.Server) => async (
  data: any,
) => {
  try {
    logger.debug('new message', data);
    const schema = {
      content: Joi.string().required(),
      userId: Joi.string().required(),
    };
    validateRequest(data, schema);
    const messages = await knex
      .table('messages')
      .insert({
        content: data.content,
        user_id: data.userId,
      })
      .returning('*');
    const message = messages[0];
    logger.debug('message', message);

    const user = await knex
      .table('users')
      .where('user_id', message.user_id)
      .select('*');
    const msgWithUser = Object.assign({}, message, { user: user[0] });
    logger.debug('msgWithUser', printJson(msgWithUser));
    io.in(DEFAULT_ROOM).emit('message_emitted', msgWithUser);
  } catch (error) {
    socket.emit('error', error);
  }
};

const createSocketServer = (server: http.Server) => {
  const io = socketio(server);
  io.on('connection', socket => {
    const defaultRoom = 'general';
    socket.on('connection', onNewUserConnect(socket, io));
    socket.on('disconnect', onUserDisconnect);
    socket.on('new_message', onNewMessage(socket, io));
  });
};

export default createSocketServer;
