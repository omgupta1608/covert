from rich import print as rprint
import os
import sys
import requests
from dotenv import load_dotenv
import os
import json

load_dotenv()

sys.path.append(os.path.realpath("."))
import inquirer 

def new_handler():
    questions = [
    inquirer.Text("encrypted_secret", message="Enter Secret"),
    inquirer.Text("pass_phrase", message="Enter a word or pass phrase that's difficult to guess"),
    ]

    answers = inquirer.prompt(questions)

    # send secret as encrypted_secret
    try:
        json_object = json.dumps(answers) 
        r = requests.post(os.environ["COVERT_SERVER_URL"] + "/submit-secret", data=json_object)

        # TODO: Client side secret encyption (pass phrase encryption)
        resp = r.json()

        if (resp['success']):
            rprint("[green]Secret Saved!![/green]")

            rprint("Use the [yellow]get[/yellow] command with the id [blue]" + resp['data']['secret_id'] +"[/blue] to get the secret")
            # rprint("\nOr click/share this link to view the secret: [blue]" + os.environ["COVERT_WEB_URL"]+"/get/" + resp['data']['secret_id'] + "[/blue]")
            rprint("[red]Note: The secret can only be viewed once.[/red]")
        else:
            rprint("[red]" + resp['message'] +"[/red]")
    except:
        rprint("[red]Something isn't right. Please try again.[/red]")
    return

def get_handler(key:str):
    questions = [
    inquirer.Text("pass_phrase", message="Enter Passphrase/Password"),
    ]

    answers = inquirer.prompt(questions)
    answers['key'] = key
    try:
        json_object = json.dumps(answers) 
        r = requests.post(os.environ["COVERT_SERVER_URL"] + "/secret", data=json_object)

        resp = r.json()

        if (resp['success']):

            # TODO: Client side secret decryption of the secret (pass phrase decryption)
            rprint("[green]Secret Fetched![/green]\n")

            rprint(r.json()['data']['encrypted_secret'])
        else:
            rprint("[red]" + resp['message'] +"[/red]")
    except:
        rprint("[red]Something isn't right. Please try again.[/red]")
    return