const supabase = require("@supabase/supabase-js");
const supabaseClient = supabase.createClient('https://ahklkzjbqltjhrnocvcr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoa2xrempicWx0amhybm9jdmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3MDAzMDQsImV4cCI6MjAzMjI3NjMwNH0.05Cojf_N74ZcEbDyY1wm0phBBeITT5QX3Kq50KR1ZhA')
async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try{
        const{ data:{user}} = await supabaseClient.auth.getUser(token);
        if(!user){
            return res.status(401).json({ message: 'Unauthorized 1' })
        }
        return next()
    }
    catch{
        console.log("ERRor")
        return res.status(401).json({ message: 'Unauthorized 2' })
    }
}

module.exports = { verifyToken };
