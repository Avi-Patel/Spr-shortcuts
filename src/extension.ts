import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("spr-shortcuts.search", () => {
      vscode.window.showOpenDialog();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("spr-shortcuts.getDate", () => {
      vscode.window.showInformationMessage(new Date().toDateString());
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
