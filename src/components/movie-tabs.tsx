import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import { FILTERS } from '../interfaces';

type MovieTabsProps = {
    sort_by: FILTERS;
    updateSortBy: (value: FILTERS) => void;
};

export class MovieTabs extends Component<MovieTabsProps, object> {
    shouldComponentUpdate(nextProps: MovieTabsProps): boolean {
        if (nextProps.sort_by !== this.props.sort_by) {
            return true;
        } else {
            return false;
        }
    }

    getTabClass(value: FILTERS): string {
        return classNames('nav-link', {
            active: this.props.sort_by === value
        });
    }

    handleClick(value: FILTERS): () => void {
        return (): void => this.props.updateSortBy(value);
    }

    render(): ReactElement<any> {
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
                        onClick={this.handleClick(FILTERS.voteAverage)}
                        className={this.getTabClass(FILTERS.voteAverage)}
                    >
                        Vote avetage desc
                    </div>
                </li>
            </ul>
        );
    }
}
