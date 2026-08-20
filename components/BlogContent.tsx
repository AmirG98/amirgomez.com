'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';

interface KPIWidget {
  title: string;
  metrics: {
    value: string;
    label: string;
    color: 'orange' | 'green' | 'blue' | 'purple';
  }[];
}

interface BlogContentProps {
  content: string;
  kpiWidget?: KPIWidget;
}

export default function BlogContent({ content, kpiWidget }: BlogContentProps) {
  
  // Function to generate ID from heading text
  const generateId = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  // Function to parse inline formatting
  const parseInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Parse markdown content and render with proper IDs for headings
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let currentIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('# ')) {
        // H1
        const text = line.substring(2);
        const id = generateId(text);
        elements.push(
          <h1 key={currentIndex++} id={id} className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-6 mt-14 first:mt-0 text-foreground">
            {text}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        // H2
        const text = line.substring(3);
        const id = generateId(text);
        elements.push(
          <h2 key={currentIndex++} id={id} className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4 mt-12 text-foreground">
            {text}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        // H3
        const text = line.substring(4);
        const id = generateId(text);
        elements.push(
          <h3 key={currentIndex++} id={id} className="font-display text-xl md:text-2xl font-semibold tracking-tight mb-3 mt-9 text-foreground">
            {text}
          </h3>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        // Bold text formula or important note
        const text = line.substring(2, line.length - 2);
        elements.push(
          <div key={currentIndex++} className="bg-brand-50 dark:bg-brand-900/20 border-l-4 border-brand-500 p-4 my-6 rounded-r-lg">
            <div className="font-semibold text-brand-800 dark:text-brand-200">{text}</div>
          </div>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        // List items - collect consecutive list items
        const listItems = [];
        let j = i;
        while (j < lines.length && (lines[j].trim().startsWith('- ') || lines[j].trim().startsWith('* '))) {
          listItems.push(lines[j].trim().substring(2));
          j++;
        }
        i = j - 1; // Adjust loop counter
        
        elements.push(
          <ul key={currentIndex++} className="list-disc list-inside mb-6 space-y-2 text-foreground/80">
            {listItems.map((item, idx) => (
              <li key={idx}>{parseInlineFormatting(item)}</li>
            ))}
          </ul>
        );
      } else if (line.length > 0 && !line.startsWith('#')) {
        // Regular paragraph - parse inline bold formatting
        elements.push(
          <p key={currentIndex++} className="mb-6 leading-relaxed text-foreground/80 text-lg">
            {parseInlineFormatting(line)}
          </p>
        );
      } else if (line.length === 0) {
        // Empty line - add spacing
        elements.push(<div key={currentIndex++} className="mb-4"></div>);
      }
    }

    return elements;
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'orange':
        return 'text-brand-600';
      case 'green':
        return 'text-green-600';
      case 'blue':
        return 'text-blue-600';
      case 'purple':
        return 'text-purple-600';
      default:
        return 'text-brand-600';
    }
  };

  return (
    <div className="max-w-none">
      {/* Render custom KPI widget if provided */}
      {kpiWidget && (
        <div className="bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20 rounded-2xl border border-border-default p-8 mb-8 text-center">
          <BarChart3 className="w-8 h-8 mx-auto mb-4 text-brand-600" aria-hidden="true" />
          <h4 className="font-display text-xl font-bold text-brand-800 dark:text-brand-200 mb-2">{kpiWidget.title}</h4>
          <div className={`grid ${kpiWidget.metrics.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 mt-6`}>
            {kpiWidget.metrics.map((metric, index) => (
              <div key={index} className="bg-surface-elevated border border-border-subtle rounded-lg p-4">
                <div className={`text-2xl font-bold ${getColorClasses(metric.color)}`}>{metric.value}</div>
                <div className="text-sm text-foreground/60">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {renderContent(content)}
    </div>
  );
}