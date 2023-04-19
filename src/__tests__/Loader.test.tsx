import { render } from '@testing-library/react';

import Loader from '../components/Loader/Loader';

describe('Loader component', () => {
  test('Renders correcrtly', () => {
    const { getByRole } = render(<Loader />);

    expect(getByRole('status')).toBeInTheDocument();
  });
});
