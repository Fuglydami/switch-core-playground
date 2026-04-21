import figma from '@figma/code-connect';
import { ListItem } from './ListItem';

/**
 * Figma Code Connect — RN ListItem
 *
 * Replace LISTITEM_NODE_ID with the real node-id from the Figma URL after
 * selecting the ListItem component frame:
 *   figma.com/design/<fileKey>/...?node-id=<LISTITEM_NODE_ID>
 */
figma.connect(
  ListItem,
  'https://www.figma.com/design/gkgqkAe2ytJh561w7QsIlb/Switch-Core?node-id=LISTITEM_NODE_ID',
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
