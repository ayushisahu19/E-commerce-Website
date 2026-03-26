# 3-Tier Application Deployment using Kubernetes and GitOps

## Overview

This project demonstrates the deployment of a **3-tier application architecture** using modern **DevOps practices**. The application is containerized using Docker and deployed on a Kubernetes cluster. The repository also follows GitOps principles to manage and maintain deployment configurations.

The objective of this project is to simulate a real-world DevOps workflow where application infrastructure and deployments are managed through version-controlled configuration.

---

## Project Structure
<pre>3-Tier-K8s-Project-GitOps/
│
├── frontend/ # React frontend (UI layer)
│ ├── public/ # Static files
│ ├── src/ # React components
│ ├── Dockerfile # Multi-stage build (Node → Nginx)
│ ├── nginx.conf # Nginx configuration
│ └── package.json
│
├── backend/ # Node.js backend API
│ ├── server.js
│ ├── Dockerfile
│ ├── package.json
│ └── index.html
│
├── k8s/ # Kubernetes manifests
│ ├── namespace.yml
│ ├── secrets.yaml
│ ├── mongo.yaml
│ ├── mongo-init.yaml
│ ├── backend.yaml
│ └── frontend.yaml
│
├── docker-compose.yml # Local multi-service setup
├── docs/ # Documentation
├── public/ # Environment/config files
├── .env.example
├── .gitignore
└── README.md

</pre>

---

## Technologies Used

- Docker – Containerization of application services
- Kubernetes – Container orchestration and deployment
- GitOps – Version-controlled infrastructure and deployment
- GitHub – Source code management

---

## Key Features

- Containerized frontend and backend services
- Kubernetes-based application deployment
- Infrastructure managed through version control
- GitOps-based workflow for automated deployments

---

## Deployment Workflow

1. Application code is stored in the repository.
2. Docker images are built for the frontend and backend services.
3. Kubernetes manifests define how the services are deployed.
4. GitOps ensures the cluster state matches the configuration stored in the repository.

---

## Learning Objectives

This project demonstrates:

- Containerizing applications using Docker
- Deploying applications on Kubernetes
- Managing infrastructure using GitOps practices
- Structuring DevOps projects in a collaborative environment

---
