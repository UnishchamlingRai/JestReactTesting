import { render, screen } from "@testing-library/react";

import HomeRoute from "./HomeRoute";
import { MemoryRouter } from "react-router";

import { createServer } from "../test/server";
//resuable handeler
createServer([
  {
    path: "/api/repositories",
    method: "get",
    res: (req, res, ctx) => {
      const quary = req.url.searchParams.get("q");
      const language = quary.split("language:")[1];
      return {
        items: [
          {
            id: 1,
            full_name: `${language}_one`,
          },
          {
            id: 2,
            full_name: `${language}_two`,
          },
        ],
      };
    },
  },
]);

// const handlers = [
//   rest.get("/api/repositories", (req, res, ctx) => {
// const quary = req.url.searchParams.get("q");
// const language = quary.split("language:")[1];

//     return res(
//       ctx.json({
// items: [
//   {
//     id: 1,
//     full_name: `${language}_one`,
//   },
//   {
//     id: 2,
//     full_name: `${language}_two`,
//   },
// ],
//       })
//     );
//   }),
// ];

// const server = setupServer(...handlers);

// beforeAll(() => {
//   server.listen();
// });
// afterEach(() => {
//   server.resetHandlers();
// });
// afterAll(() => {
//   server.close();
// }

// );

test("Render two link for each Language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
    //Loop over each language
    //For each language, make sure we see two links
    //Assert that the links have the appropriae full_name
  );
  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];
  for (let language of languages) {
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}_two`);
  }
  //   await pauch;
  //   screen.debug();
});

const pauch = new Promise((resolve) => setTimeout(resolve, 100));
