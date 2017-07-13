import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';


export const userSchemaValidation = (user) => {
  if (user.services.facebook) {
    return true;
  }

  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({email});

  return true;
}

if (Meteor.isServer){
  Meteor.publish('userInfo', function () {
    if (this.userId) {
      let currentUser = Meteor.users.find({ _id: this.userId },{
        fields: { "services.facebook.id": 1 }
      });
      return currentUser;
    } else {
      this.ready();
    }
  });

  Accounts.onCreateUser(function(options, user) {
    if (user.services) {
        var service = _.keys(user.services)[0];
        var email = user.services[service].email;

        // if service is password look for facebook login
        if (service == 'password') {
          var existingUser = Meteor.users.findOne({'services.facebook.email': user.emails[0].address});
          if (!existingUser) {
            return user;
          }
          existingUser.emails = user.emails;

        }

        // if facebook login look for password service
        if (service == 'facebook') {
            if (!user.profile)
                user.profile = {};
            if (!user.profile.name)
                user.profile.name = user.services[service].username;

            if (!email)
            return user;

            // see if any existing user has this email address, otherwise create new
            var existingUser = Meteor.users.findOne({'emails.address': email});

            if (!existingUser){
              return user;
            }

            // precaution, these will exist from accounts-password if used
            if (!existingUser.services)
            existingUser.services = { resume: { loginTokens: [] }};
            if (!existingUser.services.resume)
            existingUser.services.resume = { loginTokens: [] };
        }

        // copy across new service info
        existingUser.services[service] = user.services[service];
        // existingUser.services.resume.loginTokens.push(
        //   user.services.resume.loginTokens[0]
        // );

        Meteor.users.remove({_id: existingUser._id}); // remove existing record

        return existingUser;                          // record is re-inserted
    }
  });

  Accounts.validateNewUser(userSchemaValidation)
}
