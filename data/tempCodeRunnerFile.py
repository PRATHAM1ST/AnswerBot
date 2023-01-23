import random

# Open the input file
with open("Modified.txt", "r") as filtered_file:
    # Read all the lines from the file
    lines = filtered_file.readlines()

# Use the choice() function from the random library to randomly select a line
random_line = random.choice(lines)

print(random_line)