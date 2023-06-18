import * as vscode from "vscode";
import { readFileSync, writeFileSync } from "fs";

const getFileContent = (componentName: string) => {
  return `
    import { ReactElement } from 'react';

    import { memo } from '@sprinklr/modules/infra/utils/memo';

    const ${componentName} = ({}): ReactElement=> {

        return <></>;
    }

    const Memoed = memo(${componentName});
    export { Memoed as ${componentName} };
    `;
};

const writeMemoComponent = (filePath: string, componentName: string) => {
  writeFileSync(filePath, getFileContent(componentName));
};

export const insertMemoComponent = async (): Promise<vscode.Disposable> => {
  return vscode.commands.registerCommand(
    "spr-shortcuts.insertMemoComponent",
    async () => {
      const componentName = await vscode.window.showInputBox({
        placeHolder: "Enter component name",
        prompt: "Please enter action component name",
        value: "Component",
      });

      const filePath = vscode.window.activeTextEditor?.document.fileName;

      if (componentName && filePath) {
        writeMemoComponent(filePath, componentName);
      }
    }
  );
};
