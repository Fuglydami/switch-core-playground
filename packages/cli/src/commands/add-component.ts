import { mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import chalk from 'chalk';

interface AddComponentOptions {
  dir: string;
}

export async function addComponent(name: string, options: AddComponentOptions) {
  const { dir } = options;

  const pascalName = toPascalCase(name);
  const targetDir = join(process.cwd(), dir, pascalName);

  // Check if directory exists
  try {
    await access(targetDir);
    console.error(chalk.red(`Directory already exists: ${targetDir}`));
    process.exit(1);
  } catch {
    // Directory doesn't exist, continue
  }

  // Create directory
  await mkdir(targetDir, { recursive: true });

  // Generate component file
  const componentContent = `import React from 'react';
import { Card, Button } from '@switch/react';
import styles from './${pascalName}.module.css';

export interface ${pascalName}Props {
  /** Add your props here */
  className?: string;
}

export function ${pascalName}({ className }: ${pascalName}Props) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <Card>
        <h2>${pascalName}</h2>
        <p>Your component content here</p>
        <Button>Action</Button>
      </Card>
    </div>
  );
}
`;

  // Generate CSS module
  const cssContent = `.wrapper {
  /* Add your styles here */
}
`;

  // Generate index file
  const indexContent = `export { ${pascalName} } from './${pascalName}';
export type { ${pascalName}Props } from './${pascalName}';
`;

  // Write files
  await writeFile(join(targetDir, `${pascalName}.tsx`), componentContent);
  console.log(chalk.green('✓'), chalk.gray(`Created ${pascalName}.tsx`));

  await writeFile(join(targetDir, `${pascalName}.module.css`), cssContent);
  console.log(chalk.green('✓'), chalk.gray(`Created ${pascalName}.module.css`));

  await writeFile(join(targetDir, 'index.ts'), indexContent);
  console.log(chalk.green('✓'), chalk.gray(`Created index.ts`));

  console.log();
  console.log(chalk.green('✓'), `Component ${chalk.bold(pascalName)} created successfully!`);
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}
