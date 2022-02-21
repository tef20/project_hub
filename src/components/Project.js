import { useParams } from "react-router-dom";

export default function Project({projects}) {
  const { id } = useParams();
  return (
    <div className='projectPage'>
      <p>here {projects[id].name}</p>
    </div>
  );
}
