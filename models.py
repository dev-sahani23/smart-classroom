from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    contact = db.Column(db.String(20), nullable=True)
    password = db.Column(db.String(120), nullable=False)  # store hashed password in production

    def __repr__(self):
        return f"<User {self.firstname} {self.lastname}>"

class Constraints(db.Model):
    __tablename__ = 'constraints'

    id = db.Column(db.Integer, primary_key=True)
    classrooms = db.Column(db.Integer, nullable=False)
    batches = db.Column(db.Integer, nullable=False)
    subjects_count = db.Column(db.Integer, nullable=False)
    subject_names = db.Column(db.Text, nullable=False)  # store JSON as string
    max_classes_per_day = db.Column(db.Integer, nullable=False)
    classes_per_subject_per_week = db.Column(db.Integer, nullable=False)
    faculties_count = db.Column(db.Integer, nullable=False)
    average_leaves = db.Column(db.Float, nullable=False)
    special_classes = db.Column(db.Text, nullable=True)  # store JSON as string

    def to_dict(self):
        import json
        return {
            "id": self.id,
            "classrooms": self.classrooms,
            "batches": self.batches,
            "subjects_count": self.subjects_count,
            "subject_names": json.loads(self.subject_names),
            "max_classes_per_day": self.max_classes_per_day,
            "classes_per_subject_per_week": self.classes_per_subject_per_week,
            "faculties_count": self.faculties_count,
            "average_leaves": self.average_leaves,
            "special_classes": json.loads(self.special_classes) if self.special_classes else [],
        }
