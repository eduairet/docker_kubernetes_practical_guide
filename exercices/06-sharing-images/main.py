"""Main module."""

from random import choice


def main():
    """Main function."""
    aphex_twin_song = choice(["Windowlicker", "Fingerbib", "4", "Vordhosbn"])
    print(f"Playing {aphex_twin_song} by Aphex Twin")


if __name__ == "__main__":
    main()
