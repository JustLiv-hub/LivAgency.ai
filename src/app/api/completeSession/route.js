export async function POST(req) {
    const data = await req.json();
  
    // This is where you'd normally log to a database or send to HR
    console.log('✅ Session completed:', data);
  
    return Response.json({ success: true });
  }
  