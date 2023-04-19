import React, { useEffect, useState } from 'react';

import apiData from './api';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import SelectedCounter from './components/SelectedCounter/SelectedCounter';
import Button from './components/Button/Button';
import ContactList from './components/ContactList/ContactList';
import { Contact } from './types';

function App() {
  const [data, setData] = useState([] as Contact[]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    const newData = await apiData();
    if (newData) setData([...data, ...newData]);
    setLoading(false);
  }

  const onCardClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const personInfoElement = target.closest('.person-info') as HTMLElement;
    const personId = personInfoElement?.id;

    if (personId) {
      const updatedIds = new Set(selected);
      selected.has(personId) ? updatedIds.delete(personId) : updatedIds.add(personId);
      setSelected(updatedIds);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [])

  return (
    <div className='App'>
      <Header />
      <main className='main'>
        {
          loading && data.length === 0
          ? <Loader />
          : <>
              <SelectedCounter count={selected.size} />
              <ContactList data={data} selected={selected} onClick={onCardClick} />
              {loading && <Loader />}
              <Button onClick={fetchData}>Load more</Button>
            </>
        }
      </main>
    </div>
  );
}

export default App;
