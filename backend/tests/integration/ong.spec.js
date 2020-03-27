const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {
  it('should be able to create a new ONG', async () => {
    beforeEach(async () => {
      await connection.migrate.rollback();
      await connection.migrate.latest();
    })

    afterAll(async () => {
      await connection.destroy();
    });
    const response = await request(app).post('/ongs')
      .send({
        name: "SIGNAl",
        email: "contato@serpro.com",
        whatsapp: "61400289222",
        city: "Brasilia",
        uf: "DF"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
})