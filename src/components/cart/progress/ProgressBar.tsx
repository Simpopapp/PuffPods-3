import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  label: string;
  message: string;
  variant: 'shipping' | 'vip';
}

export const ProgressBar = ({ progress, label, message, variant }: ProgressBarProps) => {
  const getProgressBarStyle = () => {
    if (variant === 'shipping') {
      return 'bg-gradient-to-r from-gold/80 to-gold';
    }
    return 'bg-gradient-to-r from-purple-500 to-gold';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className={variant === 'shipping' ? 'text-gold' : 'text-purple-400'}>
          {progress.toFixed(0)}%
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getProgressBarStyle()}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-sm text-muted-foreground">
        {message}
      </div>
    </div>
  );
};