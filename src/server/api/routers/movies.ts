import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const moviesRouter = createTRPCRouter({
  vote: publicProcedure
    .input(z.string().trim().min(1).max(256))
    .mutation(async ({ ctx, input }) => {
      const rows_effected = await ctx.prisma
        .$executeRaw`UPDATE movies SET votes = votes + 1 WHERE id = ${input}`;

      if (rows_effected === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "id doesn't exists",
        });
      }

      return { success: true };
    }),
});
