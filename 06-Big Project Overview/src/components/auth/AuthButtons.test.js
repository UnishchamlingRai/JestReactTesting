import { findAllByRole, render, screen } from "@testing-library/react";
import { createServer } from "../../test/server";
import { MemoryRouter } from "react-router";
import AuthButtons from "./AuthButtons";
import { exact } from "prop-types";
import { SWRConfig } from "swr";

async function renderComponent() {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );
  await screen.findAllByRole("link");
}

describe("When user is not signed in.", () => {
  createServer([
    {
      path: "/api/user",
      res: (req, res) => {
        console.log("USER IS NOT LOGED IN");
        return { user: null };
      },
    },
  ]);

  //createServer()---> Get '/api/user' ---> user {user:null}
  test("when user is not signed in, Sign in and sign up are visiable.", async () => {
    await renderComponent();
    const signInButton = await screen.findByRole("link", {
      name: /Sign In/i,
    });
    const signUpButton = await screen.findByRole("link", {
      name: /Sign Up/i,
    });
    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();

    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });

  test("when user is not signed in, Sign out in not visable", async () => {
    await renderComponent();
    const signOutButton = screen.queryByRole("link", {
      name: /Sign Out/i,
    });
    expect(signOutButton).not.toBeInTheDocument();
  });
});

describe("when user is signed in", () => {
  createServer([
    {
      path: "/api/user",
      res: (req, res) => {
        console.log("USER IS LOGED IN");
        return { user: { id: 3, email: "ram@gmail.com" } };
      },
    },
  ]);
  //createServer()---> Get 'api/user'---> user (user:{id:3, email:ram@gmail.com})
  test("when user is signed in, sign in and sign up are not visable", async () => {
    await renderComponent();
    const signedInButton = screen.queryByRole("link", { name: /Sign In/i });
    const signedUpButton = screen.queryByRole("link", { name: /Sign Up/i });
    expect(signedInButton).not.toBeInTheDocument();
    expect(signedUpButton).not.toBeInTheDocument();
  });
  test("when user is signed in, sign out button is viable", async () => {
    await renderComponent();
    const signOutButton = await screen.findByRole("link", {
      name: /Sign Out/i,
    });
    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveAttribute("href", "/signout");
  });
});

const pauch = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
