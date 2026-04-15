"use client";

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useDeviceInfo } from '@/lib/device';

interface ResponsiveDialogContextValue {
  isMobile: boolean;
}

const ResponsiveDialogContext = React.createContext<ResponsiveDialogContextValue>({
  isMobile: false,
});

function useResponsiveDialog() {
  return React.useContext(ResponsiveDialogContext);
}

type ResponsiveDialogRootProps = React.ComponentProps<typeof Dialog>;

function ResponsiveDialog({ children, ...props }: ResponsiveDialogRootProps) {
  const { isMobile, isTablet, hasTouchInput } = useDeviceInfo();
  const mobile = isMobile || isTablet || hasTouchInput;
  return (
    <ResponsiveDialogContext.Provider value={{ isMobile: mobile }}>
      {mobile ? (
        <Drawer {...props}>{children}</Drawer>
      ) : (
        <Dialog {...props}>{children}</Dialog>
      )}
    </ResponsiveDialogContext.Provider>
  );
}

type ResponsiveDialogContentProps = React.ComponentProps<typeof DialogContent>;

function ResponsiveDialogContent({
  children,
  showCloseButton,
  keyboardAvoid,
  ...rest
}: ResponsiveDialogContentProps) {
  const { isMobile } = useResponsiveDialog();
  if (isMobile) {
    return <DrawerContent {...(rest as React.ComponentProps<typeof DrawerContent>)}>{children}</DrawerContent>;
  }
  return (
    <DialogContent showCloseButton={showCloseButton} keyboardAvoid={keyboardAvoid} {...rest}>
      {children}
    </DialogContent>
  );
}

function ResponsiveDialogHeader(props: React.ComponentProps<'div'>) {
  const { isMobile } = useResponsiveDialog();
  return isMobile ? <DrawerHeader {...props} /> : <DialogHeader {...props} />;
}

function ResponsiveDialogFooter(props: React.ComponentProps<'div'>) {
  const { isMobile } = useResponsiveDialog();
  return isMobile ? <DrawerFooter {...props} /> : <DialogFooter {...props} />;
}

type ResponsiveDialogTitleProps = React.ComponentProps<typeof DialogTitle>;

function ResponsiveDialogTitle(props: ResponsiveDialogTitleProps) {
  const { isMobile } = useResponsiveDialog();
  return isMobile ? (
    <DrawerTitle {...(props as React.ComponentProps<typeof DrawerTitle>)} />
  ) : (
    <DialogTitle {...props} />
  );
}

type ResponsiveDialogDescriptionProps = React.ComponentProps<typeof DialogDescription>;

function ResponsiveDialogDescription(props: ResponsiveDialogDescriptionProps) {
  const { isMobile } = useResponsiveDialog();
  return isMobile ? (
    <DrawerDescription {...(props as React.ComponentProps<typeof DrawerDescription>)} />
  ) : (
    <DialogDescription {...props} />
  );
}

export {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
};
