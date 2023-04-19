import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';

import App from '../App';
import apiData from '../api';

jest.mock('../api', () => jest.fn());

jest.mock('../components/Loader/Loader', () => () => <div>Loading...</div>);

const data = [{ id: '1', firstNameLastName: 'User1', jobTitle: 'Title1', emailAddress: 'Email1' }];

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (apiData as jest.MockedFunction<typeof apiData>).mockResolvedValue(data);
  });

  it('calls "apiData" function when component was mounted', async () => {
    await act(async () => {
      render(<App />);
      await waitFor(() => expect(apiData).toHaveBeenCalledTimes(1));
    });
  });

  it('renders "Header" component', async () => {
    await act(async () => {
      const { getByText } = render(<App />);
      await waitFor(() => expect(getByText('Contact List App')).toBeInTheDocument());
    });
  });

  it('renders "Loader" component while data is loading', async () => {
    const { queryByText, getByText } = render(<App />);

    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => apiData());
    expect(queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('renders contacts when data was loaded', async () => {
    const { getByText, queryByTestId } = render(<App />);

    await waitFor(() => apiData());

    expect(getByText('Selected contacts: 0')).toBeInTheDocument();
    expect(queryByTestId('contact-list')).toBeInTheDocument();
    expect(getByText('User1')).toBeInTheDocument();
    expect(getByText('Title1')).toBeInTheDocument();
    expect(getByText('Email1')).toBeInTheDocument();
    expect(getByText('Load more')).toBeInTheDocument();
  });

  it('allows to select and deselect a contact', async () => {
    const { getByText, getByTestId } = render(<App />);

    await waitFor(() => apiData());

    const card = getByTestId('person-info');

    fireEvent.click(card);
    expect(getByText('Selected contacts: 1')).toBeInTheDocument();

    fireEvent.click(card);
    expect(getByText('Selected contacts: 0')).toBeInTheDocument();
  });

  it('calls "apiData" function when button was clicked', async () => {
    await act(async () => {
      const { getByText } = render(<App />);
      (apiData as jest.MockedFunction<typeof apiData>)
        .mockResolvedValueOnce(data)
        .mockResolvedValueOnce([{ id: '2', firstNameLastName: 'User2', jobTitle: 'Title2', emailAddress: 'Email2' } ]);

      await waitFor(() => expect(apiData).toHaveBeenCalledTimes(1));

      fireEvent.click(getByText('Load more'));

      await waitFor(() => expect(apiData).toHaveBeenCalledTimes(2));
    });
  });
});
