import { C_COURSE_DATA } from './src/data/cCourseData.ts';
import { COURSES_DATA } from './src/data/coursesData.ts';
import { EXERCISES_BY_COURSE } from './src/data/exercisesData.ts';
import { LABORATORIES_DATA } from './src/data/laboratoriesData.ts';
import { executeCCodeInBrowser } from './src/components/ExercisePlayground.tsx';

const allSolutions: any[] = [];
// C Course exercises
C_COURSE_DATA.forEach(c => {
  if (c.exercises) {
    c.exercises.forEach(ex => {
      if (ex.solutionCode) {
        allSolutions.push({ id: ex.id, code: ex.solutionCode, argsStr: ex.testCases?.[0]?.input });
      }
    });
  }
});

// exercisesData
Object.values(EXERCISES_BY_COURSE).flat().forEach(ex => {
  if (ex.solutionCode) {
    allSolutions.push({ id: ex.id, code: ex.solutionCode, argsStr: ex.testCases?.[0]?.input });
  }
});

// laboratoriesData
LABORATORIES_DATA.forEach(lab => {
  if (lab.steps) {
    lab.steps.forEach(st => {
      if (st.solutionCode) {
        allSolutions.push({ id: lab.id + '-' + st.id, code: st.solutionCode, argsStr: st.testCases?.[0]?.input });
      }
    });
  }
});

const uniqueSolutions = [];
const seen = new Set();
for(let s of allSolutions) {
    if (!seen.has(s.id)) {
        seen.add(s.id);
        uniqueSolutions.push(s);
    }
}
console.log(`Found ${uniqueSolutions.length} solutions.`);

let successCount = 0;
const failures: any[] = [];
uniqueSolutions.forEach((sol, i) => {
  try {
    let t = sol.argsStr;
    let args = [];
    if (t) {
        try {
            args = new Function('return [' + t + ']')();
        } catch (e) {}
    }
    const res = executeCCodeInBrowser(sol.code, args);
    if (res.success) {
      successCount++;
    } else {
      failures.push({ id: sol.id, error: res.error, code: sol.code });
    }
  } catch (e: any) {
    failures.push({ id: sol.id, error: e.message, code: sol.code });
  }
});

console.log(`Success: ${successCount}/${uniqueSolutions.length}`);
if (successCount < uniqueSolutions.length) {
    for(let i=0; i<Math.min(25, failures.length); i++) {
        console.log(`Failed: ${failures[i].id} - ${failures[i].error}`);
    }
}
