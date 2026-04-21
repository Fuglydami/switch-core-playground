import figma from '@figma/code-connect';
import { ListItem } from './ListItem';

/**
 * Figma Code Connect — Web ListItem
 *
 * TODO: Replace the placeholder node-id below with the real one from Figma.
 * Steps:
 * 1. Open the Switch-Core Figma file
 * 2. Select the ListItem component set/frame
 * 3. Copy the URL — it will look like: figma.com/design/gkgqkAe2ytJh561w7QsIlb/...?node-id=123-456
 * 4. Replace "LISTITEM_NODE_ID" below with the node-id value (e.g., "123-456" → "123:456")
 */
figma.connect(
  ListItem,
  'https://www.figma.com/design/gkgqkAe2ytJh561w7QsIlb/Switch-Core?node-id=LISTITEM_NODE_ID', // TODO: update node-id
  {
    props: {
      variant: figma.enum('Variant', {
        label: 'label',
        'label-avatar': 'label-avatar',
        'label-icon': 'label-icon',
        'label-control': 'label-control',
      }),
      label: figma.string('Label'),
      sublabel: figma.string('Sublabel'),
    },
    example: ({ variant, label, sublabel }) => (
      <ListItem
        variant={variant}
        label={label}
        sublabel={sublabel}
        avatar={{ initials: 'AB' }}
      />
    ),
  }
);
