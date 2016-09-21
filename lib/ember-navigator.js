'use babel';

import { CompositeDisposable } from 'atom';
import EmberNavigatorView from './ember-navigator-view';
import ComponentToggler from './toggler/component-toggler';
import ComponentInspector from './inspector/component-inspector';

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
      'ember-navigator:toggleComponent': () => this.toggleComponent(),
      'ember-navigator:toggleInspector': () => this.toggleInspector(),
    }));
    this.toggler = new ComponentToggler();
    this.inspector = new ComponentInspector();
  },

  deactivate() {
    this.toggler.destroy();
    this.inspector.destroy();
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
    this.toggler.toggle();
  },

  toggleInspector() {
    this.inspector.inspect();
  }
};
