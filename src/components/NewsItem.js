import React, {Component} from "react";

export class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, author, publishedAt, source} =
            this.props;
        return (
            <div className="my-3">
                <div className="card">
          <span className="badge bg-info position-absolute top-0 start-0 m-2">
            {source}
          </span>
                    <img
                        src={
                            imageUrl
                                ? imageUrl
                                : "https://euaa.europa.eu/sites/default/files/styles/width_600px/public/default_images/news-default-big.png?itok=NNXAZZTc"
                        }
                        className="card-img-top"
                        alt="..."
                    />
                    <div className="card-body">
                        <h5 className="card-title">
                            {title !== null && title.length > 80
                                ? title.slice(0, 80) + "..."
                                : title}
                        </h5>
                        <p className="card-text">
                            {description !== null && description.length > 120
                                ? description.slice(0, 120) + "..."
                                : description}
                        </p>
                        <p className="card-text">
                            <small className="text-muted">
                                By {author ? author : "Unknown"} on{" "}
                                {new Date(publishedAt).toGMTString()}
                            </small>
                        </p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
