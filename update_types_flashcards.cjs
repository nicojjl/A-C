const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

const newTypes = `
export interface Flashcard {
  id: string;
  category: 'sintaxis' | 'punteros' | 'memoria' | 'archivos' | 'conceptos';
  front: string;
  backMarkdown: string;
  codeSnippet?: string;
}
`;

if (!code.includes('export interface Flashcard')) {
  fs.writeFileSync('src/types.ts', code + '\n' + newTypes);
  console.log('Updated types.ts with Flashcard');
}
