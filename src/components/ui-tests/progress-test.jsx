import React from 'react';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';

export default function ProgressTest() {
  const [progress, setProgress] = React.useState(13);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setProgress(oldProgress => {
          if (oldProgress >= 100) {
            setLoading(false);
            return 100;
          }
          return Math.min(oldProgress + 10, 100);
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, loading]);

  const startLoading = () => {
    setProgress(0);
    setLoading(true);
  };

  return (
    <div className="p-8 max-w-md mx-auto space-y-8">
      <h2 className="text-2xl font-bold mb-4">Progress Component Test</h2>

      <div>
        <h3 className="text-lg font-semibold mb-4">Static Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">0%</span>
              <span className="text-sm font-medium">0%</span>
            </div>
            <Progress value={0} />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">25%</span>
              <span className="text-sm font-medium">25%</span>
            </div>
            <Progress value={25} />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">50%</span>
              <span className="text-sm font-medium">50%</span>
            </div>
            <Progress value={50} />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">75%</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <Progress value={75} />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">100%</span>
              <span className="text-sm font-medium">100%</span>
            </div>
            <Progress value={100} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Animated Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Loading...</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
          <Button
            onClick={startLoading}
            disabled={loading}
            variant={loading ? 'secondary' : 'default'}
          >
            {loading ? 'Loading...' : 'Start Loading'}
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Small (h-2)</p>
            <Progress value={60} className="h-2" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Default (h-4)</p>
            <Progress value={60} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Large (h-6)</p>
            <Progress value={60} className="h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
