import typer
from command_handlers import get_handler, new_handler

app = typer.Typer()

@app.command()
def new():
    new_handler()

@app.command()
def get():
    get_handler()

if __name__ == "__main__":
    app()