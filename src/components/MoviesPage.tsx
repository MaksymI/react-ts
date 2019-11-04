import React, { Component } from 'react';
import { MovieItem, MovieTabs } from '.';
import { API_KEY_3, callApi } from '../utils/api';
import { FILTERS, Movie } from '../interfaces';

const initialState: MoviesState = {
    movies: [],
    moviesWillWatch: [],
    sort_by: FILTERS.popularity
};
type MoviesState = {
    movies: Movie[];
    moviesWillWatch: Movie[];
    sort_by: FILTERS;
};

export class MoviesPage extends Component<object, MoviesState> {
    readonly state: MoviesState = initialState;

    componentDidMount(): void {
        console.log('MoviesPage didMount');
        this.getMovies();
    }

    componentDidUpdate(_prevProps: {}, prevState: MoviesState): void {
        console.log('MoviesPage didUpdate');
        // console.log("prev", prevProps, prevState);
        // console.log("this", this.props, this.state);
        if (prevState.sort_by !== this.state.sort_by) {
            console.log('MoviesPage call api');
            this.getMovies();
        }
    }

    getMovies = async (): Promise<void> => {
        const data = await callApi(
            `discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}`
        );

        this.setState({
            movies: data.results
        });
    };

    deleteMovie = (movie: Movie): void => {
        console.log(movie.id);
        const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
        console.log(updateMovies);

        this.setState({
            movies: updateMovies
        });
    };

    addMovieToWillWatch = (movie: Movie): void => {
        const updateMoviesWillWatch = [...this.state.moviesWillWatch];
        updateMoviesWillWatch.push(movie);

        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        });
    };

    deleteMovieFromWillWatch = (movie: { id: string }): void => {
        const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
            item => item.id !== movie.id
        );

        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        });
    };

    updateSortBy = (value: FILTERS): void => {
        this.setState({
            sort_by: value
        });
    };

    render(): JSX.Element {
        console.log('MoviesPage render', this.state.sort_by);
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-9">
                        <div className="row mb-4">
                            <div className="col-12">
                                <MovieTabs
                                    sort_by={this.state.sort_by}
                                    updateSortBy={this.updateSortBy}
                                />
                            </div>
                        </div>
                        <div className="row">
                            {this.state.movies.map(movie => {
                                return (
                                    <div className="col-6 mb-4" key={movie.id}>
                                        <MovieItem
                                            data={movie}
                                            deleteMovie={this.deleteMovie}
                                            addMovieToWillWatch={this.addMovieToWillWatch}
                                            deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="col-3">
                        <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
                        <ul className="list-group">
                            {this.state.moviesWillWatch.map(movie => (
                                <li key={movie.id} className="list-group-item">
                                    <div className="d-flex justify-content-between">
                                        <p>{movie.title}</p>
                                        <p>{movie.vote_average}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
