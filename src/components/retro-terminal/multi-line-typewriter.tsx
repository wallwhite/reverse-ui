import React, { useState } from 'react';
import { TypeWritter } from '../type-writter';
import { TypingCursor } from './typing-cursor';

interface Line {
  text: string;
  delay?: number;
  speed?: number;
  noBreak?: boolean;
}

interface MultiLineTypewriterProps {
  lines: Line[];
  showCursor?: boolean;
}

const MultiLineTypewriter: React.FC<MultiLineTypewriterProps> = ({ lines, showCursor }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const handleLineComplete = () => {
    if (currentLineIndex < lines.length - 1) {
      setTimeout(() => {
        setCurrentLineIndex((prevIndex) => prevIndex + 1);
      }, lines[currentLineIndex].delay || 0);
    }
  };

  return (
    <div
      style={{
        whiteSpace: 'pre-line',
      }}
    >
      {lines.slice(0, currentLineIndex + 1).map((line, index) => (
        <React.Fragment key={index}>
          {index > 0 && !lines[index - 1].noBreak && <br />}
          <TypeWritter
            text={line.text}
            speed={line.speed}
            delay={line.delay}
            onComplete={index === currentLineIndex ? handleLineComplete : undefined}
          />
        </React.Fragment>
      ))}
      {showCursor && <TypingCursor />}
    </div>
  );
};

export { MultiLineTypewriter };
