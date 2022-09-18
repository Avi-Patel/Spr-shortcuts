import * as vscode from "vscode";

export const currentDate = (): vscode.Disposable => {
  return vscode.commands.registerCommand("spr-shortcuts.getDate", () => {
    vscode.window.showInformationMessage(new Date().toDateString());
  });
};
