import fs from 'fs';

let content = fs.readFileSync('src/components/UpdatesSection.tsx', 'utf8');

content = content.replace(
  "onOpenCChapter(chapterId);",
  "onOpenCChapter(chapterId);\n          setTimeout(() => {\n            const playground = document.getElementById('playground');\n            if (playground) {\n              playground.scrollIntoView({ behavior: 'smooth' });\n            }\n          }, 300);"
);

fs.writeFileSync('src/components/UpdatesSection.tsx', content);
