import React, { ReactElement, useCallback } from 'react';
import { Movie } from '../interfaces';

type MovieItemProps = {
    movie: Movie;
    deleteMovie: (movie: Movie) => void;
    addMovieToWillWatch: (movie: Movie) => void;
    deleteMovieFromWillWatch: (movie: Movie) => void;
};

export function MovieItem(props: MovieItemProps): ReactElement<any> {
    const { movie, deleteMovie, addMovieToWillWatch, deleteMovieFromWillWatch } = props;
    const willWatchDelete = useCallback((): void => {
        deleteMovieFromWillWatch(movie);
    }, [deleteMovieFromWillWatch, movie]);

    const willWatchAdd = useCallback((): void => {
        addMovieToWillWatch(movie);
    }, [addMovieToWillWatch, movie]);

    const handleDeleteMovieClick = useCallback((): void => deleteMovie(movie), [
        deleteMovie,
        movie
    ]);

    return (
        <div className="card">
            <img
                className="card-img-top"
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                alt=""
            />
            <div className="card-body">
                <h6 className="card-title">{movie.title}</h6>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Rating: {movie.vote_average}</p>
                    {movie.willWatch ? (
                        <button type="button" className="btn btn-success" onClick={willWatchDelete}>
                            Will Watch
                        </button>
                    ) : (
                        <button type="button" className="btn btn-secondary" onClick={willWatchAdd}>
                            Will Watch
                        </button>
                    )}
                </div>
                <button type="button" onClick={handleDeleteMovieClick}>
                    Delete
                </button>
            </div>
        </div>
    );
}
