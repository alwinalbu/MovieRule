export interface Movie {
  id: number;
  name: string;
  date: string;
  image: string;
  rating: number;
}

export const moviesData: Movie[] = [
  {
    id: Math.random(),
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkmMH-bEDUS2TmK8amBqgIMgrfzN1_mImChPuMrunA1XjNTSKm",
    name: "The Shawshank Redemption",
    date: "1994",
    rating:5,
  },
  {
    id: Math.random(),
    image:
      "https://m.media-amazon.com/images/M/MV5BNWYxZWFiNTItN2FkNS00ZDJmLWE1MWItYjMyMTgyOTI4MmQ4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    name: "Coach Carter",
    date: "2005",
    rating: 5,
  },
  {
    id: Math.random(),
    image:
      "https://images-na.ssl-images-amazon.com/images/I/912nafeR%2BNL._SY445_.jpg",
    name: "The Blind Side",
    date: "2009",
    rating: 5,
  },
  {
    id: Math.random(),
    image:
      "https://images-na.ssl-images-amazon.com/images/I/91avFh9KUhL._SY679_.jpg",
    name: "The Terminal",
    date: "2004",
    rating: 4,
  },
  {
    id: Math.random(),
    image:
      "https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_.jpg",
    name: "The Martian",
    date: "2015",
    rating: 4,
  },
];
