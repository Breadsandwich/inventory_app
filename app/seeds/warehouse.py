from app.models import db, Warehouse

def seed_warehouse():
    warehouse_1 = Warehouse(location = 'Phoenix')
    warehouse_2 = Warehouse(location = 'Vancouver')


    db.session.add(warehouse_1)
    db.session.add(warehouse_2)

    db.session.commit()


def undo_warehouse():
    db.session.execute('TRUNCATE spots RESTART IDENTITY CASCADE;')
    db.session.commit()
