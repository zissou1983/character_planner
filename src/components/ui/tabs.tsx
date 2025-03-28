import { ReactNode } from 'react';

export function Tabs({ value, children, className = '' }: { value: string; children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function TabsList({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, children, className = '', onClick }: { value: string; children: ReactNode; className?: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`px-2 py-1 rounded ${className}`}>
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = '' }: { value: string; children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}