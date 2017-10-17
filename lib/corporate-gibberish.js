'use babel';

import CorporateGibberishView from './corporate-gibberish-view';
import { GibberishEN, GibberishMM, GibberishZG } from './gibberish.js';
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
      'corporate-gibberish:generateEN': () => this.generateEN(),
      'corporate-gibberish:generateMM': () => this.generateMM(),
      'corporate-gibberish:generateZG': () => this.generateZG()
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

  generate(corpName, contents) {
      let editor;

      if (editor = atom.workspace.getActiveTextEditor()) {
        let name = editor.getSelectedText() || corpName;
        let index = Math.floor(Math.random() * contents.length);
        let gibberish = contents[index].replace(/@placeholder/ig, name);
        editor.insertText(gibberish + " ");
      }
  },

  generateEN() {
      this.generate('DummyCorp', GibberishEN);
  },

  generateMM() {
      this.generate('ရွှေလီမီတက်', GibberishMM);
  },

  generateZG() {
      this.generate('ေရွြလီမီတက္', GibberishZG);
  }

};
