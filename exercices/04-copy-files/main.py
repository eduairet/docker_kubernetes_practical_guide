import os


def main():
    current_dir = os.getcwd()
    print("Current directory:", current_dir)
    print("Files in the current directory:")
    for file in os.listdir(current_dir):
        print(file)


if __name__ == "__main__":
    main()
