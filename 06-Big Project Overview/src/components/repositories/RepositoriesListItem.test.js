import { findByRole, render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

// jest.mock("../tree/FileIcon.js", () => {
//   return () => {
//     return "File icon Component";
//   };
// });
function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "JavaScript",
    description: "The library for web and native user interfaces.",
    owner: {
      login: "facebook",
    },
    name: "react",
    html_url: "https://github.com/discountry/react",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
  return { repository };
}

test("show a link to a github home page for the repository", async () => {
  const { repository } = renderComponent();

  await screen.findByRole("img", { name: "JavaScript" });
  const link = screen.getByRole("link", {
    name: /github repository/,
  });
  expect(link).toHaveAttribute("href", repository.html_url);
  // screen.debug();
  // await pause();
  // screen.debug();
  // await act(async () => {
  //   await pause();
  // });
});

function pause() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve();
    }, 100);
  });
}

test("show the correct language icon(File icon)", async () => {
  renderComponent();
  const icon = await screen.findByRole("img", { name: /JavaScript/ });
  expect(icon).toHaveClass("js-icon");
});

test("show a link to a code editor", async () => {
  const { repository } = renderComponent();
  await screen.findByRole("img", { name: "JavaScript" });
  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });
  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
