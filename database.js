import sqlite3

# Connect to the database (create a new database if it doesn't exist)
conn = sqlite3.connect('help_database.db')

# Create a cursor object to interact with the database
cursor = conn.cursor()

# Create a table to store the information of people who need help
cursor.execute('''
    CREATE TABLE IF NOT EXISTS people (
        id INTEGER PRIMARY KEY,
        name TEXT,
        contact TEXT,
        address TEXT,
        date_of_birth TEXT,
        assistance_needed TEXT,
        description TEXT,
        status TEXT
    )
''')

def add_person(name, contact, address, date_of_birth, assistance_needed, description, status):
    # Insert a new person record into the database
    cursor.execute('''
        INSERT INTO people (name, contact, address, date_of_birth, assistance_needed, description, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (name, contact, address, date_of_birth, assistance_needed, description, status))
    
    # Commit the changes to the database
    conn.commit()
    print("Person added successfully.")

def retrieve_people():
    # Retrieve all people from the database
    cursor.execute('SELECT * FROM people')
    people = cursor.fetchall()
    
    # Display the retrieved people
    for person in people:
        print(person)

# Example usage
add_person('John Doe', 'john@example.com', '123 Main Street', '1990-01-01', 'Financial support', 'Needs assistance with medical bills', 'Pending')
add_person('Jane Smith', 'jane@example.com', '456 Elm Street', '1985-05-10', 'Food supplies', 'Requires groceries for a month', 'In progress')

retrieve_people()

# Close the database connection
conn.close()
