
// insert_books.js
const { MongoClient } = require("mongodb");

// ✅ MongoDB Atlas connection string (your details)
const url = "mongodb+srv://MERN-JULY:NGnSxYK1xc8GIuBU@cluster0.cs9rdod.mongodb.net/plp_bookstore?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url, { tlsAllowInvalidCertificates: true });

// Database and collection names
const dbName = "plp_bookstore";
const collectionName = "books";

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected successfully to MongoDB Atlas");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 📚 Sample 10 book documents
    const books = [
      { title: "The Silent Patient", author: "Alex Michaelides", genre: "Thriller", published_year: 2019, price: 14.99, in_stock: true, pages: 336, publisher: "Celadon Books" },
      { title: "Atomic Habits", author: "James Clear", genre: "Self-Help", published_year: 2018, price: 20.0, in_stock: true, pages: 320, publisher: "Avery" },
      { title: "Educated", author: "Tara Westover", genre: "Memoir", published_year: 2018, price: 18.5, in_stock: false, pages: 352, publisher: "Random House" },
      { title: "Where the Crawdads Sing", author: "Delia Owens", genre: "Fiction", published_year: 2018, price: 15.99, in_stock: true, pages: 384, publisher: "G.P. Putnam’s Sons" },
      { title: "Becoming", author: "Michelle Obama", genre: "Biography", published_year: 2018, price: 22.99, in_stock: true, pages: 448, publisher: "Crown" },
      { title: "The Midnight Library", author: "Matt Haig", genre: "Fantasy", published_year: 2020, price: 16.99, in_stock: true, pages: 304, publisher: "Canongate Books" },
      { title: "Dune", author: "Frank Herbert", genre: "Science Fiction", published_year: 1965, price: 12.5, in_stock: false, pages: 412, publisher: "Chilton Books" },
      { title: "The Alchemist", author: "Paulo Coelho", genre: "Philosophical Fiction", published_year: 1988, price: 10.99, in_stock: true, pages: 208, publisher: "HarperTorch" },
      { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", genre: "History", published_year: 2011, price: 21.5, in_stock: true, pages: 443, publisher: "Harper" },
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", published_year: 1925, price: 9.99, in_stock: true, pages: 180, publisher: "Charles Scribner’s Sons" },
    ];

    // Insert the books into the collection
    const result = await collection.insertMany(books);
    console.log(`📚 Inserted ${result.insertedCount} books into '${collectionName}' collection`);

  } catch (err) {
    console.error("❌ Error inserting books:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
}

run();