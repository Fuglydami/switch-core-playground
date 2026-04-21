import figma from '@figma/code-connect';
import { Tabs } from './Tabs';

/**
 * Figma Code Connect — RN Tabs
 *
 * Replace TABS_NODE_ID with the real node-id from the Figma URL after
 * selecting the Tabs component frame:
 *   figma.com/design/<fileKey>/...?node-id=<TABS_NODE_ID>
 */
figma.connect(
  Tabs,
  'https://www.figma.com/design/gkgqkAe2ytJh561w7QsIlb/Switch-Core?node-id=TABS_NODE_ID',
  {
    props: {
      variant: figma.enum('Variant', {
        underline: 'underline',
        'icon-label': 'icon-label',
        pill: 'pill',
      }),
    },
    example: ({ variant }) => (
      <Tabs
        variant={variant}
        items={[
          { id: 'tab1', label: 'Tab 1' },
          { id: 'tab2', label: 'Tab 2' },
          { id: 'tab3', label: 'Tab 3' },
        ]}
        activeId="tab1"
        onChange={() => {}}
      />
    ),
  }
);
