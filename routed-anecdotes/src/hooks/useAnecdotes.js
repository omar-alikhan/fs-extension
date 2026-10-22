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

  const addAnecdote = async anecdote => {
    const createdAnecdote = await anecdotesService.createNew(anecdote);
    setAnecdotes(anecdotes.concat(createdAnecdote));
  };

  return {
    anecdotes,
    addAnecdote,
  };
};
