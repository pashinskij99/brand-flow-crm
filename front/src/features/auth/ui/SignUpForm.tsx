import { Button } from "@/components/ui/button";
import CheckboxField from "@/shared/checkbox-field";
import InputField from "@/shared/input-field";
import {
  Controller,
  ErrorMessage,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFieldPassword } from "@/shared/input-field-password";

const formSchema = z.object({
  email: z.email(),
  firstName: z.string().min(3).max(40),
  lastName: z.string().min(3).max(40),
  password: z.string().min(8).max(40),
  brandName: z.string().min(3).max(40),
  termsAndConditions: z.boolean(),
  privacyPolicy: z.boolean(),
});

type TSignUpFormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const { control, handleSubmit } = useForm<TSignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "pashinskij99@gmail.com",
      firstName: "Yaroslav",
      lastName: "Pashinskyi",
      password: "12345678",
      brandName: "Test Brand",
      termsAndConditions: true,
      privacyPolicy: true,
    },
  });

  const onSubmit: SubmitHandler<TSignUpFormValues> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="w-[500px] mx-auto flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center">Register</h2>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputField
            name={field.name}
            value={field.value}
            htmlFor="email"
            label="Email"
            placeholder="Email"
          />
        )}
      />

      <ErrorMessage
        control={control}
        name="email"
        render={({ message }) => (
          <small className="text-red-400">{message}</small>
        )}
      />

      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <InputField
            name={field.name}
            value={field.value}
            htmlFor="firstName"
            label="First name"
            placeholder="First name"
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <InputField
            name={field.name}
            value={field.value}
            htmlFor="lastName"
            label="Second name"
            placeholder="Second name"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <InputFieldPassword
            name={field.name}
            value={field.value}
            htmlFor="password"
            label="Password"
            placeholder="Password"
          />
        )}
      />
      <Controller
        name="brandName"
        control={control}
        render={({ field }) => (
          <InputField
            name={field.name}
            value={field.value}
            htmlFor="brand"
            label="Brand name"
            placeholder="Brand name"
          />
        )}
      />

      <div className="flex flex-col gap-2">
        <Controller
          name="termsAndConditions"
          control={control}
          render={({ field }) => (
            <CheckboxField
              name={field.name}
              checked={field.value}
              htmlFor="termsAndConditions"
              label="Terms and Conditions"
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="privacyPolicy"
          control={control}
          render={({ field }) => (
            <CheckboxField
              name={field.name}
              checked={field.value}
              htmlFor="privacyPolicy"
              label="Privacy Policy"
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <Button type="submit">Create Account</Button>
    </form>
  );
};

export default SignUpForm;
