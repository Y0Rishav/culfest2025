import { NextApiRequest, NextApiResponse } from "next";
// import connectToDatabase from "./connectToDatabase";
import User from "../models/User.model";
import { hash } from "bcryptjs";
import connectToDatabase from "../conntectToDatabase";
import { getSecondDBUserModel } from "../connectToSecondDB";

type ResponseData = {
  status: number;
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: 405,
      message: "Method not allowed",
    });
  }

  try {
    const { email: rawEmail, formData } = req.body;
    const email = rawEmail?.toLowerCase();

    if (!email || !formData) {
      return res
        .status(400)
        .json({ status: 400, message: "All fields are required!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid email format",
      });
    }

    await connectToDatabase();



    // Check if user already exists
    const existingUser = await User.findOne({ email: new RegExp(`^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') });

    if (existingUser) {
      return res.status(409).json({
        status: 409,
        message: "User already exists with this email or phone",
      });
    }

    // Validate form data
    const {
      password,
      username,
      phone,
      city,
      state,
      gender,
      college,
      graduationYear,
      confirmPassword,
    } = formData;

    if (
      !password ||
      !username ||
      !confirmPassword ||
      !phone ||
      !city ||
      !state ||
      !college
    ) {
      return res
        .status(400)
        .json({ status: 400, message: "All form fields are required!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 400,
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: 400,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingPhoneUser = await User.findOne({ phone });
    if (existingPhoneUser) {
      return res.status(409).json({
        status: 409,
        message: "User already exists with this phone number",
      });
    }

    const hashedPassword = await hash(password, 10);

    const isNITJSREmail = /^[a-zA-Z0-9._%+-]+@nitjsr\.ac\.in$/;
    const isCollegeEmail = isNITJSREmail.test(email);

    // Create the user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: username,
      phone,
      city,
      state,
      college,
      isNITJSR: isCollegeEmail,
      graduationYear,
      gender,
    });

    if (!newUser) {
      return res.status(500).json({
        status: 500,
        message: "Failed to create user",
      });
    }

    // Also create user in the second database with the same _id
    try {
      const SecondDBUser = await getSecondDBUserModel();
      await SecondDBUser.create({
        _id: newUser._id, // same user id as primary database
        email,
        password: hashedPassword,
        name: username,
        phone,
        city,
        state,
        college,
        isNITJSR: isCollegeEmail,
        graduationYear,
        gender,
      });
    } catch (secondDbError) {
      console.error("Failed to create user in second database:", secondDbError);
      // Don't block signup if second DB write fails
    }



    return res.status(201).json({
      status: 201,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        city: newUser.city,
        state: newUser.state,
        college: newUser.college,
        isNITJSR: newUser.isNITJSR,
        graduationYear: newUser.graduationYear,
        gender: newUser.gender,
      },
    });
  } catch (error) {
    console.error("Signup error", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
}
