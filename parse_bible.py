import json
import re


def parse_bible_file(filename):
    data = {}
    regex_pattern = re.compile(r"^\s*(\w+)\s*(\d+):(\d+)\s+(.+)$")

    try:
        with open(filename, "r", encoding="utf-8") as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()

                # If line is empty or comment, skip
                if not line or line.startswith("#"):
                    continue

                # Try to match the pattern: GEN 1:1 Text
                match = regex_pattern.match(line)

                if match:
                    book = match.group(1)
                    chapter = int(match.group(2))
                    verse = int(match.group(3))
                    text = match.group(
                        4
                    ).strip()  # Remove trailing whitespace/punctuation issues if needed

                    # Construct a structure like:
                    # {'GEN': {1: {1: 'text', 2: 'text'}}, 'MAT': {1: {1: 'text'}}}

                    if book not in data:
                        data[book] = {}

                    if chapter not in data[book]:
                        data[book][chapter] = {}

                    data[book][chapter][verse] = text

    except FileNotFoundError:
        print(f"Error: The file '{filename}' was not found.")
    except UnicodeDecodeError:
        print(
            "Error: The file encoding seems to be different from utf-8. Please check your file."
        )
    return data


def save_to_json(data, output_file="bible.json"):
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f"Successfully saved structure to {output_file}")


parsed_file = parse_bible_file("Bible.txt")
save_to_json(parsed_file)
