import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export const fileTypes = v.union(
  v.literal('image'),
  v.literal('pdf'),
  v.literal('doc'),
  v.literal('docx'),
  v.literal('xls'),
  v.literal('xlsx'),
  v.literal('ppt'),
  v.literal('pptx'),
  v.literal('txt'),
  v.literal('csv'),
  v.literal('zip'),
  v.literal('rar'),
  v.literal('mp3'),
  v.literal('mp4'),
  v.literal('avi'),
  v.literal('mov'),
  v.literal('wav'),
  v.literal('mpg'),
  v.literal('mpeg'),
  v.literal('gif'),
  v.literal('png'),
  v.literal('jpg'),
  v.literal('jpeg'),
  v.literal('svg'),
  v.literal('bmp'),
  v.literal('gif'),
  v.literal('tiff'),
  v.literal('webp'),
  v.literal('m4a'),
  v.literal('hwp')
)

export default defineSchema({
  files: defineTable({
    name: v.string(),
    orgId: v.string(),
    type: fileTypes,
    fileId: v.id('_storage'),
  }).index('by_orgId', ['orgId']),
  users: defineTable({
    tokenIdentifier: v.string(),
    orgIds: v.array(v.string()),
  }).index('by_tokenIdentifier', ['tokenIdentifier']),
  favorites: defineTable({
    fileId: v.id('files'),
    orgId: v.string(),
    userId: v.id('users'),
  }).index('by_userId_orgId_fileId', ['userId', 'orgId', 'fileId']),
})
