import * as vscode from "vscode";

import { currentDate } from "./commands/currentDate";
import { insertReactLibs } from "./commands/insertReactLibs";
import { insertActionComponent } from "./commands/insertActionComponent";
import { switchLiteEnv } from "./commands/switchLiteEnv";

export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("spr-shortcuts.hello", () => {
      vscode.window.showInformationMessage("Hey there!");
    })
  );

  const currentDateCommand = currentDate();
  const insertReactLibsCommand = insertReactLibs();
  const insertActionComponentCommand = insertActionComponent();

  const switchLiteEnvCommand = await switchLiteEnv();

  context.subscriptions.push(
    currentDateCommand,
    insertReactLibsCommand,
    insertActionComponentCommand,
    switchLiteEnvCommand
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
