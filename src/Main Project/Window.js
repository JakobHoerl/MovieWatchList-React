export default function Window({ children, className, title }) {
  return (
    <div className={className}>
      <div className="window-title">
        <span>{title}</span>
      </div>

      {children}
    </div>
  );
}
