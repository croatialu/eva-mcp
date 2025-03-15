import { z } from "zod"
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  GITLAB_HOST: z.string()
    .describe('The GitLab host to use for the server'),
  GITLAB_TOKEN: z.string()
    .describe('The GitLab token to use for the server'),
})

export const env = envSchema.parse({
  GITLAB_HOST: process.env.GITLAB_HOST,
  GITLAB_TOKEN: process.env.GITLAB_TOKEN,
})  
