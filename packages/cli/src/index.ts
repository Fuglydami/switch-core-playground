#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { createPage } from './commands/create-page.js';
import { addComponent } from './commands/add-component.js';
import { listComponents } from './commands/list.js';

const program = new Command();

program
  .name('switch')
  .description('CLI tools for Switch Design System')
  .version('1.0.0');

program
  .command('create-page <name>')
  .description('Create a new page with Switch components')
  .option('-t, --template <template>', 'Page template (dashboard, form, table, settings, auth)', 'blank')
  .option('-d, --dir <directory>', 'Target directory', './src/pages')
  .action(createPage);

program
  .command('add-component <name>')
  .description('Add a component scaffold using Switch components')
  .option('-d, --dir <directory>', 'Target directory', './src/components')
  .action(addComponent);

program
  .command('list')
  .description('List all available Switch components')
  .action(listComponents);

program
  .command('help-llm')
  .description('Output component reference for LLM context')
  .action(() => {
    console.log(getLLMContext());
  });

program.parse();

function getLLMContext() {
  return `
# Switch Design System - Quick Reference

## Import
\`\`\`tsx
import { Button, Input, Card, Modal, ... } from '@switch/react';
\`\`\`

## Core Components

### Button
<Button variant="primary|secondary|tertiary|outline|link" colorScheme="activeBlue|popBlue|primaryBlue|monochrome" size="small|medium|large" isLoading disabled fullWidth leftIcon rightIcon>Label</Button>

### Input
<Input label="Label" placeholder="Placeholder" value={value} onChange={onChange} size="small|medium|large" isError errorMessage="Error" leadingIcon trailingIcon fullWidth disabled />

### Card
<Card variant="elevated|outlined|filled" padding="none|small|medium|large">{children}</Card>

### Modal
<Modal isOpen={boolean} onClose={fn} title="Title" size="small|medium|large">{children}</Modal>

### Table
<Table columns={[{id, header, accessor, render}]} data={[]} selectable onRowClick={fn} />

### DataTable (with search + pagination)
<DataTable columns={[]} data={[]} searchable paginated rowsPerPageOptions={[10,25,50]} />

### Form (with validation)
<Form onSubmit={fn} validationSchema={{email: [validators.required(), validators.email()]}}>
  <Form.Field name="email" label="Email" type="email" rules={[validators.required(), validators.email()]} />
  <Form.Submit><Button type="submit">Submit</Button></Form.Submit>
</Form>

### SearchInput
<SearchInput placeholder="Search..." onSearch={fn} debounceMs={300} isLoading />

### ConfirmModal
<ConfirmModal isOpen={boolean} onClose={fn} onConfirm={fn} title="Confirm" description="Are you sure?" variant="primary|danger" />

### PageHeader
<PageHeader title="Title" subtitle="Subtitle" breadcrumbs={[]} actions={<Button>Action</Button>} onBack={fn} />

## Validators
validators.required(), validators.email(), validators.minLength(n), validators.maxLength(n), validators.pattern(regex, msg), validators.match(fieldName), validators.phone(), validators.number(), validators.min(n), validators.max(n)
`.trim();
}
