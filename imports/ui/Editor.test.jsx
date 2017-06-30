import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import {Editor} from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {

  describe('<Editor />', function() {
    let browserHistory;
    let call;

    beforeEach(function(){
      call = expect.createSpy();
      browserHistory = {
        replace: expect.createSpy()
      }
      confirm = expect.createSpy().andReturn(true);
    });

    it('should render pick note message', function() {
      const wrapper = mount(<Editor confirm={confirm} browserHistory={browserHistory} call={call} />);

      expect(wrapper.find('p').text()).toBe('Pick or Create a note to get started.');
    });

    it('should render note not found', function() {
      const selectedNoteId = 'notANote';
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={selectedNoteId} confirm={confirm}/>);

      expect(wrapper.find('p').text()).toBe('Note not found')
    });

    it('should delete selected note', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} confirm={confirm}/>);

      const button = wrapper.find('button');
      button.simulate('click');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
      expect(browserHistory.replace).toHaveBeenCalledWith('/dashboard');
    });

    it('should update selected note body', function() {
      let newBody = 'New body text';
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} confirm={confirm}/>);

      const textArea = wrapper.find('textarea');
      textArea.simulate('change', {
        target: {
          value: newBody
        }
      });

      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody} );
    });

    it('should update selected note title', function() {
      let newTitle = 'New title text';
      const wrapper = mount(<Editor confirm={confirm} browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);

      const input = wrapper.find('input');
      input.simulate('change', {
        target: {
          value: newTitle
        }
      });

      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle} );
    });

    it('should set state for new selected note', function(){
      let note = notes[0];
      const wrapper = mount(<Editor confirm={confirm} browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedNoteId: note._id,
        note
      });
      let currentState = wrapper.state();
      expect(currentState.title).toBe(note.title);
      expect(currentState.body).toBe(note.body);
    });

    it('should not set state if note prop not provided', function(){
      let note = notes[0];
      const wrapper = mount(<Editor confirm={confirm} browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedNoteId: note._id,
      });
      let currentState = wrapper.state();
      expect(currentState.title).toBe('');
      expect(currentState.body).toBe('');
    });


  });

}
