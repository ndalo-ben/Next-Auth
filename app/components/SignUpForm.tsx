"use client";

import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon, PhoneIcon, UserIcon } from "@heroicons/react/20/solid"
import { Button, Checkbox, Input } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { z } from "zod";
import validator from "validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordStrength from "./PasswordStrength";
const { passwordStrength } = require('check-password-strength')

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First Name must be at least 2 characters long")
    .max(45, "First Name must be at most 50 characters long")
    .regex(new RegExp("^[a-zA-Z ]+$"), "No special characters allowed!"),
  lastName: z
    .string()
    .min(2, "Last Name must be at least 2 characters long")
    .max(45, "Last Name must be at most 50 characters long")
    .regex(new RegExp("^[a-zA-Z ]+$"), "No special characters allowed!"),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine(validator.isMobilePhone, "Please enter a valid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long"),
  accepted: z.literal(true, {
    errorMap: () => ({
      message: "Please accept the terms and conditions to continue.",
    }),
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type InputType = z.infer<typeof FormSchema>;

const SignUpForm = () => {
  // react hook form 
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors } } = useForm<InputType>({
      resolver: zodResolver(FormSchema),
    });

  const [isVisible, setIsVisible] = useState(false);

  // check pass strength 
  const [passStrength, setPassStrength] = useState(0);

  useEffect(() => {
    setPassStrength(passwordStrength(watch().password).id);
  }, [watch().password]);

  // show/hide password 
  const toggleVisible = () => setIsVisible(prev => !prev);

  // save user 
  const saveUser: SubmitHandler<InputType> = async (data) => {
    console.log({ data });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(saveUser)} className="grid grid-cols-2 gap-3 p-2 shadow place-self-stretch border rounded-md">
      <Input
        errorMessage={errors.firstName?.message}
        isInvalid={!!errors.firstName}
        {...register("firstName")}
        label="First Name"
        startContent={<UserIcon
          className="w-4" />} />
      <Input
        errorMessage={errors.lastName?.message}
        isInvalid={!!errors.lastName}
        {...register("lastName")}
        label="Last Name"
        startContent={<UserIcon className="w-4" />} />
      <Input
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        {...register("email")}
        label="Email"
        className="col-span-2"
        startContent={<EnvelopeIcon className="w-4" />}
      />
      <Input
        errorMessage={errors.phone?.message}
        isInvalid={!!errors.phone}
        {...register("phone")}
        label="Phone"
        className="col-span-2"
        startContent={<PhoneIcon className="w-4" />}
      />{""}
      <Input
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        {...register("password")}
        type={isVisible ? "text" : "password"}
        label="Password"
        className="col-span-2"
        startContent={<KeyIcon className="w-4" />}
        endContent={isVisible ? (
          <EyeIcon onClick={toggleVisible} className="w-4 cursor-pointer" />
        ) : (
          <EyeSlashIcon onClick={toggleVisible} className="w-4 cursor-pointer" />
        )}
      />
      <PasswordStrength passStrength={passStrength}/>
      <Input
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        {...register("confirmPassword")}
        type={isVisible ? "text" : "password"}
        label="Confirm Password"
        className="col-span-2"
        startContent={<KeyIcon className="w-4" />}
      />
      <Controller
        control={control}
        name="accepted"
        render={({ field }) => (
          <Checkbox
            onChange={field.onChange}
            onBlur={field.onBlur}
            className="col-span-2">
            I Accept the <a href="#" className="underline">Terms</a>
          </Checkbox>
        )}
      />
      {errors.accepted && (
        <p className="col-span-2 text-red-500 text-xs">{errors.accepted.message}</p>
      )}
      <div className="flex justify-center col-span-2">
        <Button className="w-48" color="primary" type="submit">Submit</Button>
      </div>
    </form>
  )
}

export default SignUpForm