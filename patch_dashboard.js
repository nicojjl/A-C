import fs from 'fs';

let content = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');

content = content.replace(
  "<UpdatesSection onOpenCCourse={onOpenCCourse} />",
  "<UpdatesSection onOpenCCourse={onOpenCCourse} onOpenCChapter={onSelectCChapter} />"
);

fs.writeFileSync('src/components/DashboardView.tsx', content);
