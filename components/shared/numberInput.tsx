import {
  NumberInput,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputInput,
} from "@/components/ui/number-input";

export function Increment() {
  return (
    <NumberInput className="w-full max-w-48" defaultValue="1">
      <NumberInputGroup>
        <NumberInputDecrement />
        <NumberInputInput />
        <NumberInputIncrement />
      </NumberInputGroup>
    </NumberInput>
  );
}
