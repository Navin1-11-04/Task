import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore, auth, storage
import re
import base64
from io import BytesIO
from PIL import Image
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Initialize Firebase Admin SDK with environment variables
firebase_cred = credentials.Certificate({
    "type": "service_account",
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace("\\n", "\n"),
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": os.getenv("FIREBASE_CLIENT_ID"),
    "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
    "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_CERT_URL"),
    "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_CERT_URL")
})
firebase_admin.initialize_app(firebase_cred, {
    'storageBucket': os.getenv("FIREBASE_STORAGE_BUCKET")
})

# Initialize Firestore
db = firestore.client()
bucket = storage.bucket()

def is_valid_email(email):
    return re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email) is not None


@app.route('/create_worker', methods=['POST'])
def create_worker():
    print("Create worker endpoint was hit")  # Debugging line
    data = request.json
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')  # Ensure this is fetched from data
    name = data.get('name')
    role = data.get('role', 'worker')  # Default to 'worker' if not provided

    if not email or not password or not name:
        return jsonify({"error": "Missing required fields"}), 400
    
    if not is_valid_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400

    # Check for duplicate email
    existing_worker = db.collection('workers').where('email', '==', email).get()
    if existing_worker:
        return jsonify({"error": "Email already in use."}), 400

    try:
        user = auth.create_user(email=email, password=password, display_name=name)

        worker_data = {
            "worker_id": user.uid,
            "name": name,
            "email": email,
            "role": role,
            "created_at": firestore.SERVER_TIMESTAMP,
            "owner_email": data.get('owner_email')
  # Ensure owner_id is included
        }
        db.collection('workers').document(user.uid).set(worker_data)

        return jsonify({"message": "Worker created successfully", "worker_id": user.uid}), 200

    except Exception as e:
        print(f"Error creating worker: {str(e)}")  # Log the error
        return jsonify({"error": str(e)}), 500  # Return detailed error



def upload_image_to_firebase(image_data, image_name):
    """
    Upload a base64 image string to Firebase Storage.
    Returns the public URL of the uploaded image.
    """
    try:
        print("Uploading image:", image_name)  # Debugging line
        # Open the image using PIL
        image = Image.open(BytesIO(base64.b64decode(image_data.split(',')[1])))
        
        # Convert to RGB if the image is in RGBA mode
        if image.mode == 'RGBA':
            image = image.convert('RGB')

        blob = bucket.blob(f'products/{image_name}')
        buffer = BytesIO()
        image.save(buffer, format="JPEG")
        buffer.seek(0)  # Reset buffer position to the beginning
        blob.upload_from_string(buffer.getvalue(), content_type="image/jpeg")

        # Make the blob publicly accessible
        blob.make_public()
        print("Image uploaded successfully:", blob.public_url)  # Debugging line

        return blob.public_url
    except Exception as e:
        print("Error uploading image:", str(e))  # Debugging line
        raise Exception(f"Image upload failed: {str(e)}")

@app.route('/create_product', methods=['POST'])
def create_product():
    data = request.json
    print("Received data:", data)  # Log incoming data

    creator_email = data.get('creator_email')
    name = data.get('name')
    price = data.get('price')
    description = data.get('description')
    colors = data.get('colors', [])  # Default to empty list if not provided
    images = data.get('images')

    # Validate required fields
    if not name or not price or not description or not creator_email:
        return jsonify({"error": "Missing required fields"}), 400

    # Validate images
    if not isinstance(images, list) or not all(isinstance(img, str) for img in images):
        return jsonify({"error": "Invalid images format. Ensure it's a list of base64 strings."}), 400

    image_urls = []
    try:
        for i, image in enumerate(images):
            print(f"Uploading image {i + 1}/{len(images)}")  # Debugging line
            image_url = upload_image_to_firebase(image, f"{name}_{i}.jpg")
            image_urls.append(image_url)

        product_data = {
            "name": name,
            "price": price,
            "description": description,
            "colors": colors,
            "image_urls": image_urls,
            "creator_email": creator_email,
            "created_at": firestore.SERVER_TIMESTAMP
        }

        db.collection('products').add(product_data)
        print("Product created successfully:", product_data)  # Log product creation

        return jsonify({"message": "Product created successfully", "image_urls": image_urls}), 200

    except Exception as e:
        print("Error creating product:", str(e))  # Log the error
        return jsonify({"error": "Failed to create product: " + str(e)}), 500


@app.route('/get_products_by_creator_email/<creator_email>', methods=['GET'])
def get_products_by_creator_email(creator_email):
    try:
        # Retrieve products created by a specific worker using creator_email
        products_ref = db.collection('products').where('creator_email', '==', creator_email)
        products = products_ref.stream()

        product_list = []
        for product in products:
            product_data = product.to_dict()
            product_data['id'] = product.id  # Include the document ID
            product_list.append(product_data)

        return jsonify(product_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get_user_role/<user_id>', methods=['GET'])
def get_user_role(user_id):
    try:
        # Retrieve the user document from Firestore
        user_ref = db.collection('workers').document(user_id).get()

        if not user_ref.exists():
            return jsonify({"error": "User not found"}), 404
        
        user_data = user_ref.to_dict()
        role = user_data.get("role", "worker")  # Default to worker if no role specified

        return jsonify({"role": role}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/get_products', methods=['GET'])
def get_products():
    try:
        products_ref = db.collection('products')
        products = products_ref.stream()

        product_list = []
        for product in products:
            product_data = product.to_dict()
            product_data['id'] = product.id  # Include the document ID
            product_list.append(product_data)

        return jsonify(product_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/login_worker', methods=['POST'])
def login_worker():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    try:
        # Authenticate using Firebase Admin SDK
        user = auth.get_user_by_email(email)

        # Check if the user exists in Firestore (optional)
        worker_ref = db.collection('workers').document(user.uid).get()
        if not worker_ref.exists:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"message": "Login successful", "worker_id": user.uid}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get_workers', methods=['GET'])
def get_workers():
    try:
        workers_ref = db.collection('workers')
        workers = workers_ref.stream()

        worker_list = []
        for worker in workers:
            worker_data = worker.to_dict()
            worker_data['id'] = worker.id
            worker_list.append(worker_data)

        return jsonify(worker_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/')
def index():
    return "Flask Backend for Product App is running!"

if __name__ == '__main__':
    # app.run(debug=True)
    app.run()
