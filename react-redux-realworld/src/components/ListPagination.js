import React from 'react';

// map pagenumbers to li's with click handlers
const ListPagination = props => {
  // no need to paginate
  if (props.articlesCount <= 10) {
    return null;
  }

  // get the number of pages we need
  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  // goto page => setPage(page)
  const setPage = page => props.onSetPage(page);

  return (
    <nav>
      <ul className="pagination">

        {
          range.map(v => {
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              setPage(v);
            };
            return (
              <li
                className = { isCurrent ? 'page-item active' : 'page-item' }
                onClick = { onClick }
                key = {v.toString()}>
                <a className="page-link" href="">{v+1}</a>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
};

export default ListPagination;
