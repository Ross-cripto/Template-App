import { z } from "zod"

export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  picture: z.string().url().optional(),
})

export type User = z.infer<typeof userSchema>
