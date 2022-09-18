import * as vscode from "vscode";
import { mkdirSync } from "fs";

import { getCamelCase } from "../../helpers/getCamelCase";
import { insertFiles } from "./helpers/insertFiles";

export const insertActionComponent = (): vscode.Disposable =>
  vscode.commands.registerCommand("spr-shortcuts.actionComponent", async () => {
    const filePath = vscode.window.activeTextEditor?.document.fileName;
    if (!filePath) {
      return;
    }

    const location = await vscode.window.showInputBox({
      placeHolder: "enter location",
      prompt: "Please Enter location where you want to insert action component",
      value: filePath,
    });

    if (!location) {
      return;
    }

    const componentName = await vscode.window.showInputBox({
      placeHolder: "Enter component name",
      prompt: "Please enter action component name",
      value: "Component",
    });

    if (!componentName) {
      return;
    }

    const directorLocation = `${location}/${getCamelCase(
      componentName
    )}`.replace("//", "/");

    try {
      mkdirSync(directorLocation, {});
    } catch {}

    const tokens = directorLocation.split("/");

    insertFiles({ basePath: tokens, componentName });
  });
