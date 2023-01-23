# import sys

# # Open the input and output files
# with open("Raw.txt", "r") as raw_file, open("Filtered.txt", "w") as filtered_file:
#     # Create an empty set to store unique lines
#     unique_lines = set()
#     # Iterate over the lines in the input file
#     for line in raw_file:
#         # Convert the line to lowercase
#         line = line.lower()
#         # If the line is not already in the set of unique lines
#         if line not in unique_lines:
#             # Add it to the set
#             unique_lines.add(line)
#             # Write it to the output file
#             filtered_file.write(line)


# import difflib

# # Open the input file
# with open("Filtered.txt", "r") as filtered_file:
#     # Read all the lines from the file
#     lines = filtered_file.readlines()

# # Create an empty list to store the unique lines
# unique_lines = []

# # Iterate over the lines in the input file
# for line in lines:
#     # Initialize a variable to track if the line is unique
#     is_unique = True
#     for existing_line in unique_lines:
#         # Compare the similarity between the line and existing line
#         similarity = difflib.SequenceMatcher(None, line, existing_line).ratio()
#         if similarity > 0.7:
#             is_unique = False
#             break
#     if is_unique:
#         unique_lines.append(line)

# # Open the output file
# with open("FinalOutput.txt", "w") as output_file:
#     # Write the unique lines to the output file
#     for line in unique_lines:
#         output_file.write(line)

# with open("Modified.txt", "r") as filtered_file, open("Modified.txt", "w") as modified_file:
#     for line in filtered_file:
#         # Remove the first and last character from the line
#         modified_line = line[1:-2] + line[-1]
#         # Write the modified line to the output file
#         modified_file.write(modified_line)

# import random

# with open("Modified.txt", "r") as modified_file:
#     # Read all the lines from the file
#     lines = modified_file.readlines()

# # Randomize the order of the lines using the shuffle() function from the random library
# random.shuffle(lines)

# # Open the output file
# with open("Modified.txt", "w") as output_file:
#     # Write the randomized lines to the output file
#     for line in lines:
#         output_file.write(line)



# import random

# # Open the input file
# with open("Modified.txt", "r") as filtered_file:
#     # Read all the lines from the file
#     lines = filtered_file.readlines()

# # Use the choice() function from the random library to randomly select a line
# random_line = random.choice(lines)

# print(random_line)

