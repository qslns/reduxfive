'use client';

import { useEffect, useState } from 'react';

export default function DebugPanel() {
  const [clickLog, setClickLog] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 개발 환경에서만 디버그 패널 표시
    if (process.env.NODE_ENV !== 'development') return;

    setIsVisible(true);

    // 모든 클릭 이벤트 모니터링
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link) {
        const logEntry = `[${new Date().toISOString().substr(11, 8)}] Link clicked: ${link.href} | Prevented: ${e.defaultPrevented}`;
        setClickLog(prev => [...prev.slice(-9), logEntry]);

      }
    };

    // Capture phase에서 이벤트 감지
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '400px',
        maxHeight: '300px',
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#00ff00',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '11px',
        fontFamily: 'monospace',
        zIndex: 99999,
        overflow: 'auto'
      }}
    >
      <div style={{ marginBottom: '10px', color: '#ffff00' }}>
        🔍 Click Event Monitor
      </div>
      {clickLog.map((log, index) => (
        <div key={index} style={{ marginBottom: '2px' }}>
          {log}
        </div>
      ))}
      {clickLog.length === 0 && (
        <div style={{ color: '#888' }}>No clicks detected yet...</div>
      )}
    </div>
  );
}