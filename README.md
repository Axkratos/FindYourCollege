# College Recommendation System

## 📌 Overview
This is a React-based College Recommendation System that suggests the best colleges based on user input. The application utilizes a Flask backend, which is deployed on Render.

## 🚀 Features
- Engaging UI with animations and modern design
- AI-powered college recommendations
- Dynamic form inputs with real-time validation
- Loading modal with AI processing simulation
- Responsive design using Tailwind CSS
- Backend deployed on Render (auto-wakes on request)



## 🔗 API Endpoint
The frontend communicates with the backend through the following endpoint:
```
POST https://findyourcollege.onrender.com/recommend
```
Expected request body:
```json
{
  "education_level": "Bachelor's",
  "gpa": "3.8",
  "preferred_stream": "IT",
  "budget": "medium",
  "preferred_city": "Kathmandu",
  "on_campus_housing": "Yes",
  "college_type": "Any",
  "desired_career_path": "Data Scientist"
}
```

## ⚠️ Data Disclaimer
This project uses dummy data for testing purposes. The college information displayed is not real and is only meant for demonstration. No real student data is collected, stored, or processed.

## 🤖 AI-Powered Recommendations
This project utilizes a GPT-like Large Language Model (LLM) to generate college recommendations based on the user's inputs. The AI processes factors such as GPA, budget, preferred career path, and college type to provide ranked suggestions. The responses are generated dynamically to simulate real-world decision-making.

## 📜 License
This project is licensed under the MIT License.

---
### 💡 Contribute
Feel free to submit pull requests, open issues, or suggest features to improve this project!

