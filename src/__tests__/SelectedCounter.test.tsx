import { render } from '@testing-library/react';

import SelectedCounter from '../components/SelectedCounter/SelectedCounter';

describe('SelectedCounter component', () => {
  test('Renders with correct content', () => {
    const { getByText } = render(<SelectedCounter count={3} />);

    expect(getByText('Selected contacts: 3')).toBeInTheDocument();
  });
});
