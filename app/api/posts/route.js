import { NextResponse } from "next/server";

const DATA_URL = "https://jsonplaceholder.typicode.com/posts";

const API_KEY = process.env.API_KEY;

export async function GET() {
  const res = await fetch(DATA_URL);
  const posts = await res.json();
  return NextResponse.json(posts);
}

export const POST = async (request) => {
  try {
    const { title, body, userId } = await request.json();
    const res = await fetch(DATA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        userId,
      }),
    });
    if (res.status === 201) {
      const newData = await res.json();
      return NextResponse.json(newData);
    } else {
      console.error("Post req is failed with status :", res.status);
      return NextResponse.error("Post req failed");
    }
  } catch (err) {
    console.error("Post request error : ", err);
    return NextResponse.error("Post request failed");
  }
};

export const PUT = async (request) => {
  const { title, body, userId, id } = await request.json();

  const res = await fetch(`${DATA_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title,
      body,
      userId,
    }),
  });

  if (res.status === 200) {
    const updatePost = await res.json();
    return NextResponse.json(updatePost);
  } else {
    return NextResponse.error("PUT Request Failure");
  }
};

export const DELETE = async (request) => {
  try {
    const { id } = await request.json();

    const res = await fetch(`${DATA_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({ msg: "Data deleted" });
  } catch (err) {
    console.error("Delete request error : ", err);
    return NextResponse.error("Delete request failed");
  }
};
