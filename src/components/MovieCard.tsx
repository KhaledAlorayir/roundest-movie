import type { Movie } from "@prisma/client";

type Props = {
  movie: Movie;
  handler: (movie: Movie) => void;
};

const MovieCard = ({ movie, handler }: Props) => {
  return (
    <div className="flex-1 text-center">
      <div className="mx-auto mb-2 w-1/2 max-w-lg overflow-hidden rounded">
        <img src={movie.image} className="h-full w-full" />
      </div>
      <h3 className="mb-4 text-lg font-semibold">
        {movie.title}{" "}
        <span className="text-base font-medium text-gray-300">
          ({movie.year})
        </span>
      </h3>
      <button className="btn-primary btn" onClick={() => handler(movie)}>
        Choose
      </button>
    </div>
  );
};

export default MovieCard;
