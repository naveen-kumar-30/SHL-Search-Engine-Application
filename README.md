# SHL Assessment Recommendation System

## About the Project

This project is a **search-driven Assessment Recommendation System** inspired by SHL’s Product Catalogue. It enables users to discover relevant assessments based on job roles, skills, or keywords—even if the queries are incomplete or contain typos.

The application is built using the **MERN stack** (MongoDB, Express.js, React, Node.js) and integrates **Elasticsearch** for fast, typo-tolerant search capabilities. It is designed for efficient, scalable, and user-friendly use in both research and real-world environments.

---

## How It Works: System Architecture

The system is structured into four independent layers to enable scalability, maintainability, and modularity:

1. **Frontend (React):**
   - Captures user input for searches.
   - Displays search results with autocomplete and auto-correction.
   - Provides pagination for large datasets.
   - Offers a clean and interactive user interface.

2. **Backend (Node.js & Express):**
   - Acts as a bridge between the frontend and data layers.
   - Handles query validation, normalization, and processing.
   - Interacts with Elasticsearch and MongoDB to provide accurate search results and recommendations.

3. **Elasticsearch (Search Engine):**
   - Handles full-text search with typo-tolerance and fuzzy matching.
   - Suggests corrections for misspelled queries.
   - Ensures fast and scalable search results even for large datasets.

4. **MongoDB (Database):**
   - Stores and organizes assessment data, including:
     - Assessment names, job roles, skills, difficulty levels, and durations.
   - Provides data for periodic indexing into Elasticsearch.

### Data Flow
```
User → Frontend UI (React) → Backend (Node.js) → Elasticsearch + MongoDB
```

This design keeps the frontend focused on the presentation layer while the backend, Elasticsearch, and MongoDB handle the business logic, data storage, and search capabilities.

---

## Features

- **Full-Text Search:** Efficiently searches for assessments based on keywords, job roles, or skills.
- **Typo-Tolerance:** Suggests corrections and reruns searches for misspelled queries.
- **Pagination:** Handles large datasets and displays results over multiple pages.
- **Scalable Design:** Supports horizontal scaling for concurrent users.
- **Easy Data Ingestion:** Bulk inserts datasets into MongoDB and Elasticsearch.

---

## Getting Started

### Prerequisites

To run this project, make sure you have the following installed:

- **Node.js** (v14+ recommended)
- **npm** (or **yarn**)
- **MongoDB** (local or cloud-hosted instance like MongoDB Atlas)
- **Elasticsearch** (latest version)

---

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/naveen-kumar-30/SHL-Search-Engine-Application.git
   cd SHL-Search-Engine-Application
   ```

2. **Set up the Backend:**
   - Navigate to the `server` directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file with the following variables:
     ```
     MONGO_URI=mongodb://localhost:27017/shl-db
     ELASTICSEARCH_URI=http://localhost:9200
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Set up the Frontend:**
   - Navigate to the `client` directory:
     ```bash
     cd ../client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

4. **Seed the Database:**
   - From the `server` directory, run the seed script:
     ```bash
     npm run seed
     ```

---

### Running the Application

- **Frontend URL:** [http://localhost:3000](http://localhost:3000)  
  Use this link to interact with the search interface.
- **Backend Health Check:** [http://localhost:5000/api/test](http://localhost:5000/api/test)  
  Use this route to verify if the backend is running correctly.

---

## Core API Endpoints

- `GET /api/search?q=`  
   Performs a search based on the user’s query and returns relevant assessments.

- `POST /api/recommend`  
   Generates assessment recommendations based on user-provided skills.

- `GET /api/test`  
   Basic health check for backend services.

---

## Future Enhancements

1. Machine Learning-Based Ranking Models:
   - Improve search relevance with personalized ranking.

2. Advanced Filters:
   - Enable filtering assessments by domain, difficulty, and duration.

3. Personalized Recommendations:
   - Provide suggestions based on user profiles and activity.

4. Search Analytics:
   - Gather insights on search trends and optimize user experience.

---

## Author

**Naveen Kumar**  
SHL Research Intern Candidate  
MERN Stack | Search Systems | Scalable Architectures  

If you’d like to contribute or have feedback, feel free to open issues or pull requests. Collaboration is always welcome!

---

**Disclaimer:** This project does not use proprietary SHL data and is built exclusively for experimental and research purposes.