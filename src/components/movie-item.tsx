import React, { ReactElement, useCallback, useState } from 'react';
import { Movie } from '../interfaces';

type MovieItemProps = {
    data: Movie;
    deleteMovie: (movie: Movie) => void;
    addMovieToWillWatch: (movie: Movie) => void;
    deleteMovieFromWillWatch: (movie: Movie) => void;
};

export function MovieItem(props: MovieItemProps): ReactElement<any> {
    const [willWatch, setWillWatch] = useState(false);
    const { data, deleteMovie, addMovieToWillWatch, deleteMovieFromWillWatch } = props;
    const handleWillWatchClick = useCallback(
        (willWatch: boolean, action: (data: Movie) => void): void => {
            setWillWatch(willWatch);
            action(data);
        },
        [willWatch, data]
    );

    return (
        <div className="card">
            <img
                className="card-img-top"
                src={`https://image.tmdb.org/t/p/w500${data.backdrop_path || data.poster_path}`}
                alt=""
            />
            <div className="card-body">
                <h6 className="card-title">{data.title}</h6>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Rating: {data.vote_average}</p>
                    {willWatch ? (
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={(): void =>
                                handleWillWatchClick(false, deleteMovieFromWillWatch)
                            }
                        >
                            Will Watch
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={(): void => handleWillWatchClick(true, addMovieToWillWatch)}
                        >
                            Will Watch
                        </button>
                    )}
                </div>
                <button
                    type="button"
                    onClick={(): void => {
                        deleteMovie(data);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
