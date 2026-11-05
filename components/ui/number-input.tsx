"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import {
  type ChangeEvent,
  type ComponentProps,
  createContext,
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useContext,
  useRef,
  useState,
  type WheelEvent,
} from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";

interface NumberStore {
  allowMouseWheel: boolean;
  commit: (next: number | null) => void;
  disabled?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  formatted: string;
  invalid: boolean;
  readOnly?: boolean;
  step: number;
  value: number | null;
}

const NumberInputContext = createContext<NumberStore | null>(null);

const useStore = () => {
  const store = useContext(NumberInputContext);
  if (!store) {
    throw new Error("Number input parts must be inside NumberInput.");
  }
  return store;
};

const stepperClassName = cn(
  buttonVariants({ variant: "ghost" }),
  "relative h-8 in-data-[size=lg]:h-9 in-data-[size=sm]:h-7",
  "rounded-none",
  "pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11",
);

const toNumber = (value: number | string | null | undefined) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const next = typeof value === "number" ? value : Number(value);
  return Number.isNaN(next) ? null : next;
};

const toStringValue = (value: number | null) =>
  value === null ? "" : String(value);

const clamp = (value: number, min?: number, max?: number) => {
  let next = value;
  if (min !== undefined) {
    next = Math.max(min, next);
  }
  if (max !== undefined) {
    next = Math.min(max, next);
  }
  return next;
};

const roundToStep = (value: number, step: number) => {
  const places = step.toString().split(".")[1]?.length ?? 0;
  const stepped = Math.round(value / step) * step;
  return Number(stepped.toFixed(places));
};

interface NumberInputProps extends Omit<
  ComponentProps<"div">,
  "defaultValue" | "onChange"
> {
  allowMouseWheel?: boolean;
  defaultValue?: number | string;
  disabled?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  invalid?: boolean;
  max?: number;
  min?: number;
  onValueChange?: (details: { value: string }) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  step?: number;
  value?: number | string;
}

export const NumberInput = (props: NumberInputProps) => {
  const {
    allowMouseWheel = false,
    className,
    defaultValue,
    disabled,
    formatOptions,
    invalid = false,
    max,
    min,
    onValueChange,
    readOnly,
    size = "md",
    step = 1,
    value,
    ...rest
  } = props;
  const controlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(() =>
    toNumber(defaultValue),
  );
  const current = controlled ? toNumber(value) : uncontrolled;
  const commit = useCallback(
    (next: number | null) => {
      const resolved =
        next === null ? null : clamp(roundToStep(next, step), min, max);
      if (!controlled) {
        setUncontrolled(resolved);
      }
      onValueChange?.({ value: toStringValue(resolved) });
    },
    [controlled, max, min, onValueChange, step],
  );
  const formatted =
    formatOptions && current !== null
      ? new Intl.NumberFormat(undefined, formatOptions).format(current)
      : toStringValue(current);

  return (
    <NumberInputContext.Provider
      value={{
        allowMouseWheel,
        commit,
        disabled,
        formatOptions,
        formatted,
        invalid,
        readOnly,
        step,
        value: current,
      }}
    >
      <div
        className={cn(
          "group/number-field",
          "flex w-full flex-col items-start gap-2",
          "has-data-[slot=number-field-increment]:has-data-[slot=number-field-decrement]:**:data-[slot=number-field-input]:text-center",
          className,
        )}
        data-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        data-size={size}
        data-slot="number-field"
        {...rest}
      />
    </NumberInputContext.Provider>
  );
};

