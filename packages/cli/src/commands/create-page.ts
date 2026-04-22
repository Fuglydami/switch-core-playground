import { mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import chalk from 'chalk';
import { templates } from '../templates/index.js';

interface CreatePageOptions {
  template: string;
  dir: string;
}

export async function createPage(name: string, options: CreatePageOptions) {
  const { template, dir } = options;

  const templateFn = templates[template as keyof typeof templates];
  if (!templateFn) {
    console.error(chalk.red(`Unknown template: ${template}`));
    console.log(chalk.gray(`Available templates: ${Object.keys(templates).join(', ')}`));
    process.exit(1);
  }

  const pascalName = toPascalCase(name);
  const kebabName = toKebabCase(name);
  const targetDir = join(process.cwd(), dir, kebabName);

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

  // Generate files
  const files = templateFn(pascalName, kebabName);

  for (const [filename, content] of Object.entries(files)) {
    const filePath = join(targetDir, filename);
    await writeFile(filePath, content);
    console.log(chalk.green('✓'), chalk.gray(`Created ${filePath}`));
  }

  console.log();
  console.log(chalk.green('✓'), `Page ${chalk.bold(pascalName)} created successfully!`);
  console.log();
  console.log(chalk.gray('Next steps:'));
  console.log(chalk.gray(`  1. Import and use in your router`));
  console.log(chalk.gray(`  2. Customize the template to your needs`));
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
