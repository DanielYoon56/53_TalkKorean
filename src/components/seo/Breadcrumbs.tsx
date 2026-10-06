import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
}

export default function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="w-full text-xs text-neutral-500 py-3">
      <ol className="flex flex-wrap items-center space-x-1.5 sm:space-x-2">
        <li className="flex items-center">
          <a
            href="/"
            onClick={(e) => handleClick(e, '/')}
            className="hover:text-editorial-text transition-colors flex items-center space-x-1 text-neutral-500 font-medium"
          >
            <Home className="w-3.5 h-3.5 text-neutral-400" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </a>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center space-x-1.5 sm:space-x-2">
              <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" aria-hidden="true" />
              {isLast ? (
                <span className="text-editorial-text font-bold truncate max-w-[220px] sm:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.path}
                  onClick={(e) => handleClick(e, item.path)}
                  className="hover:text-editorial-text transition-colors text-neutral-500 font-medium truncate max-w-[160px] sm:max-w-none"
                >
                  {item.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
