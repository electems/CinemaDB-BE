import {  userSubCategory,updateUserSubCategory, userAndUserSubCategory} from './models';
import { isEqual } from 'lodash';

const base_url = 'http://localhost:3001';

describe.only('UserSubCategorySection', () => {
  let userObject;
  let newUserSubCategoryId;
 
  it('User > Login', () => {
    cy.request('POST', base_url + '/auth/login ', {
      username: 'admin',
      password: 'admin',
    }).then((response) => {
      userObject = response.body;
    });
  });

  it('UserSubCategory > Create', () => {
    console.log(userSubCategory)
    cy.request({
      method: 'POST',
      url: base_url + '/users/createUserSubCategory',
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: false,
      body: userSubCategory,
    });
    cy.task('dbQuery', {
      query: `SELECT * FROM "UserSubCategory" Where key='${userSubCategory.key}'`,
    }).then((queryResponse) => {
      console.log('inside then' + queryResponse[0]);
      if (queryResponse) {
        newUserSubCategoryId = queryResponse[0].id;
      }
    });
    cy.wait(2000);
  });

  it('UserSubCategory > Get/:id ', () => {
    cy.request({
      method: 'GET',
      url: base_url + '/users/userSubCategory/' + newUserSubCategoryId,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: false,
      body: {},
    }).then((response) => {
      console.log(response.body);
      console.log(isEqual(response.body, userSubCategory));
      expect(isEqual(response.body[0], userSubCategory));
    });
  });

  it('UserSubCategory > Update/:id ', () => {
    cy.request({
      method: 'Put',
      url: base_url + '/users/updateUserSubCategory/' + newUserSubCategoryId,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: false,
      body: updateUserSubCategory,
    }).then((response) => {
      console.log(response.body);
      expect(isEqual(response.body[0], updateUserSubCategory));
    });
  });

  it('UserSubCategory > Delete/:id ', () => {
    cy.request({
      method: 'Delete',
      url: base_url + '/users/deleteUserSubCategory/' + newUserSubCategoryId,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: false,
    }).then((response) => {
      console.log(response.body);      
      expect(isEqual(response.body.newUserSubCategoryId, newUserSubCategoryId));
    });
  });

  it('UserAndUserSubCategory > Create/UpdateAND/Delete', () => {   
    cy.request({
      method: 'POST',
      url: base_url + '/users/userAndUserSubCategory',
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: false,
      body: userAndUserSubCategory,
    });   
  });
});
