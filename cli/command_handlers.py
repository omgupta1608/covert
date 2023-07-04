from rich import print as rprint
import os
import sys

sys.path.append(os.path.realpath("."))
import inquirer 

def new_handler():
    questions = [
    inquirer.Text("secret", message="Enter Secret"),
    inquirer.Text("pass_phrase", message="Enter a word or pass phrase that's difficult to guess"),
    ]

    answers = inquirer.prompt(questions)

    print(answers)    

def get_handler():
    print()