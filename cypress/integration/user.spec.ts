import { User, errorMsg } from './models';
import { updateUser } from './models';
import { isEqual } from 'lodash';

const base_url = 'http://localhost:3001';
const phoneNumber = Math.floor(Math.random() * 10000000000);
const newphone = phoneNumber.toString();

describe.only('UserSection', () => {
  let userObject;
  let newUserId;
  let newEmail = 'adarsh@electems.com';
  let searchWord = 'fffff';

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
      console.log('inside then' + queryResponse[0]);
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
      console.log(isEqual(response.body, User));
      expect(isEqual(response.body[0], User));
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
      expect(isEqual(response.body[0], updateUser));
    });
  });

  it('User > Search/:string ', () => {
    /*to check the string is present in firstName colum */
    cy.request({
      method: 'GET',
      url: base_url + '/users/search/' + updateUser.firstName,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      body: {},
    }).then((response) => {
      console.log(response.body);
      expect(isEqual(response.body[0].firstName, updateUser.firstName));
    });

    /*to check the string is present in lastname colum */

    cy.request({
      method: 'GET',
      url: base_url + '/users/search/' + updateUser.lastName,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      body: {},
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
      expect(isEqual(response.body[0].lastName, updateUser.lastName));
    });

    /*to check the string is present in email colum */
    cy.request({
      method: 'GET',
      url: base_url + '/users/search/' + updateUser.email,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      body: {},
    }).then((response) => {
      console.log(response.body);
      expect(isEqual(response.body[0].email, updateUser.email));
    });

    /*to check the string is present in filmIndustry colum */
    cy.request({
      method: 'GET',
      url: base_url + '/users/search/' + updateUser.filmIndustry,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      body: {},
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
      expect(isEqual(response.body[0].filmIndustry, updateUser.filmIndustry));
    });

    /*to check if the string is not  present in colum */
  });

  it('User > Otp/:emailorphone ', () => {
    /*get otp useing user email */
    cy.request({
      method: 'Get',
      url: base_url + '/auth/otp/' + updateUser.email,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
    }).then((response) => {
      console.log(response.body);
      expect(isEqual(response.body.userName, updateUser.email));
    });

    //      /*check if the email is invalid  */
    cy.request({
      method: 'Get',
      url: base_url + '/auth/otp/' + newEmail,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response.body);
      expect(isEqual(response.body.message, errorMsg.message));
    });

    //    /*get otp useing user phoneNumber */
    cy.request({
      method: 'Get',

      url: base_url + '/auth/otp/' + User.phoneNumber,

 

      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
    }).then((response) => {
      console.log(response.body);
      expect(isEqual(response.body.userName, updateUser.phoneNumber));
    });

    /*check if the phoneNumber is invalid  */
    cy.request({
      method: 'Get',
      url: base_url + '/auth/otp/' + newphone,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response.body);
      expect(isEqual(response.body.message, errorMsg.message));
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
      //  expect(response.status).to.eq(200);
      expect(isEqual(response.body.newUserId, newUserId));
    });
  });
});
