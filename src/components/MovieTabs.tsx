import React from 'react';
import classNames from 'classnames';
import { FILTERS } from '../interfaces/filters';

export default class MovieTabs extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.sort_by !== this.props.sort_by) {
      return true;
    } else {
      return false;
    }
  }

  getTabClass(value) {
    return classNames('nav-link', {
      active: this.props.sort_by === value
    });
  }

  handleClick(value) {
    return () => this.props.updateSortBy(value);
  }

  render() {
    return (
      <ul className="tabs nav nav-pills">
        <li className="nav-item">
          <div
            onClick={this.handleClick(FILTERS.popularity)}
            className={this.getTabClass(FILTERS.popularity)}
          >
            Popularity desc
          </div>
        </li>
        <li className="nav-item">
          <div
            onClick={this.handleClick(FILTERS.revenue)}
            className={this.getTabClass(FILTERS.revenue)}
          >
            Revenue desc
          </div>
        </li>
        <li className="nav-item">
          <div
            onClick={this.handleClick(FILTERS.vote_average)}
            className={this.getTabClass(FILTERS.vote_average)}
          >
            Vote avetage desc
          </div>
        </li>
      </ul>
    );
  }
}
