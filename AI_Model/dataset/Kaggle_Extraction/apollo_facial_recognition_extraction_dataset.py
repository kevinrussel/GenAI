import kagglehub

# Download latest version
path = kagglehub.dataset_download("apollo2506/facial-recognition-dataset")

print("Path to dataset files:", path)