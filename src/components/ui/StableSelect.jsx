"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";

export default function StableSelect({
  value,
  onChange,
  options,
  placeholder,
  disabled,
}) {
  return (
    <Select
      value={value || undefined}
      onValueChange={(v) => {
        if (v !== value) {
          onChange(v);
        }
      }}
      disabled={disabled}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
