import { users } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ msg: "Error", error }, { status: 500 });
  }
};

export const POST = async (req, res) => {
  const { name } = await req.json();
  console.log(name);

  try {
    const newData = { name };
    newData.id = users.length + 1;
    users.push(newData);
    return NextResponse.json({users})
  } catch (error) {
    return NextResponse.json({ msg: "Error", error }, { status: 500 });
  }
};
