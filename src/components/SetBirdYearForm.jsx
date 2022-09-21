import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Select from 'react-select';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const SetBirdYearForm = ({ authors }) => {
  const [born, setBorn] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const authorOptions = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submitEditBorn = async (event) => {
    event.preventDefault();
    const name = selectedOption.value;
    editAuthor({
      variables: {
        name,
        born,
      },
    });
    setBorn('');
  };
  return (
    <div>
      <h3>set birthyear</h3>
      <form onSubmit={submitEditBorn}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={authorOptions}
        />
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default SetBirdYearForm;
