import fs from 'fs';

let content = fs.readFileSync('src/components/UpdatesSection.tsx', 'utf8');

// The highlights contain HTML (the <a> tags). We need to render them safely.
// In the map for update.highlights:
// <span>{highlight}</span> -> <span dangerouslySetInnerHTML={{ __html: highlight }} />

content = content.replace(
  "<span>{highlight}</span>",
  "<span dangerouslySetInnerHTML={{ __html: highlight }} />"
);

// We should also default the expanded item to 'update-v3.1'
content = content.replace(
  "const [expandedId, setExpandedId] = useState<string>('update-v3.0');",
  "const [expandedId, setExpandedId] = useState<string>('update-v3.1');"
);

// Change version string from v3.0 to v3.1 in the UI
content = content.replace(
  "<strong className=\"text-[#C2410C] font-bold\">v3.0 (13 Ago 2026)</strong>",
  "<strong className=\"text-[#C2410C] font-bold\">v3.1 (17 Ago 2026)</strong>"
);

fs.writeFileSync('src/components/UpdatesSection.tsx', content);
