import { cn } from '@/lib/utils';
import React from 'react';

const Textarea = ({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
}) => {
  return (
    <textarea
      className={cn(
        "border rounded-md shadow-sm outline-none p-2  focus:text-black",
        className
      )}
      {...props}
    />
  );
};

export default Textarea;
