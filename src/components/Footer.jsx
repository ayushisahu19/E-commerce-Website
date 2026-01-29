export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} BookStore Frontend
      </div>
    </footer>
  );
}
