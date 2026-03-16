# 3-Tier Application Deployment using Kubernetes and GitOps

## Overview

This project demonstrates the deployment of a **3-tier application architecture** using modern **DevOps practices**. The application is containerized using Docker and deployed on a Kubernetes cluster. The repository also follows GitOps principles to manage and maintain deployment configurations.

The objective of this project is to simulate a real-world DevOps workflow where application infrastructure and deployments are managed through version-controlled configuration.

---

## Architecture

The application follows a **three-tier architecture**:

Client (Browser)
        │
        ▼
Frontend (User Interface)
        │
        ▼
Backend (Application / API Layer)
        │
        ▼
Database (Persistent Storage)

Each layer is deployed as a separate containerized service and managed using Kubernetes.

---

## Project Structure
.
├── app
│ ├── frontend
│ └── backend
│
├── docker
│ ├── Dockerfile.frontend
│ └── Dockerfile.backend
│
├── k8s
│ ├── deployment.yaml
│ ├── service.yaml
│ └── ingress.yaml
│
├── helm
│
├── docs
│
└── README.md


---

## Technologies Used

- Docker – Containerization of application services
- Kubernetes – Container orchestration and deployment
- Helm – Kubernetes package management
- GitOps – Version-controlled infrastructure and deployment
- GitHub – Source code management

---

## Key Features

- Containerized frontend and backend services
- Kubernetes-based application deployment
- Infrastructure managed through version control
- Scalable microservice-style architecture
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
