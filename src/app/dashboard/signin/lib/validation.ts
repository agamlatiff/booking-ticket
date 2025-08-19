import z from "zod";

export const formSchema = z.object({
  email: z.string().nonempty('Email is required').email({message: 'Invalid email format'}),
  password: z.string().nonempty('Password is required').min(6, {message: 'Password must be at least 6 characters long'}),
})