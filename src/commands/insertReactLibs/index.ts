import * as vscode from "vscode";

export const insertReactLibs = (): vscode.Disposable => {
  return vscode.commands.registerCommand(
    "spr-shortcuts.reactLibs",
    async () => {
      const editor = vscode.window.activeTextEditor;
      console.log(editor, "editor");

      if (!editor) {
        return;
      }

      const importText = `import { ReactElement, memo } from 'react' \n`;
      await editor.insertSnippet(
        new vscode.SnippetString(importText),
        new vscode.Position(0, 0)
      );
    }
  );
};
