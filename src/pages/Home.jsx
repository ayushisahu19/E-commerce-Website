import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome to BookStore</h1>
      <p className="text-gray-700">
        Browse books, view details, and manage your collection.
      </p>

      <Link
        to="/books"
        className="inline-block bg-gray-900 text-white px-4 py-2 rounded-lg"
      >
        View Books
      </Link>
    </section>
  );
}
