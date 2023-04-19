export default function Button({ className, handleClick, text }) {
  return (
    <button className={`button${className}`} onClick={handleClick}>
      {text}
    </button>
  );
}
