# TigerRacing_MemberPortal
TigerRacing Web Application to implement Gantt functionality onto a centralized website + financial dashboards for business members

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: ASP.NET Core C#
- Database: PostgreSQL with Supabase

## Getting Started

### Prerequisites
- Node.js 18+
- .NET 8 SDK
- PostgreSQL (or Supabase account)

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```
### Backend Setup
cd backend/Server.Api
dotnet restore
dotnet ef database update
dotnet run