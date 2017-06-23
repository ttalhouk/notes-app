import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if (Meteor.isServer) {
  describe('Notes', function(){

    const note1 = {
      _id: 'testNoteId1',
      title: 'My title',
      body: 'body text',
      userId: 'testUser1',
      updatedAt: 0
    };
    const note2 = {
      _id: 'testNoteId2',
      title: 'My alt title',
      body: 'body alt text',
      userId: 'testUser2',
      updatedAt: 0
    };
    const validUpdates = {
      title: 'new note title'
    };
    const invalidUpdates = {
      title: 'new note title',
      body: 'new body text',
      extra: 'not allowed'
    };

    beforeEach(function(){
      Notes.remove({});
      Notes.insert(note1);
      Notes.insert(note2);
    });
    describe('notes.insert', function(){
      it('should create a new note', function(){
        const userId = 'testId'
        const _id = Meteor.server.method_handlers['notes.insert'].apply({
          userId
        });
        expect(Notes.findOne({_id, userId})).toExist();
      });

      it('should not create a new note if this is no current user', function(){
        expect(() => {
          Meteor.server.method_handlers['notes.insert']()
        }).toThrow();
      });
    })

    describe('notes.remove', function() {

      it('should remove note', function() {
        Meteor.server.method_handlers['notes.remove'].apply({
          userId: note1.userId
        }, [note1._id]);
        expect(Notes.findOne({_id: note1._id})).toNotExist();
      });

      it('should not remove note if unauthenticated', function() {
        expect(() => {
          Meteor.server.method_handlers['notes.remove'](note1._id)
        }).toThrow();
        expect(Notes.findOne({_id: note1._id})).toExist();
      });

      it('should throw an error if note id is not valid', function() {
        expect(() => {
          Meteor.server.method_handlers['notes.remove'].apply({
            userId: note1.userId
          }, []);
        }).toThrow();
      });
    });

    describe('notes.update', function() {
      it('should update note with valid id\'s', function() {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: note1.userId
        }, [note1._id, validUpdates]);
        let note = Notes.findOne({_id: note1._id})
        expect(note).toInclude({
          title: validUpdates.title,
          body: note1.body
        });
        expect(note.updatedAt).toBeGreaterThan(note1.updatedAt);
      });

      it('should not update note with invalid updates', function() {
        expect(() => {
          Meteor.server.method_handlers['notes.update']
          .apply({
            userId: note1.userId
          }, [note1._id, invalidUpdates])
        }).toThrow();
        let note = Notes.findOne({_id: note1._id})
        expect(note).toNotInclude({
          title: invalidUpdates.title,
          body: invalidUpdates.body
        });
      });

      it('should not save updates if userId does not match', function() {
        let user2Id = 'testUser2Id';
        Meteor.server.method_handlers['notes.update'].apply({
          userId: user2Id
        }, [note1._id, validUpdates]);

        let note = Notes.findOne({_id: note1._id})
        expect(note).toInclude(note1);
      });

      it('should not update note if unauthenticated', function() {
        expect(() => {
          Meteor.server.method_handlers['notes.update'](note1._id, validUpdates)
        }).toThrow();
        let note = Notes.findOne({_id: note1._id})
        expect(note).toInclude(note1);
      });

      it('should not update and throw an error if note id is not valid', function() {
        expect(() => {
          Meteor.server.method_handlers['notes.update'].apply({
            userId: note1.userId
          }, []);
        }).toThrow();
      });
    });

    describe('publish', function(){
      it('should return users notes', function() {
        const result = Meteor.server.publish_handlers.notes.apply({userId: note1.userId});
        const notes = result.fetch();
        expect(notes.length).toBe(1);
        expect(notes[0]).toEqual(note1);
      });
      it('should return no notes if user id does not match', function() {
        const result = Meteor.server.publish_handlers.notes.apply({userId:'userTestId3'});
        const notes = result.fetch();
        expect(notes.length).toBe(0);
      });
    })
  });
}
