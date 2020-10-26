# JwtSample
.net core + angular + jwt



command to execute

------- .net core -------

dotnet restore
dotnet build
dotnet ef migrations add Initial
dotnet ef database update
dotnet run

localhost:5000/swagger

jwt authorization in swagger:

Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJhZG1pbiIsImV4cCI6MTU5Njk3MzYzOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIn0.H8kIOLbEkSsjj3YFX5P9AhN1tsk_ZcSw74cGn0Tlkcw


---- angular --------

'npm install'
'ng build' or 'ng build --prod'
'ng serve'

visit website on http://localhost:4200

login and password:

admin admin
user user
