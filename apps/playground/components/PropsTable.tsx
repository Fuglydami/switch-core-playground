interface Prop {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: Prop[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 14,
        background: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
      }}>
        <thead>
          <tr style={{ background: '#f9fafb' }}>
            {['Prop', 'Type', 'Default', 'Description'].map((h) => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr key={prop.name} style={{ borderBottom: i < props.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
              <td style={{ padding: '10px 16px', fontFamily: 'var(--switch-typography-font-family-mono)', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
                {prop.name}
                {prop.required && <span style={{ color: 'var(--switch-color-semantic-danger)', marginLeft: 2 }}>*</span>}
              </td>
              <td style={{ padding: '10px 16px', fontFamily: 'var(--switch-typography-font-family-mono)', fontSize: 12, color: 'var(--switch-color-semantic-interactive)' }}>
                {prop.type}
              </td>
              <td style={{ padding: '10px 16px', fontFamily: 'var(--switch-typography-font-family-mono)', fontSize: 12, color: '#9ca3af' }}>
                {prop.default ?? '—'}
              </td>
              <td style={{ padding: '10px 16px', color: '#374151' }}>
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
