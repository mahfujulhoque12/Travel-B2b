export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received POST request:", body);
    return new Response("POST request received!", { status: 200 });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response("Error processing POST request", { status: 500 });
  }
}

export async function GET() {
  const fakeID = { idss: "123456", firstName: "Omar", lastName: "Pervez" };
  return new Response(JSON.stringify(fakeID), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    console.log("Received PUT request to update user data:", body);
    return new Response("PUT request processed successfully!", { status: 200 });
  } catch (error) {
    console.error("Error handling PUT request:", error);
    return new Response("Error processing PUT request", { status: 500 });
  }
}
