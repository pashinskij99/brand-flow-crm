import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";

interface ICheckboxFieldProps {
  label: string;
  htmlFor: string;
  checked?: boolean;
  name?: string;
  onChange?: (event: boolean) => void;
}

const CheckboxField = ({
  checked,
  htmlFor,
  label,
  name,
  onChange,
}: ICheckboxFieldProps) => {
  return (
    <Field orientation="horizontal">
      <FieldLabel htmlFor={`input-field-${htmlFor}`}>{label}</FieldLabel>
      <Checkbox
        name={name}
        checked={checked}
        onCheckedChange={(checked) => onChange && onChange(checked)}
      />
    </Field>
  );
};

export default CheckboxField;
