import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TAGS } from '../graphql/queries';
import { Link as RouterLink } from 'react-router-dom';

import { Typography, Chip, TextField, InputAdornment } from '@material-ui/core';
import { useTagsPageStyles } from '../styles/muiStyles';
import SearchIcon from '@material-ui/icons/Search';

const AllTagsPage = () => {
  const { data, loading } = useQuery(GET_ALL_TAGS);
  const [filterInput, setFilterInput] = useState('');
  const classes = useTagsPageStyles();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.titleText}>
        Tags
      </Typography>
      <Typography variant="body1">
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using <br />
        the right tags makes it easier for others to find and answer your
        question.
      </Typography>
      <TextField
        className={classes.filterInput}
        value={filterInput}
        placeholder="Filter by tag name"
        onChange={(e) => setFilterInput(e.target.value)}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <div className={classes.tagsWrapper}>
        {data.getAllTags
          .filter((t) => t.tagName.includes(filterInput))
          .map((t) => (
            <div key={t.tagName} className={classes.tagBox}>
              <Chip
                label={t.tagName}
                variant="outlined"
                color="primary"
                size="small"
                component={RouterLink}
                to={`/tags/${t.tagName}`}
                className={classes.tag}
                clickable
              />
              <Typography variant="caption" color="secondary">
                {t.count} questions
              </Typography>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllTagsPage;