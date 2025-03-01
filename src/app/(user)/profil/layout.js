export default function BlogLayout({ children, modal }) {
  return (
    <div className="relative mt-20">
      {children}
      {modal}
    </div>
  );
} 