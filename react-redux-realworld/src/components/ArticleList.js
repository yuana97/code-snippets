'use strict';

import React, { Component } from 'react';
import ArticlePreview from './ArticlePreview';

// loading/empty page from props, otherwise map articles to previous
const ArticleList = props => {
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.articles.map(article => {
          return (
            <ArticlePreview article={article} key={article.slug} />
          );
        })
      }
    </div>
  );
}

export default ArticleList;