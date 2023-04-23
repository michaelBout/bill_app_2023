/**
 * @jest-environment jsdom
 */
import { screen, fireEvent } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { ROUTES } from "../constants/routes";
import { localStorageMock } from "../__mocks__/localStorage";
import mockStore from "../__mocks__/store";

import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import BillsUI from "../views/BillsUI.js";

describe("Given I am connected as an employee", () => {
  // premiere situation
  describe("When I am on NewBill Page", () => {
    // declaration de 2 variables
    let onNavigate;
    let container;

    // avant les tests
    beforeEach(() => {
      document.body.innerHTML = NewBillUI();

      onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      // initialisation du localstorage à travers l'obejt.defineProperty
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });

      window.localStorage.setItem("user", JSON.stringify({ type: "employee" }));

      container = new NewBill({
        document,
        onNavigate,
        store: mockStore,
        localStorage: window.localStorage,
      });
    });

    test("Then i should see the new bill form", () => {
      expect(screen.getByTestId("form-new-bill")).toBeTruthy();
    });

    describe("When the form is ot required-completed", () => {
      test('I should not be able to post anything I remain on that new billpage', () => {
        const newBillForm = screen.getByTestId("form-new-bill");
        const handleSubmit = jest.fn(container.handleSubmit)
        newBillForm.addEventListener("submit", handleSubmit)
        fireEvent.submit(newBillForm)
        expect(newBillForm).toBeTruthy();
      })
    })
    test("Then ...", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      //to-do write assertion
    });
  });
  // deuxième situation
  describe("When I am on NewBill Page", () => {
    test("Then message should be displayed", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      const message = screen.getByText("Envoyer une note de frais");
      expect(message).toBeTruthy();
    });
  });
});
