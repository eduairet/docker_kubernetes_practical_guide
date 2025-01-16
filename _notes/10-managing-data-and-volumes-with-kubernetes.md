# Managing Data & Volumes with Kubernetes

## Understanding State

- State is data created and used by an application and must be stored somewhere
  - Data like user information, configuration, logs, etc. is often stored in a database
  - The app can store data in a file system or in memory but it will be lost if the app crashes
  - In either case we can use a volume to store the data

## Kubernetes Volumes

- Kubernetes has different volume types/drives
  - Local volumes like Nodes, Pods, and Containers
  - Cloud Provider specific volumes like AWS EBS, Azure Disk, Google Persistent Disk
- The volume lifetime is the same as the pod's lifetime
  - Volumes survive container restarts and removals
  - Volumes are deleted when the pod is deleted
