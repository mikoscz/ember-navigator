'use babel';

import EmberNavigatorView from './ember-navigator-view';
import { CompositeDisposable } from 'atom';

export default {

  emberNavigatorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.emberNavigatorView = new EmberNavigatorView(state.emberNavigatorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.emberNavigatorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ember-navigator:toggleComponent': () => this.toggleComponent()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.emberNavigatorView.destroy();
  },

  serialize() {
    return {
      emberNavigatorViewState: this.emberNavigatorView.serialize()
    };
  },

  toggleComponent() {
    let activePaneItem = atom.workspace.getActivePaneItem();
    let currentFilePath = activePaneItem.buffer.file.path;
    let sth = currentFilePath.match(/(template\.hbs)/g);
    let openPath;

    if (sth) {
      openPath = currentFilePath.replace('template.hbs', 'component.js');
    } else {
      openPath = currentFilePath.replace('component.js', 'template.hbs');
    }

    atom.workspace.open(openPath)
  }

};
