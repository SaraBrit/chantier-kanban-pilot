
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWA } from '@/hooks/usePWA';

export const PWAInstallButton = () => {
  const { isInstallable, installApp } = usePWA();

  if (!isInstallable) return null;

  return (
    <Button 
      onClick={installApp}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Installer l'app
    </Button>
  );
};
