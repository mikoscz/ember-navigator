'use babel';

export default class ComponentInspector {
  inspect() {
    let editor = atom.workspace.getActiveTextEditor();
    let options = {};
    options.wordRegex = /^[	 ]*$|[^\s\\\(\)"':,\.;<>~!@#\$%\^&\*\|\+=\[\]\{\}`\?\…]+|[\/\\\(\)"':,\.;<>~!@#\$%\^&\*\|\+=\[\]\{\}`\?\-…]/;
    let cursor = editor.getCursors()[0];
    let range = cursor.getCurrentWordBufferRange(options);
    let componentName = editor.getTextInBufferRange(range);

    let projectPath = atom.project.getPaths()[0];

    let compnentPath = `${projectPath}/app/components/${componentName}/template.hbs`
    atom.workspace.open(compnentPath);
  }
}
