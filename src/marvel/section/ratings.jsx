import React, { PureComponent } from "react";
import { useSpring, animated } from "react-spring";

export default class RatingsSection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            movieRatings: [
                {
                    title: "Shang-Chi and the Legend of the Ten Rings (2021)",
                    rating: 76,
                },
                {
                    title: "Eternals (2021)",
                    rating: 68,
                },
                {
                    title: "Black Widow (2021)",
                    rating: 67,
                },
                {
                    title: "Avengers: Endgame (2019)",
                    rating: 84,
                },
                {
                    title: "Captain America: The Winter Soldier (2014)",
                    rating: 77,
                },
            ],
            activeRatingBars: false,
        };

        this.contentRef = React.createRef();
        this.handleScroll = this.handleScroll.bind(this);
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

    render() {
        return (
            <div className="section" id="MoviesRating">
                <h2 className="header">Ratings</h2>
                <div className="content" ref={this.contentRef}>
                    <ul>
                        {this.state.movieRatings.map((state, key) => (
                            <MovieRatingBlock
                                key={key}
                                title={state.title}
                                rating={state.rating}
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
        config: { friction: 256, tension: 360 },
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
