import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Home, 
  Cpu, 
  Layers,
  Calculator,
  User,
  Zap
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useAppContext();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="w-full max-w-2xl bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center px-6 py-4 border-b border-[var(--border-primary)]">
          <Search className="mr-4 h-5 w-5 text-accent" />
          <Command.Input
            placeholder="Search anything... (Projects, Services, Knowledge)"
            className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-[var(--text-secondary)]/40"
          />
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-black opacity-40">
            <span className="text-xs">ESC</span>
          </div>
        </div>

        <Command.List className="max-h-[50vh] overflow-y-auto p-4 space-y-4">
          <Command.Empty className="py-12 text-center text-[var(--text-secondary)]">
            <Zap className="mx-auto mb-4 h-8 w-8 opacity-20" />
            <p className="font-medium">No results found for that query.</p>
          </Command.Empty>

          <Command.Group heading={<span className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent opacity-60">Navigation</span>}>
            <Item icon={<Home size={18} />} onSelect={() => runCommand(() => navigate('/'))}>Home</Item>
            <Item icon={<Briefcase size={18} />} onSelect={() => runCommand(() => navigate('/projects'))}>Case Studies & Projects</Item>
            <Item icon={<Layers size={18} />} onSelect={() => runCommand(() => navigate('/branding'))}>Branding Systems</Item>
            <Item icon={<Cpu size={18} />} onSelect={() => runCommand(() => navigate('/ai'))}>AI Laboratory</Item>
          </Command.Group>

          <Command.Group heading={<span className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent opacity-60">Tools & Resources</span>}>
            <Item icon={<Calculator size={18} />} onSelect={() => runCommand(() => navigate('/calculator'))}>Pricing Calculator</Item>
            <Item icon={<FileText size={18} />} onSelect={() => runCommand(() => navigate('/brand-assets'))}>Brand Space Assets</Item>
            <Item icon={<User size={18} />} onSelect={() => runCommand(() => navigate('/bio'))}>Professional Bio</Item>
          </Command.Group>

          <Command.Group heading={<span className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-accent opacity-60">Action</span>}>
            <Item icon={<MessageSquare size={18} />} onSelect={() => runCommand(() => navigate('/contact'))}>Start a Project</Item>
          </Command.Group>
        </Command.List>

        <div className="px-6 py-4 border-t border-[var(--border-primary)] bg-accent/5 flex items-center justify-between text-[10px] font-bold text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">
           <span>Select Item: Enter</span>
           <span>Navigate: Arrows</span>
        </div>
      </div>
    </Command.Dialog>
  );
}

function Item({ children, icon, onSelect }: { children: React.ReactNode, icon: React.ReactNode, onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all aria-selected:bg-accent aria-selected:text-white group"
    >
      <div className="opacity-40 group-aria-selected:opacity-100">{icon}</div>
      <span className="font-medium text-sm sm:text-base">{children}</span>
    </Command.Item>
  );
}
