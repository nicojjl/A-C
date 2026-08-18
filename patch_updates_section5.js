import fs from 'fs';

let content = fs.readFileSync('src/components/UpdatesSection.tsx', 'utf8');

content = content.replace(
  "export const UpdatesSection: React.FC<{ onOpenCCourse?: () => void }> = ({ onOpenCCourse }) => {",
  "export const UpdatesSection: React.FC<{ onOpenCCourse?: () => void, onOpenCChapter?: (chapterId: string) => void }> = ({ onOpenCCourse, onOpenCChapter }) => {"
);

content = content.replace(
  `onClick={(e) => {
      if (e.target instanceof HTMLAnchorElement && e.target.getAttribute('href') === '#playground') {
        e.preventDefault();
        if (onOpenCCourse) onOpenCCourse();
      }
    }}`,
  `onClick={(e) => {
      if (e.target instanceof HTMLAnchorElement) {
        const href = e.target.getAttribute('href');
        if (href === '#playground' && onOpenCCourse) {
          e.preventDefault();
          onOpenCCourse();
        } else if (href?.startsWith('#c-course-') && onOpenCChapter) {
          e.preventDefault();
          const chapterId = href.replace('#c-course-', '');
          onOpenCChapter(chapterId);
        }
      }
    }}`
);

fs.writeFileSync('src/components/UpdatesSection.tsx', content);
