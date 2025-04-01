from flask import Flask, request, jsonify
from g4f.client import Client
import json
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load college data from a JSON file (ensure colleges.json is in your project directory)
with open("data.json", "r", encoding="utf-8") as f:
    college_data = json.load(f)

# Initialize g4f client
client = Client()

def clean_output(output):
    """
    Removes markdown code block formatting from the output.
    """
    # Remove any leading/trailing triple backticks and language hints
    output = output.strip()
    output = re.sub(r"^```(?:json)?", "", output)
    output = re.sub(r"```$", "", output)
    return output.strip()

@app.route('/recommend', methods=['POST'])
def recommend():
    # Extract the required student input parameters from the request
    data = request.get_json()
    education_level = data.get("education_level", "")
    gpa = data.get("gpa", "")
    preferred_stream = data.get("preferred_stream", "")
    budget = data.get("budget", "")
    preferred_city = data.get("preferred_city", "")
    on_campus_housing = data.get("on_campus_housing", "")
    college_type = data.get("college_type", "")
    desired_career_path = data.get("desired_career_path", "")
    
    # Construct a prompt for g4f to generate recommendations in valid JSON
    prompt = f"""
You are an expert college recommendation engine. A student has provided the following details:
- Education Level: {education_level}
- High School GPA: {gpa}
- Preferred Stream: {preferred_stream}
- Budget for Tuition: {budget}
- Preferred City: {preferred_city}
- On-Campus Housing: {on_campus_housing}
- College Type Preference: {college_type}
- Desired Career Path: {desired_career_path}

Below is a JSON list of 50 bachelor-level colleges in Nepal with their key details:
{json.dumps(college_data, indent=2)}

Based on the student's input and the college data, please select the top 3 colleges that best match the student's preferences.
Return your answer as a valid JSON array with exactly 3 objects. Each object should have the following keys:
  - "college_name": (string)
  - "location": (string)
  - "affiliated_university": (string)
  - "explanation": (a brief explanation of why this college is a good match)

Ensure that your output is a valid JSON array with no additional text.
"""

    try:
        # Call g4f to get recommendations
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            web_search=False
        )
        raw_output = response.choices[0].message.content.strip()
        # Clean markdown formatting if present
        cleaned_output = clean_output(raw_output)
        # Attempt to parse the cleaned output as JSON
        recommendations = json.loads(cleaned_output)
    except Exception as e:
        # Return error with raw output for debugging
        return jsonify({"error": str(e), "raw_output": raw_output}), 500

    # Return the structured recommendation data
    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(debug=True)
