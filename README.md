<img width="1536" height="1024" alt="file_00000000a5348209aad7879b2c7a47d3-1793167458867" src="https://github.com/user-attachments/assets/83e39ddc-d3ae-4fdb-bf85-9e695894dafe" />

---

## (1) Next.js-Jorimping-Dev
> Next.js(16)·App Router | Prisma 6 | Neon PostgreSQL | TypeScript | Tailwind CSS

○ 전체 구조 : 브라우저에서 버튼을 누르면 Next.js의 화면 또는 API가 Prisma를 호출하고 Prisma가 SQL로 바꿔 Neon에 보냅니다. 
Neon이 PlanetScale 자리에 들어간 것이고, Prisma는 그대로 사용합니다.

---

#### ■  Getting Started

```bash
npm install prisma@6 typescript ts-node @types/node --save-dev
npm install @prisma/client@6
```
```bash
// prisma 초기화
npx prisma init --datasource-provider postgresql
```
