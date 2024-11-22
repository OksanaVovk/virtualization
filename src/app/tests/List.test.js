import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { generateUsers } from "../utils/data";
import Home from "../page";
import { act } from "react";
import { List } from "react-virtualized";

jest.mock("react-virtualized", () => {
  return {
    List: jest.fn(),
  };
});

jest.mock("../utils/data", () => ({
  generateUsers: jest.fn(),
}));

const ROW_WIDTH = 600;
const ROW_HEIGHT = 50;
let userNumber;

describe("List Component", () => {
  beforeEach(async () => {
    userNumber = Math.floor(Math.random() * 100) + 100;
    const mockUsers = Array.from({ length: userNumber }, (_, i) => ({
      name: `User ${i}`,
      email: `user${i}@example.com`,
    }));
    generateUsers.mockReturnValue(mockUsers);
    await act(async () => {
      render(<Home />);
    });
  });

  it("calls List component when rendering Home", () => {
    expect(List).toHaveBeenCalled();
  });

  it("calls List component with correct props when rendering Home", () => {
    expect(List).toHaveBeenCalledWith(
      expect.objectContaining({
        rowCount: userNumber,
        rowRenderer: expect.any(Function),
        width: ROW_WIDTH,
        rowHeight: ROW_HEIGHT,
        height: 250,
      }),
      {}
    );
  });

  it("calls List component with correct props when itemsPerPage was changed", async () => {
    const perPageSelect = screen.getByLabelText("Items per page:");
    await userEvent.selectOptions(perPageSelect, "8");
    expect(List).toHaveBeenCalledWith(
      expect.objectContaining({
        rowCount: userNumber,
        rowRenderer: expect.any(Function),
        width: ROW_WIDTH,
        rowHeight: ROW_HEIGHT,
        height: 400,
      }),
      {}
    );
  });

  it("calls List component with correct props when search was performed", async () => {
    const input = screen.getByPlaceholderText("Search by name...");
    await userEvent.type(input, "User 50");
    await waitFor(() => {
      expect(List).toHaveBeenCalledWith(
        expect.objectContaining({
          rowCount: userNumber,
          rowRenderer: expect.any(Function),
          width: ROW_WIDTH,
          rowHeight: ROW_HEIGHT,
          height: 250,
          scrollToIndex: 50,
        }),
        {}
      );
    });
  });
});
