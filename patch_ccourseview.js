import fs from 'fs';

let content = fs.readFileSync('src/components/CCourseView.tsx', 'utf8');

content = content.replace(
  "<ExercisePlayground exercises={currentChapter.exercises} />",
  "<div id=\"playground\"><ExercisePlayground exercises={currentChapter.exercises} /></div>"
);

fs.writeFileSync('src/components/CCourseView.tsx', content);
