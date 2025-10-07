# MongoDB Fundamentals - Week 1 Assignment

## Setup Instructions

1. **Install Node.js** (v18+ recommended)  
   Download from [https://nodejs.org/](https://nodejs.org/)

2. **Set up MongoDB**  
   - Use **MongoDB Atlas** (cloud) or **MongoDB Community Edition** (local).  
   - Ensure your MongoDB user has **password authentication** and **Read/Write access** to the `plp_bookstore` database.  
   - Confirm your password is correct (you already have it: `NGnSxYK1xc8GIuBU`).

3. **Open the project folder** in VS Code or File Explorer.

4. **Install dependencies**  
   Open a terminal in the project folder and run:
   ```bash
   npm install

5. **Insert sample books into MongoDB
    -node insert_books.js

6. **Run queries
    -node queries.js

   
    FILES INCLUDED

insert_books.js – Inserts 10 sample books into the plp_bookstore database.

queries.js – Performs CRUD operations, advanced queries, aggregation, and indexing.

screenshots/ – Contains proof of data inserted in MongoDB.

README.md – Explains how to run and use the project.

    
     DATABASE DETAILS

Database: plp_bookstore

Collection: books

    Sample Document;
    {
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help",
  "published_year": 2018,
  "price": 1200,
  "in_stock": true,
  "pages": 320,
  "publisher": "Avery"
}

        SCREENSHOTS

After inserting data:

Open MongoDB Compass or Atlas UI.

Connect to your cluster (mongodb+srv://MERN-JULY:NGnSxYK1xc8GIuBU@merncluster.cs9rdod.mongodb.net/?retryWrites=true&w=majority
)

Navigate to the plp_bookstore database → books collection.

Take a screenshot showing the documents.

Save it in the project folder under screenshot_books.docx

💡 Tip: On Windows, press Win + Shift + S to take a screenshot.


#Happy coding#

