import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 18,
    category: "sports",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  fetchNews = async () => {
    this.setState({ loading: true });
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=18497f54c28e4c2892bdd6239ce0283e&language=en&pageSize=${pageSize}&page=${page}`;

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
      document.title = `${this.capitalizeFirstLetter(this.props.category)} - DailyBrief`
    } catch (error) {
      console.log("Failed to fetch News Data: ", error);
      this.setState({
        loading: false,
      });
    }
  };

  handlePreviousButtonClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.fetchNews
    );
  };

  handleNextButtonClick = () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        this.fetchNews
      );
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "40px" }}>
        {this.capitalizeFirstLetter(this.props.category)} Highlights
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles &&
            this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : "No Title Found"}
                  description={
                    element.description
                      ? element.description
                      : "No Description Found"
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  publishedAt={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.handlePreviousButtonClick}
            className="btn btn-dark"
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextButtonClick}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
