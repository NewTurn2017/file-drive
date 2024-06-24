import { cronJobs } from 'convex/server'
import { internal } from './_generated/api'

const crons = cronJobs()

crons.interval(
  'delete files',
  { minutes: 30 }, // every minute
  internal.files.deleteAllFiles
)

export default crons
