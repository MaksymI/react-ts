import React, { Component } from 'react';
import { Movie } from '../interfaces';

const initialState = { willWatch: false };
type MovieItemState = Readonly<typeof initialState>;

type MovieItemProps = {
    data: Movie;
    deleteMovie: (movie: Movie) => void;
    addMovieToWillWatch: (movie: Movie) => void;
    deleteMovieFromWillWatch: (movie: Movie) => void;
};

export class MovieItem extends Component<MovieItemProps, MovieItemState> {
    readonly state: MovieItemState = initialState;

    render(): JSX.Element {
        const { data, deleteMovie, addMovieToWillWatch, deleteMovieFromWillWatch } = this.props;

        const handleWillWatchClick = (
            willWatch: boolean,
            action: (data: Movie) => void
        ): (() => void) => (): void => {
            this.setState({
                willWatch
            });
            action(data);
        };

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
                        {this.state.willWatch ? (
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleWillWatchClick(false, deleteMovieFromWillWatch)}
                            >
                                Will Watch
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleWillWatchClick(true, addMovieToWillWatch)}
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
}
