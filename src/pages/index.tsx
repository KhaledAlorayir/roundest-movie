import type { Movie } from "@prisma/client";
import type { NextPage, GetStaticProps } from "next";
import { useState, useEffect } from "react";
import MovieCard from "~/components/MovieCard";
import WinnerCard from "~/components/WinnerCard";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

type Props = {
  movies: Movie[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const movies = await prisma.movie.findMany();
  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)) as Movie[],
    },
  };
};

const Home: NextPage<Props> = ({ movies }) => {
  const [round, setRound] = useState<{ first: Movie; second: Movie } | null>(
    null
  );
  const [availableMovies, setAvailableMovies] = useState(movies);
  const [winner, setWinner] = useState<Movie>();
  const { mutate: vote } = api.movies.vote.useMutation();

  function chooseHandler(chosen: Movie) {
    if (availableMovies.length === 2) {
      setWinner(chosen);
      vote(chosen.id);
      return;
    }
    if (round) {
      const notChosenId =
        chosen.id === round.first.id ? round.second.id : round.first.id;
      setAvailableMovies(
        availableMovies.filter((movie) => movie.id !== notChosenId)
      );
    }
  }

  function getRoundMoviesIndexes(): {
    firstIndex: number;
    secondIndex: number;
  } {
    const firstIndex = Math.floor(Math.random() * availableMovies.length);
    const secondIndex = Math.floor(Math.random() * availableMovies.length);

    if (
      firstIndex === secondIndex ||
      ((availableMovies[firstIndex]?.id === round?.first.id ||
        availableMovies[firstIndex]?.id === round?.second.id ||
        availableMovies[secondIndex]?.id === round?.first.id ||
        availableMovies[secondIndex]?.id === round?.second.id) &&
        availableMovies.length > 3)
    ) {
      return getRoundMoviesIndexes();
    }
    return { firstIndex, secondIndex };
  }

  function setupRound() {
    const { firstIndex, secondIndex } = getRoundMoviesIndexes();
    setRound({
      first: availableMovies[firstIndex]!,
      second: availableMovies[secondIndex]!,
    });
  }
  useEffect(() => {
    setupRound();
  }, [availableMovies]);

  return (
    <main className="flex flex-1 items-center justify-center p-2">
      <div className="w-full">
        {winner ? (
          <WinnerCard winner={winner} />
        ) : (
          <>
            <header className="mb-8 text-center font-bold text-primary">
              <h2 className="text-lg">Which Movie is Better?</h2>
              <p>
                {movies.length - availableMovies.length + 1}/{movies.length - 1}
              </p>
            </header>
            {round && (
              <section className="flex flex-col items-center justify-center gap-y-8 md:flex-row">
                <MovieCard movie={round.first} handler={chooseHandler} />
                <p className="text-xl font-bold">VS</p>
                <MovieCard movie={round.second} handler={chooseHandler} />
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
