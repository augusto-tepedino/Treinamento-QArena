# 🗺️ QArena Test Automation Strategy Roadmap

A priority-focused, risk-based automation roadmap for **QArena** (`http://localhost:5173`), designed to guide step-by-step hands-on implementation and architecture evolution.

---

## 📂 1. Directory & Architectural Structure

Organize the `tests/` directory to separate isolated component tests from end-to-end user journeys:

```
tests/
├── components/           # Reusable UI component models (e.g., headerComponent.ts)
├── pages/                # Page Object Models (e.g., homePage.ts, loginPage.ts)
├── specs/                # Isolated UI component & element specs (e.g., headerComponent.spec.ts)
└── e2e/                  # End-to-end user journey specs (e.g., checkoutHappyPath.spec.ts)
```

---

## 🎯 2. Phased Implementation Roadmap

### ✅ **Phase 1: Foundational E2E Happy Path & Diverse Locators** — [COMPLETED]
* **Status:** ✅ **Completed** (`tests/e2e/checkoutHappyPath.spec.ts` fully implemented)
* **Primary Objective:** ✅ Validate the core business value journey (Can a user buy a product from start to finish?) while establishing locator fundamentals.
* **Accomplished Scenarios:**
  1. **Login:** Navigate to `/login` and authenticate with `usuario.sucesso@qazero.com` / `Qa@123456`.
  2. **Product Discovery:** Navigate to `/app/loja`, locate product using `.filter({ hasText: 'Caneca Bug Hunter' })`, and add to cart.
  3. **Toast & Badge Assertion:** Assert toast notification and sidebar cart badge increment to `'1'`.
  4. **Cart Management:** View `/app/carrinho`, verify product listing, unit price, quantity badge, and proceed to checkout.
  5. **Checkout & Summary:** Verify checkout summary section (`Resumo do pedido`), product price, and total value.
  6. **Confirmation & Credits:** Finalize purchase, click order confirmation heading, and verify QA credit balance updated to `'960.1'`.
* **Practiced Locators:**
  * `getByLabel`, `getByPlaceholder`, `getByRole`, locator filters (`locator('div.glass...').filter(...)`), DOM parent traversal (`locator('..')`), `getByTestId`.

---

### ⏳ **Phase 2: Authentication, Session & Access Control Deep Dives**
* **Status:** ⏳ **Next Up** (Starting with **2.1 Login**)
* **Primary Objective:** Test identity management, validation rules, error handling, and session security.

#### 🔐 **2.1: Login Scenarios** (Starting Point)
* [x] **Valid Login (Happy Path):** Login with `usuario.sucesso@qazero.com` / `Qa@123456` ➔ Assert URL redirect to `/app` and user session in sidebar.
* [x] **Invalid Email Format:** Input `invalidemail` ➔ Assert validation message `"Informe um e-mail em um formato válido"`.
* [x] **Invalid Credentials:** Input non-existent user (`usuario.invalido@qazero.com`) ➔ Assert general error message (`login-msg-erro-geral`).
* [x] **Blocked User:** Login with `usuario.bloqueado@qazero.com` ➔ Assert blocked account error message.
* [x] **Suspended User:** Login with `usuario.suspenso@qazero.com` ➔ Assert suspended account error message.
* [x] **No Permission User:** Login with `usuario.sempermissao@qazero.com` ➔ Verify login succeeds but access permissions are restricted.

#### 📝 **2.2: Cadastro (Registration Scenarios)**
* [x] **Successful Registration:** Fill form with valid name, generated CPF, email, and password ➔ Assert account creation & login.
* [x] **CPF Validation:** Test valid vs. invalid CPF digits.
* [x] **Required Fields & Password Rules:** Test empty fields, weak passwords, and email mask validation.
* [x] **Duplicate User Handling:** Attempt registration with an already registered email.

#### 🔄 **2.3: Session, Persistence & Access Control**
* [x] **Protected Routes:** Direct navigation to `/perfil`, `/pedidos`, or `/app` without login ➔ Assert redirect to `/login`.
* [x] **Session Persistence:** Refresh browser on `/app` while logged in ➔ Assert user remains logged in (`localStorage` state retained).
* [x] **Logout Flow:** Click logout ➔ Assert redirection to home/login and clearing of session state.
* [x] **Playwright `storageState` Setup:** Configure `auth.setup.ts` to save auth state for downstream automated tests.

---

### ⏳ **Phase 3: E-Commerce Feature Deep Dives & Architectural Refactoring**
* **Status:** ⏳ **Pending**
* **Primary Objective:** Expand module regression coverage and transition from raw spec locators / POM to **Feature Actions / App Actions**.

#### 🛒 **3.1: Store (`Loja`)**
* [ ] **Search Bar Filtering:** Input search query ➔ Assert product cards match search filter.
* [ ] **Category Tab Filtering:** Click category tabs ➔ Assert filtered product grid updates correctly.
* [ ] **Empty Search State:** Input non-existent product name ➔ Assert empty search state message.

#### 🛒 **3.2: Cart (`Carrinho`)**
* [ ] **Quantity Increments/Decrements:** Increase and decrease item quantities ➔ Assert updated unit & total prices.
* [ ] **Item Removal:** Click remove item ➔ Assert item removed from cart list and total recalculated.
* [ ] **Cart Badge Count:** Add items from store ➔ Assert header/sidebar cart badge count updates dynamically.

#### 👤 **3.3: Profile (`Perfil`)**
* [ ] **User Info Update:** Edit profile details ➔ Assert saved changes and persistence upon page reload.

#### 📦 **3.4: Orders (`Meus Pedidos`)**
* [ ] **Order History Listing:** Complete checkout flow ➔ Assert new order appears in order history list with correct status and total.

---

### ⏳ **Phase 4: QArena Specific — Bug Verification & Exploratory Automation**
* **Status:** ⏳ **Pending**
* **Primary Objective:** Target QArena's **33 deliberate bugs** planted across the 7 application labs.
* **Key Focus Areas:**
  * **Bug Verification Tests:** Write targeted negative assertions for identified bugs (e.g., input mask glitches, price calculation edge cases).
  * **Visual Smoke Tests:** Component rendering checks across different viewports (desktop, mobile).
  * **Accessibility (A11y):** Basic keyboard navigation and screen reader attributes.

---

## 🤝 3. Pair Programming Learning Approach

* **Student-Driven Coding:** The user writes all code directly in their IDE to build muscle memory and deep technical understanding.
* **Coach Role:** AI provides task breakdowns, locator hints, architectural context, and code reviews.
