import fs from 'fs';

let content = fs.readFileSync('src/components/UpdatesSection.tsx', 'utf8');

// I will find where the UpdateSection component receives props, and pass it a function to open the C course.
// Wait, UpdatesSection doesn't take props currently.
// I will modify UpdatesSection to accept onOpenCCourse?: () => void.

content = content.replace(
  "export const UpdatesSection: React.FC = () => {",
  "export const UpdatesSection: React.FC<{ onOpenCCourse?: () => void }> = ({ onOpenCCourse }) => {"
);

// We need to intercept clicks on 'a' tags inside the Highlights if they point to #playground
// Actually, doing this directly is tricky. Instead of standard <a> tags, we can just use a span with an onClick, or we intercept it in the dangerouslySetInnerHTML.
// Let's change how we render highlights to add an onClick handler for specific spans.

content = content.replace(
  "<span dangerouslySetInnerHTML={{ __html: highlight }} />",
  `<span 
    dangerouslySetInnerHTML={{ __html: highlight }} 
    onClick={(e) => {
      if (e.target instanceof HTMLAnchorElement && e.target.getAttribute('href') === '#playground') {
        e.preventDefault();
        if (onOpenCCourse) onOpenCCourse();
      }
    }}
  />`
);

fs.writeFileSync('src/components/UpdatesSection.tsx', content);

// Next we need to pass the prop from DashboardView

let dashboardContent = fs.readFileSync('src/components/DashboardView.tsx', 'utf8');
dashboardContent = dashboardContent.replace(
  "<UpdatesSection />",
  "<UpdatesSection onOpenCCourse={onOpenCCourse} />"
);

fs.writeFileSync('src/components/DashboardView.tsx', dashboardContent);

