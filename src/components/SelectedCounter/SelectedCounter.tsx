import './SelectedCounter.css';

type SelectedCounterProps = {
  count: number;
};

function SelectedCounter({ count }: SelectedCounterProps) {
  return <div className='selected'>Selected contacts: {count}</div>
}

export default SelectedCounter;
