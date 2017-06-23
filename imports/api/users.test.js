import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import {userSchemaValidation} from './users';

if (Meteor.isServer) {
  describe('Users', function() {
    it('should allow valid email address', function() {
      let user = {
        emails: [
          {address: "test@example.com"}
        ]
      };
      let result = userSchemaValidation(user)
      expect(result).toBe(true)
    });
    it('should reject invalid email address', function() {
      let user = {
        emails: [
          {address: "not an address"}
        ]
      };
      expect(() => {userSchemaValidation(user)}).toThrow('Email must be a valid email address')
    })
  })
}

// const add = (a, b) => {
//   return a+b;
// }
// const square = (x) => {
//   return x * x;
// }
// describe('Add', function () {
//   it('should add two numbers', function() {
//     const result = add(2,3);
//     expect(result).toBe(5)
//   });
// })
//
// describe('Square', function() {
//   it('should square a number', function() {
//     const result = square(3);
//     expect(result).toBe(9)
//   });
// })
