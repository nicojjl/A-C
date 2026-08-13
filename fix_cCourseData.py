import re

with open('src/data/cCourseData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to fix the theoryContent fields. The previous script messed them up.
# Wait, actually, if the file is currently syntactically broken with unescaped backticks,
# maybe I should just checkout the original file and re-apply correctly.
