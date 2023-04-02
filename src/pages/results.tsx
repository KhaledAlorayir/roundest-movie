import type { Movie } from "@prisma/client";
import type { GetStaticProps, NextPage } from "next";
import { prisma } from "~/server/db";

type Props = { movies: Movie[] };

export const getStaticProps: GetStaticProps<Props> = async () => {
  const movies = await prisma.movie.findMany({ orderBy: { votes: "desc" } });

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)) as Movie[],
    },
    revalidate: 3600,
  };
};

const Results: NextPage<Props> = ({ movies }: Props) => {
  return (
    <main className="px-4 py-8">
      <h2 className="mb-8 text-center text-lg font-bold text-primary">
        votes 🤭
      </h2>
      <section>
        {movies.map(({ id, thumbnail, votes, title }) => (
          <ul key={id}>
            <li className="mb-5 flex items-center space-x-4">
              <img src={thumbnail} alt={title} className="h-24 w-16" />
              <p className="text-lg font-bold">
                {title} -{" "}
                <span className="font-semibold text-primary">
                  {votes} votes
                </span>
              </p>
            </li>
          </ul>
        ))}
      </section>
    </main>
  );
};

export default Results;
