require('../imports/config/config');
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp'

import '../imports/api/users';
import '../imports/api/notes';
import '../imports/startup/simple-schema-config';

Meteor.startup(() => {
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });

  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: process.env.FB_API_ID,
    secret: process.env.FB_SECRET
  });

});
