import { User } from './models';
import { updateUser } from './models';

const base_url = 'http://localhost:3001';

describe('UserSection', () => {
  let userObject;
  let newUserId;
  it('User > Login', () => {
    cy.request('POST', base_url + '/auth/login ', {
      username: 'admin',
      password: 'admin',
    }).then((response) => {
      userObject = response.body;
    });
  });

  it('User > Create', () => {
    cy.request({
      method: 'POST',
      url: base_url + '/users/createuser',
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      body: User,
    });
    cy.task('dbQuery', {
      query: `SELECT * FROM "User" Where email='${User.email}'`,
    }).then((queryResponse) => {
      if (queryResponse) {
        newUserId = queryResponse[0].id;
      }
    });
    cy.wait(2000);
  });

  it('User > Get/:id ', () => {
    cy.request({
      method: 'GET',
      url: base_url + '/users/' + newUserId,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      body: {},
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
    });
  });

  it('User > Update/:id ', () => {
    cy.request({
      method: 'Put',
      url: base_url + '/users/updateuser/' + newUserId,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      body: updateUser,
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
    });
  });

  it('User > Delete/:id ', () => {
    cy.request({
      method: 'Delete',
      url: base_url + '/users/delete/' + newUserId,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
    });
  });
});
