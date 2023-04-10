import { User } from './models';
import { updateUser } from './models';


const base_url = 'http://localhost:3001';
const phoneNumber = Math.floor(Math.random() * 10000000000);
const newphone = phoneNumber.toString();

describe('UserSection', () => {
  let userObject;
  let newUserId;
  let newEmail='adarsh@electems.com'
  let searchWord ='fffff';
  let userEmail;
  
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
        userEmail = queryResponse[0].email
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


  it('User > Search/:string ', () => {
     /*to check the string is present in firstName colum */
    cy.request({
      method: 'GET',
      url: base_url +'/users/search/' + userObject.firstName,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      body: {},

    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
    });

     /*to check the string is present in lastname colum */
   
    cy.request({
      method: 'GET',
      url: base_url +'/users/search/' + userObject.lastName,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      body: {},

    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
    });

     /*to check the string is present in email colum */
    cy.request({
      method: 'GET',
      url: base_url +'/users/search/' + userObject.email,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      body: {},

    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
    });

     /*to check the string is present in filmIndustry colum */
    cy.request({
      method: 'GET',
      url: base_url +'/users/search/' + userObject.filmIndustry,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      body: {},

    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
    });

     /*to check if the string is not  present in colum */
    cy.request({
      method: 'GET',
      url: base_url +'/users/search/' + searchWord,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      body: {},

    }).then((response) => {
      console.log(response.body);
      // expect(response.body.firstName).to.have.property('firstName')
    });
  });

  it('User > Otp/:emailorphone ', () => {

     /*get otp useing user email */
    cy.request({
      method: 'Get',
      url: base_url + '/users/otp/' + userEmail,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      failOnStatusCode: false
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(500);
    });

       /*check if the email is invalid  */
    cy.request({
      method: 'Get',
      url: base_url + '/users/otp/' + newEmail,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      failOnStatusCode: false
    }).then((response) => {
      console.log(response.status);
      expect(response.Status).to.eq(undefined); 
    });

     /*get otp useing user phoneNumber */
    cy.request({
      method: 'Get',
      url: base_url + '/users/otp/' + User.phoneNumber,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
    });

	  /*check if the phoneNumber is invalid  */
    cy.request({
      method: 'Get',
      url: base_url + '/users/otp/' + newphone,
      headers: { Authorization: 'Bearer ' + userObject.token },
      form: true,
      failOnStatusCode: false
    }).then((response) => {
      console.log(response.body);
      expect(response.Status).to.eq(undefined);
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
