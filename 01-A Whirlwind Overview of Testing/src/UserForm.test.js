import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("get 1 button and two input element", () => {
  //render the component
  render(<UserForm />);

  //Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");
  //Asseertion- Make sure the component is doing what we except it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls on onUserAdd when the form is submitted", () => {
  //Not the best implementation

  //1) Try to render my component

  // const argList = [];
  // function callback(...args) {
  //   argList.push(args);
  // }// just for example to understand better about how we can recived argument from the called.

  const mock = jest.fn();
  render(<UserForm onUserAdd={mock} />);

  //2) find the two input
  // const [inputName, inputEmail] = screen.getAllByRole("textbox");
  const inputName = screen.getByRole("textbox", {
    name: /name/i,
  });
  const inputEmail = screen.getByRole("textbox", {
    name: /email/i,
  });
  //3) simulate typing in a name
  user.click(inputName);
  user.keyboard("unish");

  //4) simulate typing in a email
  user.click(inputEmail);
  user.keyboard("unish@gmail.com");

  //5) find the button
  const button = screen.getByRole("button");

  //6)simulate clicking the button
  user.click(button);

  //7) assert that onUserAdd was called with the right arguments
  // expect(argList).toHaveLength(1);
  // expect(argList[0][0]).toEqual({ name: "unish", email: "unish@gmail.com" });// just for exampl to understand

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: "unish",
    email: "unish@gmail.com",
  });
});

test("Input field should be empty when user submmited form", () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  user.click(nameInput);
  user.keyboard("unish");

  user.click(emailInput);
  user.keyboard("unish@gmail.com");

  user.click(button);

  // screen.debug();

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
