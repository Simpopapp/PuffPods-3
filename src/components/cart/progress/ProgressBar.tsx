import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  label: string;
  remainingAmount?: number;
  message: string;
}

export const ProgressBar = ({ progress, label, remainingAmount, message }: ProgressBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-gold">
          {progress.toFixed(0)}%
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-gold"
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