
# E-Commerce Platform Project

## Overview
This project is a scalable, modular e-commerce platform designed using a microservices architecture. It includes services for user management, product catalog, orders, payments, and more, along with a responsive front-end.

---

## Architecture
![image](https://github.com/user-attachments/assets/26d89330-bba2-474b-820b-c9c498cb2bc3)


---

## Project Structure
```
ecommerce-platform/
├── backend/
│   ├── user-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   │   └── user.controller.js
│   │   │   ├── models/
│   │   │   │   └── user.model.js
│   │   │   ├── routes/
│   │   │   │   └── user.routes.js
│   │   │   ├── services/
│   │   │   │   └── user.service.js
│   │   │   └── app.js
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── .env
│   ├── product-service/  (similar structure as user-service)
│   ├── order-service/    (similar structure as user-service)
│   ├── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env
│
├── k8s/                   (Kubernetes manifests)
│   ├── user-service.yaml
│   ├── product-service.yaml
│   ├── frontend.yaml
│   └── ...
│
├── .github/
│   ├── workflows/
│   │   └── ci-cd.yml      (CI/CD pipeline)
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## Day 1: Project Setup

### Step 1: Initialize Git Repository
1. Create a new repository in GitHub or locally.
2. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```
3. Set up branch protection rules for `main` and create a `dev` branch:
   ```bash
   git checkout -b dev
   ```

---

### Step 2: Backend Setup
1. **Create the `backend` folder** with subfolders for each service.
2. Set up the `user-service`:
   - Initialize a Node.js project:
     ```bash
     cd backend/user-service
     npm init -y
     npm install express body-parser mongoose dotenv
     npm install --save-dev nodemon
     ```
   - File structure:
     ```
     user-service/
     ├── src/
     │   ├── controllers/
     │   │   └── user.controller.js
     │   ├── models/
     │   │   └── user.model.js
     │   ├── routes/
     │   │   └── user.routes.js
     │   ├── services/
     │   │   └── user.service.js
     │   └── app.js
     ├── Dockerfile
     ├── package.json
     └── .env
     ```

   - Example files:
     **`src/app.js`**:
     ```javascript
     const express = require('express');
     const bodyParser = require('body-parser');
     const dotenv = require('dotenv');
     const userRoutes = require('./routes/user.routes');

     dotenv.config();
     const app = express();

     app.use(bodyParser.json());
     app.use('/api/users', userRoutes);

     const PORT = process.env.PORT || 3000;
     app.listen(PORT, () => {
         console.log(`User service running on port ${PORT}`);
     });
     ```

---

### Step 3: Frontend Setup
1. **Create the `frontend` folder** and initialize a React.js project:
   ```bash
   npx create-react-app frontend
   cd frontend
   npm install axios
   ```

2. File structure:
   ```
   frontend/
   ├── public/
   ├── src/
   │   ├── components/
   │   │   └── Navbar.js
   │   ├── pages/
   │   │   └── HomePage.js
   │   ├── services/
   │   │   └── api.js
   │   ├── App.js
   │   └── index.js
   ├── Dockerfile
   ├── package.json
   └── .env
   ```

   Example `Dockerfile`:
   ```Dockerfile
   FROM node:16
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

---

### Step 4: Kubernetes and Docker Compose
1. **`docker-compose.yml`**:
   ```yaml
   version: '3.8'
   services:
     user-service:
       build: ./backend/user-service
       ports:
         - "3001:3000"
     frontend:
       build: ./frontend
       ports:
         - "3000:3000"
   ```

2. Kubernetes manifest for `user-service`:
   **`k8s/user-service.yaml`**:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: user-service
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: user-service
     template:
       metadata:
         labels:
           app: user-service
       spec:
         containers:
         - name: user-service
           image: user-service:latest
           ports:
           - containerPort: 3000
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: user-service
   spec:
     selector:
       app: user-service
     ports:
       - protocol: TCP
         port: 3000
         targetPort: 3000
     type: ClusterIP
   ```

---

### Step 5: CI/CD Workflow
1. GitHub Action Workflow (`.github/workflows/ci-cd.yml`):
   ```yaml
   name: CI/CD

   on:
     push:
       branches:
         - dev

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest

       steps:
       - name: Checkout Code
         uses: actions/checkout@v3

       - name: Set up Node.js
         uses: actions/setup-node@v3
         with:
           node-version: 16

       - name: Install Dependencies
         run: npm install --prefix ./backend/user-service

       - name: Run Tests
         run: npm test --prefix ./backend/user-service

       - name: Build Docker Images
         run: docker build -t user-service ./backend/user-service
   ```

---

## Conclusion
By the end of Day 1, you will have:
- A basic backend and frontend scaffolded.
- Docker and Kubernetes configured.
- CI/CD pipeline integrated.

Proceed to Day 2 for further development of services and features.
