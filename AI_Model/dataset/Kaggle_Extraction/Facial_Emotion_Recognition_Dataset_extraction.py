import kagglehub

# Download latest version
path = kagglehub.dataset_download("tapakah68/facial-emotion-recognition")

print("Path to dataset files:", path)