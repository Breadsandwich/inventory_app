from app.models import db, Inventory

def seed_inventory():
    item_1 = Inventory(
        item_name = 'basketball',
        description =  'just a basketball.',
        price = 5,
        quantity = 5,
        warehouse_id = 1
    )
    item_2 = Inventory(
        item_name = 'hula hoop',
        description =  'its a hula hoop!',
        price = 9,
        quantity = 12,
        warehouse_id = 1
    )
    item_3 = Inventory(
        item_name = 'banana',
        description =  'yes, a banana.',
        price = 2,
        quantity = 10,
        warehouse_id = 2

    )

    db.session.add(item_1)
    db.session.add(item_2)
    db.session.add(item_3)
    db.session.commit()


def undo_inventory():
    db.session.execute('TRUNCATE spots RESTART IDENTITY CASCADE;')
    db.session.commit()
