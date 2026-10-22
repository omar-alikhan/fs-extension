import anecdotesService from "../services/anecdotes";
import { useEffect, useState } from "react";

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);
  useEffect(() => {
    const fetchAnecdotes = async () => {
      setAnecdotes(await anecdotesService.getAll());
    };
    fetchAnecdotes();
  }, []);

  return {
    anecdotes,
  };
};