export const NumberInputGroup = (props: ComponentProps<"div">) => {
  const { className, ...rest } = props;
  const store = useStore();

  return (
    <div
      className={cn(
        "relative",
        "w-full",
        "flex justify-between",
        "bg-transparent dark:bg-input/30",
        "text-base",
        "rounded-lg border border-input shadow-xs/5 ring-ring/32",
        "transition-shadow",
        "focus-within:border-primary focus-within:ring-[3px] focus-within:ring-ring/32",
        "data-disabled:pointer-events-none data-disabled:opacity-64",
        "in-data-invalid:border-destructive in-data-invalid:ring-[3px] in-data-invalid:ring-destructive/24",
        "motion-reduce:transition-none!",
        className,
      )}
      data-disabled={store.disabled || undefined}
      data-slot="number-field-group"
      {...rest}
    />
  );
};

export const NumberInputDecrement = (props: ComponentProps<"button">) => {
  const { className, children, onClick, ...rest } = props;
  const store = useStore();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (store.disabled || store.readOnly) {
      return;
    }
    store.commit((store.value ?? 0) - store.step);
  };

  return (
    <button
      aria-label="Decrement"
      className={cn(
        stepperClassName,
        "rounded-s-[calc(var(--radius-lg)+1px)]",
        className,
      )}
      data-slot="number-field-decrement"
      type="button"
      {...rest}
      onClick={handleClick}
    >
      {children ?? <MinusIcon aria-hidden />}
    </button>
  );
};

export const NumberInputIncrement = (props: ComponentProps<"button">) => {
  const { className, children, onClick, ...rest } = props;
  const store = useStore();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (store.disabled || store.readOnly) {
      return;
    }
    store.commit((store.value ?? 0) + store.step);
  };

  return (
    <button
      aria-label="Increment"
      className={cn(
        stepperClassName,
        "rounded-e-[calc(var(--radius-lg)+1px)]",
        className,
      )}
      data-slot="number-field-increment"
      type="button"
      {...rest}
      onClick={handleClick}
    >
      {children ?? <PlusIcon aria-hidden />}
    </button>
  );
};

export const NumberInputInput = (props: ComponentProps<"input">) => {
  const { className, onChange, onWheel, ...rest } = props;
  const store = useStore();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    const parsed = Number(event.target.value.replace(/[^0-9.-]/g, ""));
    store.commit(
      event.target.value === "" || Number.isNaN(parsed) ? null : parsed,
    );
  };
  const handleWheel = (event: WheelEvent<HTMLInputElement>) => {
    onWheel?.(event);
    if (!store.allowMouseWheel || event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    store.commit(
      (store.value ?? 0) + (event.deltaY < 0 ? store.step : -store.step),
    );
  };

  return (
    <input
      className={cn(
        "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 h-8 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors file:h-6 file:text-sm file:font-medium focus-visible:ring-3 aria-invalid:ring-3 md:text-sm w-full min-w-0 grow placeholder:text-muted-foreground",
        "h-8 in-data-[size=lg]:h-9 in-data-[size=sm]:h-7",
        "tabular-nums",
        "border-0 bg-transparent shadow-none outline-none ring-0",
        "focus-visible:ring-0",
        className,
      )}
      data-slot="number-field-input"
      disabled={store.disabled}
      inputMode="decimal"
      readOnly={store.readOnly}
      value={store.formatted}
      {...rest}
      onChange={handleChange}
      onWheel={handleWheel}
    />
  );
};

export const NumberInputScrubber = (props: ComponentProps<"span">) => {
  const { className, children, ...rest } = props;
  const store = useStore();
  const origin = useRef<{ value: number; x: number } | null>(null);
  const handlePointerDown = (event: PointerEvent<HTMLSpanElement>) => {
    if (store.value === null) {
      return;
    }
    origin.current = { value: store.value, x: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (!origin.current) {
      return;
    }
    const delta = Math.round((event.clientX - origin.current.x) / 8);
    store.commit(origin.current.value + delta * store.step);
  };
  const handlePointerUp = () => {
    origin.current = null;
  };

  return (
    <span
      className={cn("flex cursor-ew-resize", className)}
      data-slot="number-field-scrubber"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      {...rest}
    >
      <FieldLabel>{children}</FieldLabel>
    </span>
  );
};
