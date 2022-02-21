import { useParams } from "react-router-dom";

export default function Item() {
  const { id } = useParams();
  return (
    <div>
      <p>here {id}</p>
    </div>
  );
}
