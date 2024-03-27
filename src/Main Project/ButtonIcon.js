export default function ButtonIcon({
  className = null,
  icon,
  onClick,

  tooltip,
}) {
  return (
    <button title={tooltip} onClick={onClick} className={className}>
      {icon}
    </button>
  );
}
