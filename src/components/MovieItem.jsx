import React from "react";

export default class MovieItem extends React.Component {
  state = {
    willWatch: false
  };

  render() {
    const {
      data,
      deleteMovie,
      addMovieToWillWatch,
      deleteMovieFromWillWatch
    } = this.props;

    const handleWillWatchClick = (willWatch, action) => () => {
      this.setState({
        willWatch
      });
      action(data);
    };

    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${data.backdrop_path ||
            data.poster_path}`}
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
            onClick={() => {
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
