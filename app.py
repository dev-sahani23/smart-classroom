from flask import Flask, jsonify, request
from config import Config
from models import db, User
from sqlalchemy import inspect
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
app.config.from_object(Config)

db.init_app(app)

constraints_data = {}

@app.route("/save-constraints", methods=["POST"])
def save_constraints():
    data = request.get_json()
    constraints_data.update(data)
    print("Received Constraints:", constraints_data)
    return jsonify({"message": "Constraints saved successfully!"})


@app.route("/add_user", methods=["POST"])
def add_user():
    data = request.get_json() or request.form
    print("Received data:", data)
    firstname = data.get("firstname")
    lastname = data.get("lastname")
    email = data.get("email")
    contact = data.get("contact")
    password = data.get("password")

    if not firstname or not lastname or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = generate_password_hash(password)
    user = User(firstname=firstname, lastname=lastname, email=email, contact=contact, password=hashed_password)
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "id": user.id,
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "contact": user.contact
    }), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user.id,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "email": user.email,
            "contact": user.contact
        }
    }), 200


@app.route("/")
def index():
    return "Flask + SQLite + SQLAlchemy setup complete!"


@app.route("/users")
def get_users():
    users = User.query.all()
    return jsonify([
        {"id": u.id, "firstname": u.firstname, "lastname": u.lastname, "email": u.email, "contact": u.contact} 
        for u in users
    ])


@app.route("/users_table")
def users_table():
    users = User.query.all()
    html = "<h1>Users Table</h1><table border='1'><tr><th>ID</th><th>Firstname</th><th>Lastname</th><th>Email</th><th>Contact</th></tr>"
    for u in users:
        html += f"<tr><td>{u.id}</td><td>{u.firstname}</td><td>{u.lastname}</td><td>{u.email}</td><td>{u.contact}</td></tr>"
    html += "</table>"
    return html

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        inspector = inspect(db.engine)
        print("Tables created:", inspector.get_table_names())

        if not User.query.first():
            admin = User(firstname="Admin", lastname="User", email="admin@example.com", contact="1234567890", password=generate_password_hash("password"))
            db.session.add(admin)
            db.session.commit()
            print("Default admin user created")

    app.run(debug=True , port=5000)
