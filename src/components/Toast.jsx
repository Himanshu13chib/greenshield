import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toasts } = useApp();

  const icons = {
    success: <CheckCircle size={18} color="var(--success)" />,
    error: <XCircle size={18} color="var(--danger)" />,
    warning: <AlertTriangle size={18} color="var(--warning)" />,
    info: <Info size={18} color="var(--info)" />,
  };

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          {icons[toast.type] || icons.info}
          <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', flex: 1 }}>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
