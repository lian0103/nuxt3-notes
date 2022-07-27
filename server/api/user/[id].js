import { db } from '../../db/index';
import { sendError } from 'h3';

const findUserById = (id) => {
  let index;
  const user = db.users.find((item, idx) => {
    if (item.id === id) index = idx;
    return item.id === id;
  });
  return { user, index };
};

export default defineEventHandler(async (event) => {
  switch (event.req.method) {
    case 'GET': {
      const { id } = event.context.params;
      const { user } = findUserById(id);

      if (!user) {
        const notFoundErr = createError({
          statusCode: 404,
          statusMessage: 'User not Found',
        });
        sendError(event, notFoundErr);
      }

      return { user };
    }
    case 'PUT': {
      const { id } = event.context.params;
      const { user, index } = findUserById(id);
      if (!user) {
        const notFoundErr = createError({
          statusCode: 404,
          statusMessage: 'User not Found',
        });
        sendError(event, notFoundErr);
      }

      const updateUser = {
        ...user,
        online: !user.online,
      };
      db.users[index] = updateUser;
      return updateUser;
    }
    case 'DELETE': {
      const { id } = event.context.params;
      const { index } = findUserById(id);
      db.users.splice(index, 1);
      return {
        message: 'User deleted!',
      };
    }
  }
});
