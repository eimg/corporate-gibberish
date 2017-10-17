'use babel';

import CorporateGibberishView from './corporate-gibberish-view';
import Gibberish from './gibberish.js';
import { CompositeDisposable } from 'atom';

export default {

  corporateGibberishView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.corporateGibberishView = new CorporateGibberishView(state.corporateGibberishViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.corporateGibberishView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'corporate-gibberish:generate': () => this.generate()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.corporateGibberishView.destroy();
  },

  serialize() {
    return {
      corporateGibberishViewState: this.corporateGibberishView.serialize()
    };
  },

  generate() {
      let editor;

      if (editor = atom.workspace.getActiveTextEditor()) {
        let selection = editor.getSelectedText() || 'DummyCorp';
        let randomIndex = Math.floor(Math.random() * Gibberish.length);
        let randomGibberish = Gibberish[randomIndex].replace(/@placeholder/ig, selection);

        editor.insertText(randomGibberish + " ");
      }
  }

};
