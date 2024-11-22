import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { generateUsers } from "../utils/data";
import Home from "../page";
import { act } from "react";

jest.mock("../utils/data", () => ({
  generateUsers: jest.fn(),
}));

describe("Home Component", () => {
  beforeEach(async () => {
    const mockUsers = Array.from({ length: 100 }, (_, i) => ({
      name: `User ${i}`,
      email: `user${i}@example.com`,
    }));
    generateUsers.mockReturnValue(mockUsers);
    await act(async () => {
      render(<Home />);
    });
  });

  it("renders the header in Home component correctly", () => {
    expect(
      screen.getByText("User List with Virtualization")
    ).toBeInTheDocument();
  });

  it("renders search field", async () => {
    const input = screen.getByPlaceholderText("Search by name...");
    expect(input).toBeInTheDocument();
  });

  it("renders 'items per page' select", async () => {
    const perPageSelect = screen.getByRole("combobox", {
      name: /items per page:/i,
    });
    expect(perPageSelect).toBeInTheDocument();
  });

  it("renders not full list of user by default", async () => {
    const userRows = await screen.findAllByText(/User \d+/i);
    expect(userRows.length).toBeLessThan(100);
  });

  it("renders at least as many items as the selected itemsPerPage", async () => {
    const perPageSelect = screen.getByLabelText("Items per page:");
    expect(perPageSelect).toBeInTheDocument();
    await userEvent.selectOptions(perPageSelect, "8");
    const userRows = await screen.findAllByText(/User \d+/i);
    expect(userRows.length).toBeGreaterThanOrEqual(8);
  });

  it("renders the correct number of rows based on `perPage`", async () => {
    const select = screen.getByLabelText("Items per page:");
    await userEvent.selectOptions(select, "3");
    expect(screen.getByText("User 0")).toBeInTheDocument();
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 2")).toBeInTheDocument();
  });

  it("updates the list when search is performed", async () => {
    const input = screen.getByPlaceholderText("Search by name...");
    await userEvent.type(input, "User 50");
    const rows = screen.getAllByText(/User 50/);
    expect(rows.length).toBe(1);
    expect(rows[0]).toHaveTextContent("User 50");
  });

  it("scrolls to the correct index when search value was changed", async () => {
    const input = screen.getByPlaceholderText("Search by name...");
    await userEvent.type(input, "User 10");
    const rows = screen.getAllByText(/User 10/);
    expect(rows.length).toBe(1);
    expect(rows[0]).toHaveTextContent("User 10");
    await userEvent.clear(input);
    await userEvent.type(input, "User 50");
    const rowsAfterType = screen.queryAllByText(/User 10/);
    expect(rowsAfterType.length).toBe(0);
  });
});
