import React from 'react';
import { createRoot } from 'react-dom/client';
import YukomonFishCard from '../../YukomonFishCard.jsx';
import '../../ReflectiveCard.css';
import './preview.css';

function App() {
  return (
    <main className="preview-shell">
      <YukomonFishCard
        number="YK-001"
        rarity="SR"
        name="小丑鱼"
        englishName="Clownfish"
        description="在海葵之间穿梭的珊瑚礁精灵"
        enableTilt
        intro
      />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
