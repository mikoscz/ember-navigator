'use babel';

export default class ComponentToggler {

  constructor() {
    this.curentWorkspace = atom.workspace;
  }

  toggle() {
    try {
      atom.workspace.open(this._newFilePath()).then((editor) => {
        if (editor.isEmpty()) {
          editor.setText(this._defaultTemplate());
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  _currentItem() {
    let currentItem = this.curentWorkspace.getActivePaneItem();
    if (currentItem) {
      return currentItem;
    } else {
      throw 'No open pane';
    }
  }

  _openFilePath() {
    return this._currentItem().buffer.file.path;
  }

  _isTemplate() {
    return this._openFilePath().match(/(template\.hbs)/g);
  }

  _isComponent() {
    return this._openFilePath().match(/(component\.js)/g);
  }

  _newFilePath() {
    if (this._isTemplate()) {
      return this._openFilePath().replace('template.hbs', 'component.js');
    } else if (this._isComponent()) {
      return this._openFilePath().replace('component.js', 'template.hbs');
    } else {
      throw 'This is not component';
    }
  }

  _defaultTemplate() {
    if (this._isTemplate()) {
      return "{{yield}}";
    } else {
      return(
      `import Ember from 'ember';

export default Ember.Component.extend({
  // body
});`);
    }
  }
}
