import typer
from command_handlers import get_handler, new_handler

app = typer.Typer()

@app.command()
def new():
    new_handler()

@app.command()
def get(key: str):
    get_handler(key)

if __name__ == "__main__":
    app()