import React from 'react';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/ui/responsive-dialog';
import { toast } from '@/components/ui';
import { useUIStore } from '@/stores/useUIStore';
import { copyTextToClipboard } from '@/lib/clipboard';

export const OpenCodeStatusDialog: React.FC = () => {
  const isOpenCodeStatusDialogOpen = useUIStore((state) => state.isOpenCodeStatusDialogOpen);
  const setOpenCodeStatusDialogOpen = useUIStore((state) => state.setOpenCodeStatusDialogOpen);
  const openCodeStatusText = useUIStore((state) => state.openCodeStatusText);

  const handleCopy = React.useCallback(async () => {
    if (!openCodeStatusText) {
      return;
    }

    const result = await copyTextToClipboard(openCodeStatusText);
    if (result.ok) {
      toast.success('Copied', { description: 'OpenCode status copied to clipboard.' });
      return;
    }
    toast.error('Copy failed');
  }, [openCodeStatusText]);

  return (
    <ResponsiveDialog open={isOpenCodeStatusDialogOpen} onOpenChange={setOpenCodeStatusDialogOpen}>
      <ResponsiveDialogContent className="max-w-2xl">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>OpenCode Status</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Diagnostic snapshot for support and debugging.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={handleCopy}
            className="app-region-no-drag inline-flex h-9 items-center justify-center rounded-md px-3 typography-ui-label font-medium text-muted-foreground transition-colors hover:bg-interactive-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Copy
          </button>
        </div>

        <pre className="max-h-[60vh] overflow-auto rounded-lg bg-surface-muted p-4 typography-code text-foreground whitespace-pre-wrap">
          {openCodeStatusText || 'No data.'}
        </pre>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
};
