// queries.js
const { MongoClient } = require("mongodb");

// MongoDB Atlas connection string
const uri = "mongodb+srv://MERN-JULY:NGnSxYK1xc8GIuBU@merncluster.cs9rdod.mongodb.net/?retryWrites=true&w=majority&appName=MernCluster";
const client = new MongoClient(uri);

// Database and collection
const dbName = "plp_bookstore";
const collectionName = "books";

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db(dbName);
    const books = db.collection(collectionName);

    // ------------------ CREATE ------------------
    const newBook = {
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-help",
      published_year: 2018,
      price: 1200,
      in_stock: true,
      pages: 320,
      publisher: "Avery",
    };
    await books.insertOne(newBook);
    console.log("📘 Book inserted successfully.");

    // ------------------ READ ------------------
    console.log("\n📚 All books:");
    const allBooks = await books.find({}).toArray();
    console.log(allBooks);

    // Projection: title and author only
    console.log("\n🎯 Projection (title + author):");
    const projectedBooks = await books.find({}, { projection: { title: 1, author: 1, _id: 0 } }).toArray();
    console.log(projectedBooks);

    // Sorting: by price ascending
    console.log("\n💰 Books sorted by price (ascending):");
    const sortedBooks = await books.find({}).sort({ price: 1 }).toArray();
    console.log(sortedBooks);

    // Pagination: first 5 books
    console.log("\n📄 Paginated books (limit 5):");
    const paginatedBooks = await books.find({}).limit(5).toArray();
    console.log(paginatedBooks);

    // ------------------ UPDATE ------------------
    console.log("\n✏️ Updating book price...");
    const updateResult = await books.updateOne(
      { title: "Atomic Habits" },
      { $set: { price: 1500 } }
    );
    console.log("Matched:", updateResult.matchedCount, "Modified:", updateResult.modifiedCount);

    // ------------------ DELETE ------------------
    console.log("\n🗑️ Deleting book by author 'James Clear'...");
    const deleteResult = await books.deleteOne({ author: "James Clear" });
    console.log("Deleted documents:", deleteResult.deletedCount);

    // ------------------ AGGREGATION ------------------
    console.log("\n📊 Average price by genre:");
    const aggResult = await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" }, count: { $sum: 1 } } },
      { $sort: { avgPrice: -1 } },
    ]).toArray();
    console.log(aggResult);

    console.log("\n📊 Author with most books:");
    const topAuthor = await books.aggregate([
      { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 },
    ]).toArray();
    console.log(topAuthor);

    console.log("\n📊 Books grouped by decade:");
    const byDecade = await books.aggregate([
      {
        $group: {
          _id: { $floor: { $divide: ["$published_year", 10] } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]).toArray();
    console.log(byDecade);

    // ------------------ INDEXING ------------------
    console.log("\n⚙️ Creating index on 'title' field...");
    await books.createIndex({ title: 1 });
    console.log("✅ Index on 'title' created successfully.");

    console.log("\n⚙️ Creating compound index on 'author' and 'published_year'...");
    await books.createIndex({ author: 1, published_year: 1 });
    console.log("✅ Compound index created successfully.");

    console.log("\n🔍 Example: using explain() to see index usage...");
    const explanation = await books.find({ title: "Atomic Habits" }).explain();
    console.log(JSON.stringify(explanation, null, 2));

  } catch (error) {
    console.error("❌ Error running queries:", error);
  } finally {
    await client.close();
    console.log("\n🔒 Connection closed");
  }
}

// Run the script
run();
