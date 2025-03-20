"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import * as React from "react";

interface NumberInputProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export default function NumberInput({
  value = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange,
  className,
}: NumberInputProps) {
  const [number, setNumber] = React.useState(value);

  const handleChange = (newValue: number) => {
    // Clamp value between min and max
    const clampedValue = Math.min(Math.max(newValue, min), max);
    setNumber(clampedValue);
    onChange?.(clampedValue);
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => handleChange(number - step)}
        disabled={number <= min}
        aria-label="Decrease value"
        className="rounded-r-none"
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={number}
        onChange={(e) => handleChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-20 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        variant="secondary"
        size="icon"
        onClick={() => handleChange(number + step)}
        disabled={number >= max}
        aria-label="Increase value"
        className="rounded-l-none"
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
