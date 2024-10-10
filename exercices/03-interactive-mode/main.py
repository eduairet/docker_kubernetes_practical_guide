from random import randint


def main():
    print("Which number between 1 and 10 am I thinking of?")
    number = randint(1, 10)
    while True:
        guess = int(input())
        if guess == number:
            print("You guessed it!")
            break
        else:
            print("Try again!")


if __name__ == "__main__":
    main()
