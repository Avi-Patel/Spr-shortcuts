import { writeFileSync } from "fs";

import { getComponentSnippet } from "../snippets/getComponentSnippet";

export const insertFiles = ({
  basePath,
  componentName,
}: {
  basePath: string[];
  componentName: string;
}): void => {
  //index
  writeFileSync(
    basePath.concat("index.ts").join("/"),
    `export { ${componentName}Manager } from './${componentName}';
`
  );

  //component
  writeFileSync(
    basePath.concat(`${componentName}.tsx`).join("/"),
    getComponentSnippet({ componentName })
  );

  //actionTypes
  writeFileSync(basePath.concat("actionTypes.ts").join("/"), "");

  //types
  writeFileSync(
    basePath.concat("types.ts").join("/"),
    `import * as ACTION_TYPES from './actionTypes'`
  );
};
