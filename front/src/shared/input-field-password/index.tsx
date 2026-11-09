import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { EyeOffIcon } from "lucide-react";
import { useState, type HTMLInputTypeAttribute } from "react";

interface IInputFieldProps {
  label: string;
  placeholder: string;
  value?: string;
  htmlFor: string;
  name?: string;
  onChange?: (value: string) => void;
}

export const InputFieldPassword = ({
  value,
  label,
  htmlFor,
  placeholder,
  name,
  onChange,
}: IInputFieldProps) => {
  const [type, setType] = useState<HTMLInputTypeAttribute | undefined>(
    "password",
  );

  return (
    <Field className="gap-1">
      <FieldLabel htmlFor={`input-field-${htmlFor}`}>{label}</FieldLabel>
      <InputGroup>
        <Input
          name={name}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          id={`input-field-${htmlFor}`}
          type={type}
          placeholder={placeholder}
        />
        <InputGroupAddon
          className="cursor-pointer"
          onClick={() => {
            setType((prevState) =>
              prevState === "password" ? "text" : "password",
            );
          }}
          align="inline-end"
        >
          <EyeOffIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
};
