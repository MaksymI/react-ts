import React, { ReactElement, useCallback } from 'react';
import { Movie } from '../interfaces';

type WillWatchItemProps = {
    movie: Movie;
    deleteMovieFromWillWatch: (movie: Movie) => void;
};

export function WillWatchItem(props: WillWatchItemProps): ReactElement<any> {
    const { movie, deleteMovieFromWillWatch } = props;
    const handleDeleteMovieClick = useCallback((): void => deleteMovieFromWillWatch(movie), [
        deleteMovieFromWillWatch,
        movie
    ]);

    return (
        <div className="card w-60">
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.vote_average}</p>
                <button type="button" className="btn btn-primary" onClick={handleDeleteMovieClick}>
                    Delete
                </button>
            </div>
        </div>
    );
}
