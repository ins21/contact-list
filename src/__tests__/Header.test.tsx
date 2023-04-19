import { render } from '@testing-library/react';

import Header from '../components/Header/Header';

describe('Header component', () => {
  test('Renders with correct content', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Contact List App')).toBeInTheDocument();
  });
});
