import { getAllByRole, render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

function renderComponent() {
  const users = [
    {
      name: "unish",
      email: "unish@gmail.com",
    },
    {
      name: "ram",
      email: "ram@gmail.com",
    },
  ];
  render(<UserList users={users} />);
  return { users };
}

test("render one row per user", () => {
  renderComponent();

  // const { container } = render(<UserList users={users} />);
  //   screen.logTestingPlaygroundURL();
  // const rows = screen.getAllByRole("row");
  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  // const rows = container.querySelectorAll("tbody tr");
  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", () => {
  const { users } = renderComponent();
  // screen.logTestingPlaygroundURL();
  for (const user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
