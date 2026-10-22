import anecdotesService from "../services/anecdotes";
import { useEffect, useState } from "react";

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);
  useEffect(() => {
    const fetchAnecdotes = async () => {
      setAnecdotes(await anecdotesService.getAll());
    };
    fetchAnecdotes();
  }, [anecdotes]);

  const addAnecdote = async anecdote => {
    const createdAnecdote = await anecdotesService.createNew(anecdote);
    setAnecdotes(current => current.concat(createdAnecdote));
  };

  const deleteAnecdote = async id => {
    anecdotesService.remove(id);
    setAnecdotes(current => current.filter(a => a.id !== id));
  };

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote,
  };
};
