import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PWAUpdatePrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerSW();
    }
  }, []);

  const registerSW = async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      setRegistration(reg);

      // 새 service worker가 설치되었을 때
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // 새 업데이트가 있음
                setNeedRefresh(true);
                setShowPrompt(true);
              } else {
                // 오프라인에서 사용 가능
                setOfflineReady(true);
                setShowPrompt(true);
              }
            }
          });
        }
      });

      // 이미 제어되고 있는 경우 (페이지 새로고침 시)
      if (reg.active && navigator.serviceWorker.controller) {
        setOfflineReady(true);
      }

    } catch (error) {
      console.error('Service Worker 등록 실패:', error);
    }
  };

  const updateServiceWorker = async () => {
    if (registration && registration.waiting) {
      // Service Worker에게 skipWaiting 메시지 전송
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // 새 Service Worker가 활성화되면 페이지 새로고침
      registration.waiting.addEventListener('statechange', (e) => {
        const target = e.target as ServiceWorker;
        if (target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  };

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">
            {offlineReady && !needRefresh ? '🔄 오프라인 사용 가능' : '🚀 새 업데이트 있음'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {offlineReady && !needRefresh
                ? '앱이 오프라인에서도 사용할 수 있도록 준비되었습니다.'
                : '새로운 콘텐츠를 사용할 수 있습니다. 페이지를 새로고침하시겠습니까?'}
            </p>
            <div className="flex gap-2">
              {needRefresh && (
                <Button onClick={updateServiceWorker} size="sm">
                  새로고침
                </Button>
              )}
              <Button onClick={close} variant="outline" size="sm">
                닫기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAUpdatePrompt;