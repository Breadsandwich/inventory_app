from flask.cli import AppGroup
from .inventory import seed_inventory, undo_inventory
from .warehouse import seed_warehouse, undo_warehouse


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_warehouse()
    seed_inventory()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_warehouse()
    undo_inventory()
    # Add other undo functions here
