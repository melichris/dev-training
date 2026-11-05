import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema, taskSchema } from "../shared/schemas";

describe("loginSchema", () => {
  it("accepts valid login data", () => {
    expect(
      loginSchema.safeParse({ username: "chris", password: "secret123" }).success,
    ).toBe(true);
  });

  it("rejects a short username with the expected message", () => {
    const result = loginSchema.safeParse({
      username: "ab",
      password: "secret123",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Username must be at least 3 characters",
      );
    }
  });
});

describe("taskSchema", () => {
  it("accepts valid task data", () => {
    expect(taskSchema.safeParse({ title: "Write tests" }).success).toBe(true);
  });

  it("rejects a short title with the expected message", () => {
    const result = taskSchema.safeParse({ title: "ab" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Title must be at least 3 characters",
      );
    }
  });
});

describe("registerSchema", () => {
  it("accepts valid registration data", () => {
    expect(
      registerSchema.safeParse({
        username: "chris",
        email: "chris@example.com",
        password: "secret123",
        confirmPassword: "secret123",
      }).success,
    ).toBe(true);
  });

  it("reports password confirmation mismatch on confirmPassword", () => {
    const result = registerSchema.safeParse({
      username: "chris",
      email: "chris@example.com",
      password: "secret123",
      confirmPassword: "different",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({
          message: "Passwords do not match",
          path: ["confirmPassword"],
        }),
      );
    }
  });
});
