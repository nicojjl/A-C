const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

const newTypes = `
export interface LabStep {
  id: string;
  title: string;
  descriptionMarkdown: string;
  initialCode: string;
  solutionCode: string;
  hint: string;
  testCases: TestCase[];
}

export interface Laboratory {
  id: string;
  title: string;
  description: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  estimatedMinutes: number;
  steps: LabStep[];
}
`;

if (!code.includes('export interface Laboratory')) {
  fs.writeFileSync('src/types.ts', code + '\n' + newTypes);
  console.log('Updated types.ts');
}
