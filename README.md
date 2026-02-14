<div align="center">
    <img src="./frontend/src/lib/img/logos/logo.png" alt="TigerRacing Logo" style="height:200px">
</div>
<hr />
<div align="center">
    <img src="https://img.shields.io/badge/bun%20-%23000000.svg?style=for-the-badge&logo=bun">
    <img src="https://img.shields.io/badge/typescript-%233178C6?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/svelte-%23FF3E00?style=for-the-badge&logo=svelte&logoColor=white">
    <img src="https://img.shields.io/badge/tailwind-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
    <img src="https://img.shields.io/badge/%2Enet-%23512BD4?style=for-the-badge&logo=dotnet&logoColor=white">
    <img src="https://img.shields.io/badge/postgresql-%234169E1?style=for-the-badge&logo=postgresql&logoColor=white">
    <img src="https://img.shields.io/badge/drizzle-%23C5F74F?style=for-the-badge&logo=drizzle&logoColor=black">
    <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
</div>
<br />
<div align="center">
    Club administration and project management portal for LSU FSAE.
</div>
<br />

## Prerequisites
 * [bun](https://bun.sh)
 * [PostgreSQL](http://postgresql.org)
 * [.NET](https://dotnet.microsoft.com)

## Installation
In the root directory, run the following command to install npm packages for all directories and subdirectories.
```
bun i
```

Populate the contents of `database/.env` as appropriate.
```env
# Supabase Database URL
DATABASE_URL=""
```

## Development
To run the client, run the following command in the `frontend` directory.
```sh
bun dev
```

To run the server, run the following command in `backend/TRFSAE.MemberPortal.API/`.
```sh
dotnet run
```

## Production
To deploy the database schema, navigate to the `database` directory and run the following.
```sh
bun run build && bun db:generate && bun db:push
```

Be careful if doing this on the production database! Important data could be lost if done incorrectly.\
**Do NOT** run this on the production database without prior approval from [liangricky7](https://github.com/liangricky7) or [DamienVesper](https://github.com/DamienVesper).

## Contributing
Please follow the conventions found in `COMMIT_FORMAT.md`. Any changes must be made through a pull request.
History rewrites are permitted on all branches except `main`. Squash / rebase as necessary to maintain a clean PR.
