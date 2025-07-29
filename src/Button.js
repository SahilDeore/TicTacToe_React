export default function Button({ text, onButtonClick }) {
  return (
    <div>
    <button className="clicker" onClick={onButtonClick}>
      {text}
    </button>
    </div>
  );
}