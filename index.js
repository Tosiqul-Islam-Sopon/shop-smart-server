const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

//Must remove "/" from your production URL
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://shop-smart-a4283.web.app",
        ]
    })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nnvexxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        // await client.connect();
        const database = client.db("shop-smart");
        const productCollection = database.collection("products");

        app.get("/products", async (req, res) => {

            const { page = 1, limit = 15, search = '', brand = '', category = '', priceRange = '', sort = '' } = req.query;
            const skip = (page - 1) * limit;

            const query = {};

            if (search) {
                query.productName = { $regex: search, $options: 'i' };
            }

            if (brand) {
                query.brand = brand;
            }

            if (category) {
                query.category = category;
            }

            if (priceRange) {
                const [min, max] = priceRange.split('-').map(Number);
                if (max) {
                    query.price = { $gte: min, $lte: max };
                } else {
                    query.price = { $gte: min };
                }
            }

            const sortOptions = {};
            if (sort === 'priceAsc') {
                sortOptions.price = 1;
            } else if (sort === 'priceDesc') {
                sortOptions.price = -1;
            } else if (sort === 'dateDesc') {
                sortOptions.creationDateTime = -1;
            }

            try {
                const products = await productCollection.find(query)
                    .sort(sortOptions)
                    .skip(skip)
                    .limit(parseInt(limit))
                    .toArray();
                const totalProducts = await productCollection.countDocuments(query);
                const totalPages = Math.ceil(totalProducts / limit);

                res.json({
                    products,
                    pagination: {
                        currentPage: page,
                        totalPages,
                        totalProducts,
                        perPage: limit
                    }
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });

        app.get("/categories", async (req, res) => {
            try {
                const categories = await productCollection.distinct("category");
                res.json(categories);
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });

        app.get("/brands", async (req, res) => {
            try {
                const brands = await productCollection.distinct("brand");
                res.json(brands);
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
