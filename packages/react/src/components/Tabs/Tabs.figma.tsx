import figma from '@figma/code-connect';
import { Tabs } from './Tabs';

/**
 * Figma Code Connect — Web Tabs
 *
 * TODO: Replace the placeholder node-id below with the real one from Figma.
 * Steps:
 * 1. Open the Switch-Core Figma file
 * 2. Select the Tabs component set/frame
 * 3. Copy the URL — it will look like: figma.com/design/gkgqkAe2ytJh561w7QsIlb/...?node-id=123-456
 * 4. Replace "TABS_NODE_ID" below with the node-id value (e.g., "123-456" → "123:456")
 */
figma.connect(
  Tabs,
  'https://www.figma.com/design/gkgqkAe2ytJh561w7QsIlb/Switch-Core?node-id=TABS_NODE_ID', // TODO: update node-id
  {
    props: {
      variant: figma.enum('Variant', {
        default: 'default',
        'icon-leading': 'icon-leading',
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
