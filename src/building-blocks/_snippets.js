const ArticleList = () => [
    <h2>All Articles</h2>,
    <ul>
      {Object.keys(ARTICLES).map(key => (
        <li key={key}>
          Go to individual article route:{' '}
          <Link to={`/articles/${key}`}>{ARTICLES[key].title}</Link>
        </li>
      ))}
    </ul>,
  ];