import * as vscode from "vscode";

import { currentDate } from "./commands/currentDate";
import { insertReactLibs } from "./commands/insertReactLibs";
import { switchLiteEnv } from "./commands/switchLiteEnv";
import { insertMemoComponent } from "./commands/insertMemoComponent";

export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("spr-shortcuts.hello", () => {
      vscode.window.showInformationMessage("Hey there!");
    })
  );

  const currentDateCommand = currentDate();
  const insertReactLibsCommand = insertReactLibs();

  const switchLiteEnvCommand = await switchLiteEnv();
  const insertMemoComponentCommand = await insertMemoComponent();

  context.subscriptions.push(
    currentDateCommand,
    insertReactLibsCommand,
    switchLiteEnvCommand,
    insertMemoComponentCommand
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
