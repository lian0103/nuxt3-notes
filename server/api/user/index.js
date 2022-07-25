import { db } from '../../db/index';
import { v4 as uuid } from 'uuid';
import { sendError } from 'h3';

export default defineEventHandler(async (event) => {
  switch (event.req.method) {
    case 'GET': {
      return db.users;
    }
    case 'POST': {
      const body = await useBody(event);
      if (!body.userName) {
        const badRequestErr = createError({
          statusCode: 400,
          statusMessage: 'userName is not found',
        });
        sendError(event, badRequestErr);
      }
      const newUser = {
        id: uuid(),
        item: body.userName,
        online: true,
      };

      db.users.push(newUser);
      return newUser;
    }
  }
});
