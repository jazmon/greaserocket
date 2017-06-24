import * as socketio from 'socket.io';
import logger from './logger';
import knex from './db';
import * as http from 'http';

const printJson = (json: string) => JSON.stringify(json, null, 2);

const createSocketServer = (server: http.Server) => {
  const io = socketio(server);
  io.on('connection', socket => {
    const defaultRoom = 'general';
    socket.on('connection', async data => {
      const maybeUsers = await knex('users')
        .select('user_id')
        .where('user_id', data.userId);
      logger.debug('maybeUsers', maybeUsers);
      if (maybeUsers.length === 0) {
        logger.silly('inserting new user', data.userId);
        await knex('users').insert({
          user_id: data.userId,
          email: data.userId,
          name: data.name,
          nickname: data.nickname,
          picture: data.picture,
        });
        logger.silly('inserted new user', data.userId);
      }
      socket.join(defaultRoom);
      io.in(defaultRoom).emit('user joined', data);
    });
    socket.on('disconnect', () => {
      logger.info('user disconnected');
    });
    socket.on('new_message', async data => {
      logger.debug('new message', data);
      // TODO: joi validation
      const messages = await knex
        .table('messages')
        .insert({
          content: data.content,
          user_id: data.userId,
        })
        .returning('*');
      const message = messages[0];
      logger.debug('message', message);
      // get the user

      const user = await knex
        .table('users')
        .where('user_id', message.user_id)
        .select('*');
      const msgWithUser = Object.assign({}, message, { user: user[0] });
      logger.debug('msgWithUser', printJson(msgWithUser));
      socket.emit('message_emitted', msgWithUser);
    });
  });
};

export default createSocketServer;
