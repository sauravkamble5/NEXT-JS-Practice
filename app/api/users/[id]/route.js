import { users } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const id = req.url.split("users/")[1];
    console.log(id);
    console.log(users);

    const singleData = users.filter((user) => user.id.toString() === id);
    console.log(singleData);

    if (singleData.length === 0) {
      return NextResponse.json({ msg: "Data not found" });
    }
    return NextResponse.json({ msg: "OK", singleData });
  } catch (error) {
    return NextResponse.json({ msg: "Error", error }, { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
    const id = req.url.split("users/")[1];

    //Find th eindex of the user to delete
    const userIndex = users.findIndex((user) => user.id.toString() === id);

    if (userIndex === -1) {
      return NextResponse.json({ msg: "User not found" });
    }

    //Remove user from the User  Array
    users.splice(userIndex, 1);
    console.log(users);
    return NextResponse.json({ msg: "User Deleted Successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ msg: "Error", err }, { status: 500 });
  }
};

export const PUT = async (req) => {
  try {
    const id = req.url.split("users/")[1];
    const { name } = await req.json();

    //Find the User to update
    const user = users.find((user) => user.id.toString() === id);
    if (!user) {
      return NextResponse.json({ msg: "User not found" });
    }
    user.name = name;
    console.log(user);
    return NextResponse.json({ msg: "User Updated Successfully" });
  } catch (err) {
    return NextResponse.json({ msg: "Error", err }, { status: 500 });
  }
};
