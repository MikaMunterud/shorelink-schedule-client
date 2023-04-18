export default function ButtonIcon({ handleClick, icon }) {
  return (
    <span className={"buttonIcon"} onClick={handleClick}>
      {icon}
    </span>
  );
}
