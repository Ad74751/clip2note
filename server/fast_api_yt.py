import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi
import re
from bing_image_urls import bing_image_urls
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

prompt="""
        You are expericed teacher at prestigiuos Harvard University. 
        You will be taking the transcript text
        and providing detailed topic wise notes of the entire video.
        If the video contains mathematical data or any type of equation equations represent it using latex formatting.
        Also include import questions with answers based on the video in order to test students understanding about the video.
        Make sure the notes are in simplistic language and guide the students throught the process of understanding and
        learing the whole topic.
        Remeber do not mention your identity anywhere in the notes. 
        Insert diagram and images relavant to the video context for each topic.
        The Images should be in the format:
        <IMG>{text for the digarm}</IMG>
        For Example:
        <IMG>Image of an monkey</IMG>
        Transcript:  
"""
mindmap_prompt = """
                You are an experienced mindmap designer.
                You will be taking a blog post and converting it into mindmap using mermaid.js syntax.
                Blog Post:
"""

genai.configure(api_key=os.getenv("GOOGLE_GEMINI_API_KEY"))
model=genai.GenerativeModel("gemini-1.5-flash-latest")

def get_images(text: str):
    pattern = r'<IMG>(.*?)<\/IMG>'
    matches = re.findall(pattern, text)
    for match in matches:
        url = bing_image_urls(match, limit=1)[0]
        text = text.replace(f"<IMG>{match}</IMG>", f"![{match}]({url})")
    return text

def extract_transcript_details(youtube_video_url: str):
    try:
        video_id = youtube_video_url.split("=")[1]
        transcript_text = YouTubeTranscriptApi.get_transcript(video_id)
        transcript = " ".join([i["text"] for i in transcript_text])
        return transcript
    except Exception as e:
        raise e

def split_text_by_lines(text: str, lines_per_chunk: int):
    lines = text.splitlines(keepends=True)
    return [''.join(lines[i:i + lines_per_chunk]) for i in range(0, len(lines), lines_per_chunk)]

def generate_mindmap(prompt: str, text: str):
    response=model.generate_content(prompt+text)
    return response.text

def generate_gemini_content(transcript_text: str, prompt: str):
    response_text = ""
   
    chunks = split_text_by_lines(transcript_text, 10)
    for chunk in chunks:
        response=model.generate_content(prompt+chunk)
        response_text += response.text
    return response_text

@app.get("/get-detailed-notes/")
async def get_detailed_notes(url:str):
    youtubeLink = url
    if not youtubeLink:
        raise HTTPException(status_code=400, detail="YouTube link is required")
    try:
        transcript_text = extract_transcript_details(youtubeLink)
        summary = generate_gemini_content(transcript_text, prompt)
        # print(summary)
        # mindmap = generate_mindmap(mindmap_prompt, mindmap_prompt)
        summary = get_images(summary)
        return JSONResponse(content={"summary": summary, "mindmap": None})
    except Exception as e:
        print(e.message)
        raise HTTPException(status_code=500, detail=str(e))


