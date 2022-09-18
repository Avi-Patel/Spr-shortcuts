export const getComponentSnippet = ({
  componentName,
}: {
  componentName: string;
}) => {
  return `import { ReactElement, memo } from 'react';

    const ${componentName} = ({}): ReactElement => {
        return <></>;
    }

    const Memoed = memo(${componentName});
    Memoed.displayName = componentName;
    export { Memoed as ${componentName} };
  `;
};
