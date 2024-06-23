import { ConvexError, v } from 'convex/values'
import { mutation, MutationCtx, query, QueryCtx } from './_generated/server'
import { getUser } from './users'
import { fileTypes } from './schema'

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity()

  if (!identity) {
    throw new ConvexError('Unauthorized')
  }

  return await ctx.storage.generateUploadUrl()
})

export const hasAccessToOrg = async (
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string,
  orgId: string
) => {
  const user = await getUser(ctx, tokenIdentifier)

  const hasAccess =
    user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId)

  return hasAccess
}

export const createFile = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
    type: fileTypes,
    fileId: v.id('_storage'),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new ConvexError('Unauthorized')
    }

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    )

    if (!hasAccess) {
      throw new ConvexError(
        'You do not have permission to create a file in this organization'
      )
    }
    await ctx.db.insert('files', {
      name: args.name,
      orgId: args.orgId,
      fileId: args.fileId,
      type: args.type,
    })
  },
})

export const getFiles = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      return []
    }

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    )

    if (!hasAccess) {
      return []
    }
    return await ctx.db
      .query('files')
      .withIndex('by_orgId', (q) => q.eq('orgId', args.orgId))
      .collect()
  },
})

export const deleteFile = mutation({
  args: {
    fileId: v.id('files'),
  },

  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new ConvexError('you do not hve access to this org')
    }

    const file = await ctx.db.get(args.fileId)

    if (!file) {
      throw new ConvexError('File not found')
    }

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      file.orgId
    )

    if (!hasAccess) {
      throw new ConvexError('you do not hve access to this org')
    }

    await ctx.db.delete(args.fileId)
  },
})
