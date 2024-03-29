"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";
import { compileActivationTemplate, sendMail } from "../mail";
import { signJwt } from "../jwt";

export async function registerUser(
    user: Omit<User, "id" | "emailVerified" | "image">
) {
    const result = await prisma.user.create({
        data: {
            ...user,
            password: await bcrypt.hash(user.password, 10),
        },
    });

    const jwtUserId = signJwt({
        id: result.id,
    })
    const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
    const body = compileActivationTemplate(user.firstName, activationUrl);
    await sendMail({
        to: user.email,
        subject: "Activate your account",
        body,
    });
    return result;
}