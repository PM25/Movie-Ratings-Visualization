import React, { PureComponent } from "react";
import { useSpring, animated } from "react-spring";

export default class RatingsSection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            movies: [
                {
                    title: "Shang-Chi and the Legend of the Ten Rings (2021)",
                    rating1: 76,
                    rating2: 72,
                },
                {
                    title: "Eternals (2021)",
                    rating1: 68,
                    rating2: 59,
                },
                {
                    title: "Black Widow (2021)",
                    rating1: 67,
                    rating2: 75,
                },
                {
                    title: "Avengers: Endgame (2019)",
                    rating1: 84,
                    rating2: 89,
                },
                {
                    title: "Captain America: The Winter Soldier (2014)",
                    rating1: 77,
                    rating2: 82,
                },
            ],
            showKey: "rating1",
            menuIdx: 0,
            choices: ["Ratings", "Box Office", "Year"],
            activeRatingBars: false,
        };

        this.sortMovieRatings("rating1");

        this.contentRef = React.createRef();
        this.handleScroll = this.handleScroll.bind(this);
    }

    sortMovieRatings(key = "rating1") {
        this.state.movies.sort((a, b) => {
            return b[key] - a[key];
        });

        this.setState({ showKey: key });

        return this.state.movies;
    }

    handleScroll() {
        let node = this.contentRef.current;
        let BoundingRect = node.getBoundingClientRect();
        let top_offset = BoundingRect.top,
            height = BoundingRect.height;

        // if is visible on the screen
        if (top_offset >= -height && top_offset < window.innerHeight) {
            this.setState({ activeRatingBars: true });
        } else {
            this.setState({ activeRatingBars: false });
        }
    }

    componentDidMount() {
        this.setState({ activeRatingBars: true });
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    onMouseClickMenu(key) {
        let next_idx = this.state.menuIdx + key;
        if (next_idx >= 0 && next_idx < this.state.choices.length) {
            this.setState({ menuIdx: next_idx });

            if (next_idx === 0) this.sortMovieRatings("rating1");
            else this.sortMovieRatings("rating2");
        }
    }

    render() {
        return (
            <div className="section" id="MoviesRating">
                <DropDownMenu
                    index={this.state.menuIdx}
                    choices={this.state.choices}
                    onMouseClick={(idx) => this.onMouseClickMenu(idx)}
                />
                <div className="content" ref={this.contentRef}>
                    <ul>
                        {this.state.movies.map((state, key) => (
                            <MovieRatingBlock
                                key={key}
                                title={state.title}
                                rating={state[this.state.showKey]}
                                is_active={this.state.activeRatingBars}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

function MovieRatingBlock(props) {
    const progessBarProps = useSpring({
        config: { friction: 64, tension: 128 },
        width: props.is_active ? props.rating + "%" : "0%",
        delay: props.is_active ? Math.random() * 250 : 0,
    });

    return (
        <li>
            <span>{props.title}</span>
            <div className="rating-bar">
                <animated.div
                    className="rating-bar-fill"
                    style={progessBarProps}
                ></animated.div>
            </div>
        </li>
    );
}

function DropDownMenu(props) {
    return (
        <div className="dropDownMenu">
            <i
                class="fas fa-caret-left button"
                onClick={() => props.onMouseClick(-1)}
            ></i>
            <h2 className="choice">{props.choices[props.index]}</h2>
            <i
                class="fas fa-caret-right button"
                onClick={() => props.onMouseClick(1)}
            ></i>
        </div>
    );
}
