const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
const importDashboard = "import { DashboardView } from './components/DashboardView';";
const importLab = "import { LaboratoriesView } from './components/LaboratoriesView';\n";
code = code.replace(importDashboard, importLab + importDashboard);

// Update viewMode state
const viewModeStr = "useState<'dashboard' | 'class' | 'c_course' | 'visualizer' | 'leaderboard' | 'certamenes'>('dashboard');";
const viewModeStrRepl = "useState<'dashboard' | 'class' | 'c_course' | 'visualizer' | 'leaderboard' | 'certamenes' | 'laboratories'>('dashboard');";
code = code.replace(viewModeStr, viewModeStrRepl);

// Update Sidebar props in Header
const headerSidebar = `        onOpenCertamenes={() => setViewMode('certamenes')}`;
const headerSidebarRepl = `        onOpenCertamenes={() => setViewMode('certamenes')}
        isLaboratoriesActive={viewMode === 'laboratories'}
        onOpenLaboratories={() => setViewMode('laboratories')}`;
code = code.replace(headerSidebar, headerSidebarRepl);

// Hide Sidebar on laboratories
const hideSidebar = `{viewMode !== 'dashboard' && viewMode !== 'leaderboard' && viewMode !== 'certamenes' && (`;
const hideSidebarRepl = `{viewMode !== 'dashboard' && viewMode !== 'leaderboard' && viewMode !== 'certamenes' && viewMode !== 'laboratories' && (`;
code = code.replace(hideSidebar, hideSidebarRepl);

// Sidebar props in Left Sidebar
const sidebarProps = `            onOpenCertamenes={() => setViewMode('certamenes')}`;
const sidebarPropsRepl = `            onOpenCertamenes={() => setViewMode('certamenes')}
            isLaboratoriesActive={viewMode === 'laboratories'}
            onOpenLaboratories={() => setViewMode('laboratories')}`;
code = code.replace(sidebarProps, sidebarPropsRepl);

// Main rendering
const renderCertamenes = `{viewMode === 'certamenes' ? (
                <CertamenesView />
              ) : viewMode === 'leaderboard' ? (`
const renderCertamenesRepl = `{viewMode === 'laboratories' ? (
                <LaboratoriesView />
              ) : viewMode === 'certamenes' ? (
                <CertamenesView />
              ) : viewMode === 'leaderboard' ? (`
code = code.replace(renderCertamenes, renderCertamenesRepl);

// Dashboard props
const dashboardProps = `                  onOpenCertamenes={() => setViewMode('certamenes')}`;
const dashboardPropsRepl = `                  onOpenCertamenes={() => setViewMode('certamenes')}
                  onOpenLaboratories={() => setViewMode('laboratories')}`;
code = code.replace(dashboardProps, dashboardPropsRepl);

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('App patched successfully.');
