import chalk from 'chalk';

const components = {
  'Core': [
    'Button - Triggers actions and events',
    'Input - Text input with validation',
    'Select - Dropdown selection',
    'Checkbox - Boolean selection',
    'Radio - Single selection from group',
    'Switch - Toggle on/off',
    'Slider - Range input',
    'DatePicker - Date selection',
  ],
  'Layout': [
    'Card - Content container',
    'Divider - Visual separator',
    'Modal - Dialog overlay',
    'Accordion - Expandable sections',
    'Tabs - Content panels',
  ],
  'Data Display': [
    'Table - Basic data table',
    'DataTable - Table with search, pagination, sorting',
    'Avatar - User representation',
    'Chip - Tags and badges',
    'ListItem - List entries',
    'EmptyState - Empty content placeholder',
    'Loader - Loading indicator',
  ],
  'Feedback': [
    'Alert - Inline messages',
    'Toast - Temporary notifications',
    'HelperText - Form helper text',
    'Tooltip - Contextual hints',
  ],
  'Navigation': [
    'Breadcrumb - Navigation path',
    'SideNav - Sidebar navigation',
    'BottomNav - Mobile tab bar',
    'AppBar - Top navigation bar',
    'Menu - Dropdown menu',
  ],
  'Composite': [
    'SearchInput - Search with debounce + clear',
    'ConfirmModal - Confirmation dialog',
    'FormField - Input with label + error',
    'PageHeader - Page title + breadcrumbs + actions',
    'Form - Form with validation',
  ],
  'File': [
    'Upload - File upload with drag-and-drop',
  ],
};

export function listComponents() {
  console.log();
  console.log(chalk.bold('Switch Design System Components'));
  console.log(chalk.gray('─'.repeat(40)));
  console.log();

  for (const [category, items] of Object.entries(components)) {
    console.log(chalk.cyan.bold(category));
    for (const item of items) {
      const [name, description] = item.split(' - ');
      console.log(`  ${chalk.green('•')} ${chalk.white(name)} ${chalk.gray('- ' + description)}`);
    }
    console.log();
  }

  console.log(chalk.gray('Import:'), 'import { ComponentName } from \'@switch/react\';');
  console.log();
}
