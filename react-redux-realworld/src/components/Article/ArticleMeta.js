import { Link } from 'react-router';
import React from 'react';
import ArticleActions from './ArticleActions';

// article meta: pass data in article object, render data,
// render actions component
const ArticleMeta = props => {
  const article = props.article;
  return (
    <div className="article-meta">
      <Link to={`@${article.author.username}`}>
        <img src={article.author.image} />
      </Link>

      <div className="info">
        <Link to={`@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>

        <ArticleActions canModify={props.canModify} article={article} />
      </div>
    </div>
  );
}

export default ArticleMeta;