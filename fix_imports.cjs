const fs = require('fs');
let code = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

const importStr = "import { Zap, Terminal, GraduationCap, ArrowRight, Sparkles, Trophy, Flame, Award, FileText } from 'lucide-react';";
const importStrRepl = "import { Zap, Terminal, GraduationCap, ArrowRight, Sparkles, Trophy, Flame, Award, FileText, Layers } from 'lucide-react';";

if (code.includes(importStr)) {
    code = code.replace(importStr, importStrRepl);
    fs.writeFileSync('src/components/DashboardView.tsx', code, 'utf8');
    console.log('Imports fixed.');
} else {
    console.log('Could not find import string.');
}
