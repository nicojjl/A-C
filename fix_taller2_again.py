import re

with open('src/data/coursesData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Read the raw taller2 string from a separate file to avoid shell expansion issues
with open('taller2.txt', 'r', encoding='utf-8') as f:
    new_taller2 = f.read()

pattern = r"    id: 'taller-2',.*?(?=  \{\n    id: 'clase-10',)"

content_new = re.sub(pattern, lambda m: new_taller2 + ",\n", content, flags=re.DOTALL)

with open('src/data/coursesData.ts', 'w', encoding='utf-8') as f:
    f.write(content_new)

print("done")
