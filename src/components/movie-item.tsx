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
    const willWatchDelete = useCallback((): void => {
        setWillWatch(false);
        deleteMovieFromWillWatch(data);
    }, [deleteMovieFromWillWatch, data]);

    const willWatchAdd = useCallback((): void => {
        setWillWatch(true);
        addMovieToWillWatch(data);
    }, [addMovieToWillWatch, data]);

    const handleDeleteMovieClick = useCallback((): void => deleteMovie(data), [deleteMovie, data]);

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
