const fs = require('fs');
const file = 'f:/full stack project/ScholarStack/scholar-stack/src/app/dashboard/page.tsx';
let content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const start = lines.findIndex(l => l.includes('ADD COURSE DIALOG / MODAL (FOR TEACHERS)'));
const end = lines.findIndex((l, i) => i > start && l.includes('</AnimatePresence>'));

if (start !== -1 && end !== -1) {
  let modalContent = lines.slice(start, end + 1).join('\n');
  
  // Revert back to dark theme
  modalContent = modalContent
    .replace(/bg-white/g, 'bg-slate-900')
    .replace(/bg-slate-950\/80 backdrop-blur-md/g, 'bg-slate-950/80 backdrop-blur-md')
    .replace(/text-slate-900/g, 'text-white')
    .replace(/border-purple-100/g, 'border-white/10')
    .replace(/bg-slate-50/g, 'bg-slate-950/50')
    .replace(/border-slate-100/g, 'border-white/10')
    .replace(/border-slate-200/g, 'border-white/10')
    .replace(/text-slate-600/g, 'text-purple-300/80')
    .replace(/text-slate-500/g, 'text-slate-400')
    .replace(/text-slate-400/g, 'text-slate-400')
    .replace(/bg-emerald-50/g, 'bg-emerald-500/10')
    .replace(/border-emerald-200/g, 'border-emerald-500/20')
    .replace(/text-emerald-700/g, 'text-emerald-400')
    .replace(/text-emerald-500/g, 'text-emerald-400')
    .replace(/bg-red-50/g, 'bg-red-500/10')
    .replace(/border-red-200/g, 'border-red-500/20')
    .replace(/text-red-700/g, 'text-red-400')
    .replace(/text-red-500/g, 'text-red-400')
    .replace(/bg-purple-50/g, 'bg-purple-500/10')
    .replace(/bg-slate-100/g, 'bg-white/10')
    .replace(/border-slate-300/g, 'border-white/10')
    .replace(/text-slate-700/g, 'text-white')
    .replace(/placeholder:text-slate-400/g, 'placeholder:text-slate-500');

  // Fix specific weird replacements
  modalContent = modalContent.replace(/bg-slate-900\/50 backdrop-blur-sm/g, 'bg-slate-950/40 backdrop-blur-sm');

  const newLines = [...lines.slice(0, start), modalContent, ...lines.slice(end + 1)];
  fs.writeFileSync(file, newLines.join('\n'));
  console.log('Fixed modal styles successfully.');
} else {
  console.log('Modal not found.');
}
