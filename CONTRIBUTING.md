# Contributing

If you would like to fork/make changes on a new branch and create a pull request, please feel free I would love for this to be a community project

## Tech

React (Vite) + React Compiler, TypeScript, shadcn/ui + tailwind, zustand, Tanstack Form, zod

User data is stored in local storage

Screen/console data is 'stored' as JS objects and loaded into more objects under the keys I need at runtime. I didn't want to create a backend for a project this basic but open to suggestions if there are better ideas

## Run locally

Everything is just in the React SPA so it's just the classic:

```
pnpm install
pnpm dev
```

## We Need You!

- More emulation handhelds [here](src/lib/screenData.ts)!
- Increasing performance/reducing filesizes delivered to client
- I'm not super familiar with home console emulation but I would like to add the PAL resolution outputs so if you know how all that works, let me know
- CSS inches are not real inches so some way to scale the rendered screens to match the real screen sizes would be awesome
- If you have a good idea I'd love to hear it!
