import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("can receive a new user and show it in a list", () => {
  render(<App />);

  const inputName = screen.getByRole("textbox", { name: /name/i });
  const inputEmail = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  user.click(inputName);
  user.keyboard("unish");

  user.click(inputEmail);
  user.keyboard("unish@gmail.com");

  user.click(button);

  // screen.debug();

  const name = screen.getByRole("cell", { name: "unish" });
  const email = screen.getByRole("cell", { name: "unish@gmail.com" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
