import { z } from "zod";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const prisma = new PrismaClient();

const MovieApiResponseSchema = z.array(
  z.object({
    _id: z.string(),
    id: z.string(),
    description: z.string(),
    director: z.array(z.string()),
    image: z.array(z.array(z.string()).length(2)),
    imdbid: z.string(),
    rank: z.number(),
    rating: z.string(),
    thumbnail: z.string().url(),
    title: z.string(),
    writers: z.array(z.string()),
    year: z.number(),
  })
);

const BASE_URL = "https://imdb-top-100-movies1.p.rapidapi.com/";

async function getTopRatedIMDBMovies() {
  const res = await fetch(BASE_URL, {
    headers: {
      "x-rapidapi-host": process.env.HOST ?? "",
      "x-rapidapi-key": process.env.KEY ?? "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  return MovieApiResponseSchema.parse(json);
}

async function seedMovies() {
  const movies = await getTopRatedIMDBMovies();
  console.log("got movies");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await prisma.movie.deleteMany();
  console.log("db cleared");

  //eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await prisma.movie.createMany({
    data: movies.map(({ imdbid, title, thumbnail, image, year }) => ({
      id: imdbid,
      title,
      year,
      thumbnail,
      image: image[image.length - 1]?.[1] ?? "",
    })),
  });
  console.log("db seeded");
}

void seedMovies();
