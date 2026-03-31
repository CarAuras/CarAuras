const User = require("../../models/users/userSchema");
const bcrypt = require("bcryptjs");
const { Signup } = require("../../src/controllers/users/signup");
const { createSecretToken } = require("../../src/utils/utils");
const {
  successResponse,
  conflictResponse,
} = require("../../src/utils/responseHelpers");

jest.mock("../../models/users/userSchema");
jest.mock("bcryptjs");
jest.mock("../../src/utils/utils");
jest.mock("../../src/utils/responseHelpers");

describe("Signup Function", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: "test@example.com",
        phone_number: "1234567890",
        password: "password",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      cookie: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user and return a 200 response", async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    const mockUser = { _id: "123", ...req.body, password: "hashedPassword" };
    User.create.mockResolvedValue(mockUser);
    createSecretToken.mockReturnValue("mockToken");
    successResponse.mockImplementation((data) => ({ statusCode: 200, data }));

    await Signup(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({
      $or: [{ email: "test@example.com" }, { phone_number: "1234567890" }],
    });
    expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
    expect(User.create).toHaveBeenCalledWith({
      ...req.body,
      password: "hashedPassword",
    });
    expect(createSecretToken).toHaveBeenCalledWith("123");
    expect(res.cookie).toHaveBeenCalledWith("token", "mockToken", {
      withCredentials: true,
      httpOnly: false,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 200,
      data: { user: mockUser },
    });
  });

  it("should return a 409 response if user already exists", async () => {
    User.findOne.mockResolvedValue({ email: "test@example.com" });
    conflictResponse.mockImplementation(() => ({ statusCode: 409 }));

    await Signup(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({
      $or: [{ email: "test@example.com" }, { phone_number: "1234567890" }],
    });
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.send).toHaveBeenCalledWith({ statusCode: 409 });
  });

  it("should handle errors", async () => {
    const mockError = new Error("Database error");
    User.findOne.mockRejectedValue(mockError);
    console.error = jest.fn();

    await Signup(req, res, next);

    expect(console.error).toHaveBeenCalledWith(mockError);
  });
});
