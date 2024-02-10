import cv2
import torch
import os

# Load YOLOv5 model
model = torch.hub.load("ultralytics/yolov5", "yolov5x")

# Load video
video_folder = "../Videos/"
video_filename = "raw.mp4"
video_path = os.path.join(video_folder, video_filename)
cap = cv2.VideoCapture(video_path)

# Check if video opened successfully
if not cap.isOpened():
    print("Error: Unable to open video.")
    exit()

# Create the output directory if it doesn't exist
output_dir = "output"
os.makedirs(output_dir, exist_ok=True)

# Initialize frame count
frame_count = 0

# Process video frame by frame
while True:
    # Read a frame from the video
    ret, frame = cap.read()

    # If frame reading was unsuccessful, break the loop
    if not ret:
        break

    # Make a copy of the original frame to draw bounding boxes on it
    original_frame = frame.copy()

    # Perform inference on the frame
    results = model(original_frame)

    # Check if laptop and person are detected in the frame
    laptop_detected = False
    person_detected = False
    laptop_bbox = None
    person_bbox = None

    for detection in results.xyxy[0]:
        # Extract the class index from the detection results
        class_index = int(detection[5])
        # Get the class name from the class index
        class_name = results.names[class_index]

        # Check if the detected object is a person
        if class_name == 'person':
            person_bbox = detection[:4]
            person_detected = True

        # Check if the detected object is a laptop
        elif class_name == 'laptop':
            laptop_bbox = detection[:4]
            laptop_detected = True

    # If both laptop and person are detected and their bounding boxes have valid coordinates, proceed with drawing
    if laptop_detected and person_detected and all(coord is not None for coord in laptop_bbox) and all(coord is not None for coord in person_bbox):
        # Check for intersection
        if (laptop_bbox[0] < person_bbox[2] and laptop_bbox[2] > person_bbox[0] and
                laptop_bbox[1] < person_bbox[3] and laptop_bbox[3] > person_bbox[1]):
            # Calculate the intersection area
            intersection_area = (min(laptop_bbox[2], person_bbox[2]) - max(laptop_bbox[0], person_bbox[0])) * \
                (min(laptop_bbox[3], person_bbox[3]) -
                 max(laptop_bbox[1], person_bbox[1]))

            cv2.rectangle(original_frame, (int(laptop_bbox[0]), int(laptop_bbox[1])), (int(
                laptop_bbox[2]), int(laptop_bbox[3])), (0, 255, 0), 2)
            cv2.rectangle(original_frame, (int(person_bbox[0]), int(person_bbox[1])), (int(
                person_bbox[2]), int(person_bbox[3])), (0, 0, 255), 2)

            # Check if the intersection area is more than 50 units
            if intersection_area > 100:
                # Draw bounding boxes on the original frame
                cv2.rectangle(original_frame, (int(laptop_bbox[0]), int(laptop_bbox[1])), (int(
                    laptop_bbox[2]), int(laptop_bbox[3])), (0, 255, 0), 2)
                cv2.rectangle(original_frame, (int(person_bbox[0]), int(person_bbox[1])), (int(
                    person_bbox[2]), int(person_bbox[3])), (0, 0, 255), 2)

                # Save the frame to the output directory
                output_path = os.path.join(
                    output_dir, f"frame_{frame_count}.jpg")
                cv2.imwrite(output_path, original_frame)
                print(f"Saved frame {frame_count} to {output_path}")
                # Increment frame count
                frame_count += 1

                # Check if the areas are intersecting
                print("Laptop and person areas are intersecting.")

    # Resize the original frame to fit within the specified window size for display
    window_width = 800
    window_height = int(
        original_frame.shape[0] * (window_width / original_frame.shape[1]))
    resized_frame = cv2.resize(original_frame, (window_width, window_height))

    # Display the resized frame with bounding boxes
    cv2.imshow('Frame', resized_frame)

    # Wait for the 'q' key to be pressed to exit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture object and close all windows
cap.release()
cv2.destroyAllWindows()

print("Frames with intersected laptop and person saved:", frame_count)
