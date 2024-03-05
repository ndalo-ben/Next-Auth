"use client";

import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon, PhoneIcon, UserIcon } from "@heroicons/react/20/solid"
import { Button, Checkbox, Input } from "@nextui-org/react"
import { useState } from "react";
import { z } from "zod";
import validator from "validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

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
  path: ["password", "confirmPassword"],
});

type InputType = z.infer<typeof FormSchema>;

const SignUpForm = () => {
  // react hook form 
  const { register, handleSubmit, reset, control } = useForm<InputType>();

  const [isVisible, setIsVisible] = useState(false);

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
        {...register("firstName")}
        label="First Name"
        startContent={<UserIcon
          className="w-4" />} />
      <Input
        {...register("lastName")}
        label="Last Name"
        startContent={<UserIcon className="w-4" />} />
      <Input
        {...register("email")}
        label="Email"
        className="col-span-2"
        startContent={<EnvelopeIcon className="w-4" />}
      />
      <Input
        {...register("phone")}
        label="Phone"
        className="col-span-2"
        startContent={<PhoneIcon className="w-4" />}
      />{""}
      <Input
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
      <Input
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
      <div className="flex justify-center col-span-2">
        <Button className="w-48" color="primary" type="submit">Submit</Button>
      </div>
    </form>
  )
}

export default SignUpForm