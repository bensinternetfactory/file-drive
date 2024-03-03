import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createFile = mutation({
	args: {
		name: v.string(),
	},
	async handler(ctx, args) {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			throw new ConvexError("you must be logged in");
		}

		await ctx.db.insert("files", {
			name: args.name,
		});
	},
});

export const getFiles = query({
	async handler(ctx) {
		const identity = await ctx.auth.getUserIdentity();

		if (!identity) {
			return [];
		}
		// Fetch all files using ctx.db.query
		const results = await ctx.db.query("files").collect();
		return results;
	},
});
