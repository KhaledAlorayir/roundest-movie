import type { Movie } from "@prisma/client";
import React from "react";

type Props = {
  winner: Movie;
};

const WinnerCard = ({ winner }: Props) => {
  return (
    <div className="text-center">
      <h2 className="mb-6 text-lg font-bold">The winner is 🥳</h2>
      <div>
        <h3 className="mb-4 text-xl font-semibold">
          {winner.title}{" "}
          <span className="text-base font-medium text-gray-300">
            ({winner.year})
          </span>
        </h3>
        <div className="mx-auto max-w-sm overflow-hidden rounded">
          <img
            src={winner.image}
            alt={winner.title}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;
