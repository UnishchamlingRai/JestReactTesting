import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";
import { exact } from "prop-types";

test("repostrySummary component should show the Language of particular repostry", () => {
  const repository = {
    stargazers_count: "228365",
    open_issues: "830",
    forks: "46723",
    language: "javascript",
  };
  render(<RepositoriesSummary repository={repository} />);

  for (let key in repository) {
    const language = screen.getByText(new RegExp(repository[key]));
    expect(language).toBeInTheDocument();
  }
});
