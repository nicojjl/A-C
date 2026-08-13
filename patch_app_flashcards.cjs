const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
const importLab = "import { LaboratoriesView } from './components/LaboratoriesView';";
const importFlashcards = "import { FlashcardsView } from './components/FlashcardsView';\n";
code = code.replace(importLab, importFlashcards + importLab);

// Update viewMode state
const viewModeStr = "useState<'dashboard' | 'class' | 'c_course' | 'visualizer' | 'leaderboard' | 'certamenes' | 'laboratories'>('dashboard');";
const viewModeStrRepl = "useState<'dashboard' | 'class' | 'c_course' | 'visualizer' | 'leaderboard' | 'certamenes' | 'laboratories' | 'flashcards'>('dashboard');";
code = code.replace(viewModeStr, viewModeStrRepl);

// Update Sidebar props in Header
const headerSidebar = `        isLaboratoriesActive={viewMode === 'laboratories'}
        onOpenLaboratories={() => setViewMode('laboratories')}`;
const headerSidebarRepl = `        isLaboratoriesActive={viewMode === 'laboratories'}
        onOpenLaboratories={() => setViewMode('laboratories')}
        isFlashcardsActive={viewMode === 'flashcards'}
        onOpenFlashcards={() => setViewMode('flashcards')}`;
code = code.replace(headerSidebar, headerSidebarRepl);

// Hide Sidebar on flashcards
const hideSidebar = `{viewMode !== 'dashboard' && viewMode !== 'leaderboard' && viewMode !== 'certamenes' && viewMode !== 'laboratories' && (`;
const hideSidebarRepl = `{viewMode !== 'dashboard' && viewMode !== 'leaderboard' && viewMode !== 'certamenes' && viewMode !== 'laboratories' && viewMode !== 'flashcards' && (`;
code = code.replace(hideSidebar, hideSidebarRepl);

// Sidebar props in Left Sidebar
const sidebarProps = `            isLaboratoriesActive={viewMode === 'laboratories'}
            onOpenLaboratories={() => setViewMode('laboratories')}`;
const sidebarPropsRepl = `            isLaboratoriesActive={viewMode === 'laboratories'}
            onOpenLaboratories={() => setViewMode('laboratories')}
            isFlashcardsActive={viewMode === 'flashcards'}
            onOpenFlashcards={() => setViewMode('flashcards')}`;
code = code.replace(sidebarProps, sidebarPropsRepl);

// Main rendering
const renderCertamenes = `{viewMode === 'laboratories' ? (
                <LaboratoriesView />
              ) : viewMode === 'certamenes' ? (`;
const renderCertamenesRepl = `{viewMode === 'flashcards' ? (
                <FlashcardsView />
              ) : viewMode === 'laboratories' ? (
                <LaboratoriesView />
              ) : viewMode === 'certamenes' ? (`;
code = code.replace(renderCertamenes, renderCertamenesRepl);

// Dashboard props
const dashboardProps = `                  onOpenLaboratories={() => setViewMode('laboratories')}`;
const dashboardPropsRepl = `                  onOpenLaboratories={() => setViewMode('laboratories')}
                  onOpenFlashcards={() => setViewMode('flashcards')}`;
code = code.replace(dashboardProps, dashboardPropsRepl);

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('App patched successfully.');
