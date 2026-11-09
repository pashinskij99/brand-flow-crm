import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface IInputFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  htmlFor: string;
  name?: string;
  onChange?: (value: string) => void;
}

const InputField = ({
  value,
  label,
  htmlFor,
  placeholder,
  name,
  onChange,
}: IInputFieldProps) => {
  return (
    <Field className="gap-1">
      <FieldLabel htmlFor={`input-field-${htmlFor}`}>{label}</FieldLabel>
      <Input
        name={name}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        id={`input-field-${htmlFor}`}
        type="text"
        placeholder={placeholder}
      />
    </Field>
  );
};

export default InputField;
