import random
import matplotlib.pyplot as plt
from skimage.io import imread;
from skimage import exposure;
from skimage.transform import resize;
from skimage.color import rgb2gray;
from skimage.filters import gaussian, sobel;
import constants
import numpy as np
from sklearn.preprocessing import LabelEncoder

def encode_labels(labels: list | np.ndarray) -> tuple[np.ndarray, LabelEncoder]:
    encoder = LabelEncoder()
    return encoder.fit_transform(labels), encoder

def decode_labels(encoded_labels: np.ndarray, encoder: LabelEncoder) -> list:
    return encoder.inverse_transform(encoded_labels)

def visualize_image(images):
    # Randomly select an index
    random_index = random.randint(0, images.shape[0] - 1)

    # Get the random image
    random_image = images[random_index]

    # Display the random image
    plt.imshow(random_image)
    plt.title(f'Random Image Index: {random_index}')
    plt.axis('off')
    plt.show()

def setResolution(img_array: np.ndarray):
    return resize(img_array, (constants.img_height, constants.img_width));

# Codes inspired by my previous assignment work: https://github.com/kmock930/Texture-Image-Comparison/blob/main/setup.py#L148
def preprocess(img_array: np.ndarray, isCurrentGrayScale: bool = False) -> np.ndarray:
    # Resizing to make the image smaller in resolution
    img_array = setResolution(img_array);

    # Grayscale
    if not isCurrentGrayScale:
        img_array = rgb2gray(img_array);

    # Normalize to [0,1] range
    img_array = normalize(img_array);

    # point processing - Gamma Correction
    # to adjust the brightness
    img_array = exposure.adjust_gamma(img_array, gamma=constants.gamma);

    # histogram equalization - Adaptive equalization
    img_array = exposure.equalize_hist(img_array);

    # sobel edge filter: https://scikit-image.org/docs/stable/auto_examples/edges/plot_edge_filter.html
    # for edge detection
    img_array = sobel(img_array);

    # Gaussian blur: https://scikit-image.org/docs/dev/api/skimage.filters.html#skimage.filters.gaussian
    # for smooting
    img_array = gaussian(img_array, sigma=constants.gaussianSigma); # sigma = standard deviation for the kernel

    return img_array;

def normalize(img_array: np.ndarray):
    return img_array / 255.0;  # Normalize to [0, 1] range