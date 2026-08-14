const fs = require('fs');
let code = fs.readFileSync('src/components/Sidebar.tsx', 'utf8');

code = code.replace(
  'shrink-0 overflow-hidden">',
  'shrink-0 overflow-y-auto overflow-x-hidden scrollbar-thin">'
);

code = code.replace(
  '<div className="overflow-y-auto flex-1 min-h-0 p-3 space-y-2 scroll-smooth">',
  '<div className="flex-1 p-3 space-y-2">'
);

fs.writeFileSync('src/components/Sidebar.tsx', code, 'utf8');
console.log('Sidebar scroll patched successfully.');
