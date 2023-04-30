import * as vscode from "vscode";
import { readFileSync, writeFileSync } from "fs";
import * as path from "path";

let folderPath = vscode.workspace.workspaceFolders?.[0].uri;

const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.path;
const envLocalPath = `${workspacePath}/apps/self-serve-app/.env.local`;
const envDevPath = `${workspacePath}/apps/self-serve-app/.env.development`;

const envToDomainSuffixName = {
  qa4: "-qa4",
  qa5: "-qa5",
  prod: "",
} as Record<string, string>;

const updatePublicApiUrl = (data: string, env: string): string => {
  const lines = [
    "NEXT_PUBLIC_API_URL=https://lite-qa4.sprinklr.com",
    "NEXT_PUBLIC_API_URL=https://lite-qa5.sprinklr.com",
    "NEXT_PUBLIC_API_URL=https://lite.sprinklr.com",
  ];

  let newData = data;
  lines.forEach((line) => {
    if (
      line !==
      `NEXT_PUBLIC_API_URL=https://lite${envToDomainSuffixName[env]}.sprinklr.com`
    ) {
      newData = newData.replace(
        line,
        `NEXT_PUBLIC_API_URL=https://lite${envToDomainSuffixName[env]}.sprinklr.com`
      );
    }
  });

  return newData;
};

const updateCdnUrl = (data: string, env: string): string => {
  const lines = [
    "CDN_URL=https://sprcdn-qa4.sprinklr.com",
    "CDN_URL=https://sprcdn-qa5.sprinklr.com",
    "CDN_URL=https://sprcdn.sprinklr.com",
  ];

  let newData = data;
  lines.forEach((line) => {
    if (
      line !==
      `CDN_URL=https://sprcdn${envToDomainSuffixName[env]}.sprinklr.com`
    ) {
      newData = newData.replace(
        line,
        `CDN_URL=https://sprcdn${envToDomainSuffixName[env]}.sprinklr.com`
      );
    }
  });

  return newData;
};

const updatePublicAuthUrl = (data: string, env: string): string => {
  const lines = [
    "NEXT_PUBLIC_AUTH_URL=https://lite-qa4.sprinklr.com",
    "NEXT_PUBLIC_AUTH_URL=https://lite-qa5.sprinklr.com",
    "NEXT_PUBLIC_AUTH_URL=https://lite.sprinklr.com",
  ];

  let newData = data;
  lines.forEach((line) => {
    if (
      line !==
      `NEXT_PUBLIC_AUTH_URL=https://lite${envToDomainSuffixName[env]}.sprinklr.com`
    ) {
      newData = newData.replace(
        line,
        `NEXT_PUBLIC_AUTH_URL=https://lite${envToDomainSuffixName[env]}.sprinklr.com`
      );
    }
  });

  return newData;
};

const updateEnvLocalFile = (env: string) => {
  const data = readFileSync(envLocalPath, {
    encoding: "utf-8",
  });

  const newData = updateCdnUrl(updatePublicApiUrl(data, env), env);

  writeFileSync(envLocalPath, newData);
};

const updateEnvDevFile = (env: string) => {
  const data = readFileSync(envDevPath, {
    encoding: "utf-8",
  });
  const newData = updatePublicAuthUrl(data, env);
  writeFileSync(envDevPath, newData);
};

export const switchToEnv = (env: string) => {
  updateEnvLocalFile(env);
  updateEnvDevFile(env);
};

export const switchLiteEnv = async (): Promise<vscode.Disposable> => {
  return vscode.commands.registerCommand(
    "spr-shortcuts.switchLiteEnv",
    async () => {
      const env = await vscode.window.showQuickPick([
        {
          label: "qa4",
          description: "Switch to qa4",
          // target: vscode.ConfigurationTarget.Global,
        },
        {
          label: "qa5",
          description: "Switch to qa5",
          // target: vscode.ConfigurationTarget.Workspace,
        },
        {
          label: "prod",
          description: "Switch to prod",
          // target: vscode.ConfigurationTarget.Workspace,
        },
      ]);

      if (env) {
        switchToEnv(env.label);
      }
    }
  );
};
