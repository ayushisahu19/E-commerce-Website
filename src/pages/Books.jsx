const dummyBooks = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "Deep Work", author: "Cal Newport" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin" },
];

export default function Books() {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">Books</h2>
        <p className="text-gray-700">
          A simple preview list (API integration comes next).
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {dummyBooks.map((b) => (
          <div
            key={b.id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <h3 className="font-semibold text-lg">{b.title}</h3>
            <p className="text-gray-600 text-sm">by {b.author}</p>
            <button className="mt-3 w-full bg-gray-900 text-white px-3 py-2 rounded-lg">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
