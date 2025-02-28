export default function BlogLayout({ children, modal }) {
  return (
    <div className="relative">
      {children}
      {modal}
    </div>
  );
} 