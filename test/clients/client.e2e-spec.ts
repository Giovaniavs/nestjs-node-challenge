import request from 'supertest';
import { APP_URL, ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/constants';

describe('Clients Module', () => {
  const app = APP_URL;
  let apiToken;
  let clientId = '';

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        apiToken = body.token;
      });
  });

  describe('Register', () => {
    const newUserEmail = `user-first.${Date.now()}@example.com`;
    const newUserPassword = `secret`;
    const firstName = 'User';
    const lastName = 'E2E';
    const address = 'Rua Teste';
    const contact = '81982736475';

    describe('Register', () => {
      it('should register on client through relationship with user: /api/v1/users (POST)', () => {
        return request(app)
          .post('/api/v1/users')
          .auth(apiToken, {
            type: 'bearer',
          })
          .send({
            email: newUserEmail,
            password: newUserPassword,
            firstName: firstName,
            lastName: lastName,
            address: address,
            contact: contact,
          })
          .expect(201);
      });

      it('should register on client directly on table: /api/v1/clients/register (POST)', () => {
        return request(app)
          .post('/api/v1/clients/register')
          .auth(apiToken, {
            type: 'bearer',
          })
          .send({
            address: address,
            contact: contact,
          })
          .expect(201)
          .then(({ body }) => {
            clientId = body.id;
          });
      });
    });
  });

  describe('Find one', () => {
    it('should find one client by id: /api/v1/clients/:id (GET)', () => {
      return request(app)
        .get(`/api/v1/clients/${clientId}`)
        .auth(apiToken, {
          type: 'bearer',
        })
        .expect(200);
    });
  });

  describe('Update', () => {
    const newContact = '81938059583';

    it('should patch one user by id: /api/v1/clients/:id (PATCH)', () => {
      return request(app)
        .patch(`/api/v1/clients/${clientId}`)
        .auth(apiToken, {
          type: 'bearer',
        })
        .send({
          contact: newContact,
        })
        .expect(200);
    });
  });

  describe('Delete', () => {
    it('should patch one user by id: /api/v1/clients/:id (DELETE)', () => {
      return request(app)
        .delete(`/api/v1/clients/${clientId}`)
        .auth(apiToken, {
          type: 'bearer',
        })

        .expect(204);
    });
  });
});
