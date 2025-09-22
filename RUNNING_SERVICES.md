# Running StudyMate Services Without Docker

This guide explains how to run the StudyMate backend services locally without Docker.

## Prerequisites

1. Python 3.8 or higher
2. Virtual environment (recommended)
3. Supabase account and project
4. Groq API key (optional, for AI features)

## Setup Instructions

### 1. Create and Activate Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
# Run the installation script
python install_dependencies.py
```

### 3. Configure Environment Variables

Update the `.env` file in the `backend` directory with your actual credentials:

```env
# Default API Keys (fallback if service-specific keys not provided)
GROQ_API_KEY=your_default_groq_api_key_here
GEMINI_API_KEY=your_default_gemini_api_key_here

# Service-specific API Keys (optional, for using different keys per service)
RESUME_ANALYZER_GROQ_KEY=your_resume_analyzer_groq_key_here
RESUME_ANALYZER_GEMINI_KEY=your_resume_analyzer_gemini_key_here
PROFILE_SERVICE_GROQ_KEY=your_profile_service_groq_key_here
PROFILE_SERVICE_GEMINI_KEY=your_profile_service_gemini_key_here
COURSE_SERVICE_GROQ_KEY=your_course_service_groq_key_here
COURSE_SERVICE_GEMINI_KEY=your_course_service_gemini_key_here

# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_actual_supabase_service_role_key_here

# Database Configuration (Supabase PostgreSQL)
SUPABASE_DB_URL=postgresql://postgres:your_password@your-project-ref.supabase.co:5432/postgres

# JWT Configuration (for internal service communication)
JWT_SECRET=your_secure_jwt_secret_here

# Service URLs (Local development)
RESUME_ANALYZER_URL=http://localhost:8003
PROFILE_SERVICE_URL=http://localhost:8006
COURSE_GENERATION_URL=http://localhost:8001
INTERVIEW_COACH_URL=http://localhost:8002
```

### 4. Run Services

Each service should be run in a separate terminal:

**Terminal 1 - Profile Service (port 8006):**
```bash
cd backend
python start_profile_service.py
```

**Terminal 2 - Resume Analyzer (port 8003):**
```bash
cd backend/agents/resume-analyzer
python -m uvicorn main:app --host 0.0.0.0 --port 8003 --reload
```

**Terminal 3 - Course Service (port 8001):**
```bash
cd backend/agents/course-service
python -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 4 - DSA Service (port 8002):**
```bash
cd backend/agents/dsa-service
python -m uvicorn main:app --host 0.0.0.0 --port 8002 --reload
```

**Terminal 5 - API Gateway (port 8000):**
```bash
cd backend
python start_api_gateway.py
```

## Service URLs

- **API Gateway**: http://localhost:8000
- **Profile Service**: http://localhost:8006
- **Resume Analyzer**: http://localhost:8003
- **Course Service**: http://localhost:8001
- **DSA Service**: http://localhost:8002

## Health Checks

Each service has a `/health` endpoint you can use to verify it's running:

- http://localhost:8000/health (API Gateway)
- http://localhost:8006/health (Profile Service)
- http://localhost:8003/health (Resume Analyzer)
- http://localhost:8001/health (Course Service)
- http://localhost:8002/health (DSA Service)

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure you're running commands from the correct directories
2. **Port Conflicts**: Ensure no other services are using the required ports
3. **Database Connection**: Verify your Supabase credentials are correct
4. **Missing Dependencies**: Run the installation script if you encounter import errors

### Dependency Installation

If you encounter missing dependencies, install them individually:

```bash
# Install main requirements
pip install -r backend/requirements.txt

# Install service-specific requirements
pip install -r backend/agents/profile-service/requirements.txt
pip install -r backend/agents/resume-analyzer/requirements.txt
pip install -r backend/agents/course-service/requirements.txt
pip install -r backend/agents/dsa-service/requirements.txt
pip install -r backend/api-gateway/requirements.txt
```

## Frontend Setup

To run the frontend:

```bash
# Install dependencies
npm install

# Create .env file in root directory with your Gemini API key
echo "VITE_GEMINI_API_KEY=your_gemini_api_key" > .env

# Run development server
npm run dev
```

The frontend will be available at http://localhost:5173
