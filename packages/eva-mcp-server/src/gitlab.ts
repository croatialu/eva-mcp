import { Gitlab } from '@gitbeaker/rest'
import { env } from './env'

export const gitlab: InstanceType<typeof Gitlab> = new Gitlab({
  host: env.GITLAB_HOST,
  token: env.GITLAB_TOKEN,
})

