"use client";

import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon, PhoneIcon, UserIcon } from "@heroicons/react/20/solid"
import { Button, Checkbox, Input } from "@nextui-org/react"
import { useState } from "react";

const SignUpForm = () => {
  const [isVisible, setIsVisible] = useState(false);

  // show/hide password 
  const toggleVisible = () => setIsVisible(prev => !prev);

  return (
    <form className="grid grid-cols-2 gap-3 p-2 shadow place-self-stretch border rounded-md">
      <Input label="First Name" startContent={<UserIcon className="w-4" />} />
      <Input label="Last Name" startContent={<UserIcon className="w-4" />} />
      <Input
        label="Email"
        className="col-span-2"
        startContent={<EnvelopeIcon className="w-4" />}
      />
      <Input
        label="Phone"
        className="col-span-2"
        startContent={<PhoneIcon className="w-4" />}
      />{""}
      <Input
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
        type={isVisible ? "text" : "password"}
        label="Confirm Password"
        className="col-span-2"
        startContent={<KeyIcon className="w-4" />}
      />
      <Checkbox className="col-span-2">
        I Accept the <a href="#" className="underline">Terms</a>
      </Checkbox>
      <div className="flex justify-center col-span-2">
        <Button className="w-48" color="primary">Submit</Button>
      </div>
    </form>
  )
}

export default SignUpForm