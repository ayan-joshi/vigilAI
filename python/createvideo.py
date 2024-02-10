import os
import imageio
from PIL import Image

# Directory containing the frames
frames_dir = "output"

# Get the list of frame filenames sorted numerically
frame_filenames = sorted(os.listdir(frames_dir),
                         key=lambda x: int(x.split('_')[1].split('.')[0]))

# Create a list to hold the frames
frames = []

# Define the target dimensions for resizing
target_width = 640  # Adjust as needed
target_height = 480  # Adjust as needed

# Read each frame, resize it, and append it to the frames list
for frame_filename in frame_filenames:
    frame_path = os.path.join(frames_dir, frame_filename)
    frame = imageio.imread(frame_path)
    resized_frame = Image.fromarray(frame).resize(
        (target_width, target_height))
    frames.append(resized_frame)

# Define the output video path
output_folder = "../Videos/"
output_filename = "output.mp4"
output_video_path = os.path.join(output_folder, output_filename)

# Write the frames to a video file
imageio.mimsave(output_video_path, frames, fps=30)

print("Video saved:", output_video_path)
