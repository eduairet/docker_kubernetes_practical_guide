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

### `emptyDir` Volume

- Kubernetes creates a directory on the node and mounts it to the pod at the specified path
- This volume is where the pod can read and write data that will survive when the pod is restarted

  ```yaml
  # . . .
  spec:
    containers:
      - name: my-container
        image: my-image
        volumeMounts:
          - name: my-volume
            mountPath: /data # Mount the volume to the container at /data
    volumes:
      - name: my-volume
        emptyDir: {}
  ```

- This is a very simple volume type and is useful for storing temporary data
- It won't be pretty useful when using more than one replica of the pod because the data is not shared between the pods

## Volumes Types

- These volumes attached to the pod or node lifecycle and are deleted when the pod or node are deleted

### `hostPath` Volume

- This volume mounts a file or directory from the host node's filesystem into your pod
- Multiple pods can mount the same `hostPath` volume as long as they are on the same node

  ```yaml
  # . . .
  spec:
    containers:
      - name: my-container
        image: my-image
        volumeMounts:
          - name: my-volume
            mountPath: /data # Mount the volume to the container at /data
    volumes:
      - name: my-volume
        hostPath: # Mount the volume from the host node
          path: /data # Path on the host node
          type: DirectoryOrCreate # Create the directory if it doesn't exist
  ```

### `CSI` Volume

- Container Storage Interface (CSI) is a standard for exposing arbitrary block and file storage systems to containerized workloads on Kubernetes
- CSI makes easier to work with different cloud provider services like add EFS (Elastic File System), EBS (Elastic Block Store), etc. as a storage option for your pods

  ```yaml
  # . . .
  spec:
    containers:
      - name: my-container
        image: my-image
        volumeMounts:
          - name: my-volume
            mountPath: /data # Mount the volume to the container at /data
    volumes:
      - name: my-volume
        csi:
          driver: efs.csi.aws.com
          volumeHandle: fs-00000000 # EFS file system ID
  ```

## Persistent Volumes Types

- These are volumes that are not tied to the pod or node, these are useful for data that needs to survive by any means

### `PersistentVolume` & `PersistentVolumeClaim`

- `PersistentVolume` is a storage resource in the cluster that has been provisioned by an administrator

  ```yaml
  apiVersion: v1
  kind: PersistentVolume
  metadata:
    name: my-pv # Any name you want
  spec:
    capacity:
      storage: 1Gi # Storage size, check the documentation for the available sizes
    volumeMode: Filesystem # Filesystem (it uses a filesystem) or Block (it uses a block device), the difference is how the data is stored
    storageClassName: standard # The storage class to use, standard is the default one
    accessModes:
      - ReadWriteOnce # The volume can be mounted as read-write by a single node
      # - ReadOnlyMany # The volume can be mounted as read-only by many nodes
      # - ReadWriteMany # The volume can be mounted as read-write by many nodes
    hostPath:
      path: /data # Path on the host node
      type: DirectoryOrCreate # Create the directory if it doesn't exist
  ```

- `PersistentVolumeClaim` is a request for storage by a user

  ```yaml
  apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: my-pvc # Any name you want
  spec:
    volumeName: host-pv # The name of the PersistentVolume you want to use (this is the static approach the dynamic approach is using the storage class)
    accessModes:
      - ReadWriteOnce # The volume can be mounted as read-write by a single node
      # - ReadOnlyMany # The volume can be mounted as read-only by many nodes
      # - ReadWriteMany # The volume can be mounted as read-write by many nodes
    resources:
      requests:
        storage: 1Gi # Storage size from the PersistentVolume or less
  ```

- Keep in mind that persistent volumes use storage classes to dynamically provision storage, for this example we are using the default storage class
  ```bash
  kubectl get storageclass
  ```

## Environment Variables

- Environment variables are a way to pass configuration to your application
- You can use environment variables to pass configuration to your application

  ```yaml
  # . . .
  spec:
    containers:
      - name: my-container
        image: my-image
        env:
          - name: MY_ENV_VAR
            value: my-value
  ```
