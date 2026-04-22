import type React from 'react';
export interface TabItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    badge?: string | number;
    disabled?: boolean;
}
export interface TabsBaseProps {
    items: TabItem[];
    activeId: string;
    onChange: (id: string) => void;
    /**
     * Tab variant style
     * - 'underline': Default style with blue underline on active tab
     * - 'icon-label': Icon on left of label with underline behavior
     * - 'pill': Filled pill-shaped background on active tab
     */
    variant?: 'underline' | 'icon-label' | 'pill';
}
//# sourceMappingURL=tabs.d.ts.map