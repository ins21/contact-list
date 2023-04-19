import { Contact } from "../../types";

import './PersonInfo.css';

type Props = {
  data: Contact;
  selected: boolean;
};

function PersonInfo(props: Props) {
  const { data, selected } = props;

  return (
    <div
      style={{
        border: selected ? "4px solid green" : "4px solid transparent",
      }}
      className='person-info'
      id={data.id}
      data-testid='person-info'
    >
      <div className="firstNameLastName">{data.firstNameLastName}</div>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}

export default PersonInfo;
