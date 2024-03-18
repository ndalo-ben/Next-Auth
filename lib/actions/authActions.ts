"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";
import { compileActivationTemplate, sendMail } from "../mail";

export async function registerUser(
    user: Omit<User, "id" | "emailVerified" | "image">
) {
    const result = await prisma.user.create({
        data: {
            ...user,
            password: await bcrypt.hash(user.password, 10),
        },
    });

    const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${result.id}`;
    const body = compileActivationTemplate(user.firstName, activationUrl);
    await sendMail({
        to: user.email,
        subject: "Activate your account",
        body,
    });
    return result;
}