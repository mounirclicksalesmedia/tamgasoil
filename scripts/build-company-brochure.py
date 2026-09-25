"""Render bilingual company overviews from exported website copy.
Run after exporting tmp/pdfs/brochure-copy.json with the website dictionaries.
Requires reportlab, arabic-reshaper, python-bidi, Pillow and pymupdf for QA.
"""
import json, shutil
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from PIL import Image, ImageOps
import arabic_reshaper
from bidi.algorithm import get_display

ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'tmp/pdfs/brochure-copy.json').read_text())
FONT='/System/Library/Fonts/Supplemental/'
pdfmetrics.registerFont(TTFont('TAM',FONT+'Tahoma.ttf'))
pdfmetrics.registerFont(TTFont('TAM-Bold',FONT+'Tahoma Bold.ttf'))
W,H=595.28,841.89
GREEN='#05211a'; WINE='#781d37'; MUTED='#56665e'; PAPER='#faf9f5'
for locale,d in DATA.items():
    rtl=locale=='ar';t=d['t'];content=d['c'];pages=d['p']
    output=ROOT/f'output/pdf/tam-company-overview-{locale}.pdf'
    cv=canvas.Canvas(str(output),pagesize=(W,H));cv.setTitle(t['brochureLabel']+' | TAM');cv.setAuthor('TAM for Oil & Gas Services')
    def shaped(s):return get_display(arabic_reshaper.reshape(s)) if rtl else s
    def text(s,x,y,width,size=12,color=GREEN,bold=False,leading=None):
        font='TAM-Bold' if bold else 'TAM';lead=leading or size*1.65;cv.setFont(font,size);cv.setFillColor(HexColor(color))
        words=s.split();lines=[];line=''
        for word in words:
            test=(line+' '+word).strip()
            if line and pdfmetrics.stringWidth(shaped(test),font,size)>width:lines.append(line);line=word
            else:line=test
        if line:lines.append(line)
        for line in lines:
            if rtl:cv.drawRightString(x+width,y,shaped(line))
            else:cv.drawString(x,y,line)
            y-=lead
        return y
    def base(num,label):
        cv.setFillColor(HexColor(PAPER));cv.rect(0,0,W,H,fill=1,stroke=0)
        cv.drawImage(str(ROOT/'public/brand/tam-logo-transparent.png'),42,H-92,width=160,height=55,preserveAspectRatio=True,mask='auto')
        text(label,275,H-65,278,10,MUTED)
        cv.setStrokeColor(HexColor('#dce3dd'));cv.line(42,48,W-42,48)
        cv.setFont('TAM',8);cv.setFillColor(HexColor(MUTED));cv.drawString(42,30,'tamoilgas.com  /  Doha, Qatar');cv.drawRightString(W-42,30,f'{locale.upper()}  /  {num:02}')
    def photo(path,x,y,w,h):
        im=ImageOps.fit(Image.open(ROOT/path).convert('RGB'),(int(w*2),int(h*2)))
        cv.drawImage(ImageReader(im),x,y,width=w,height=h)
    base(1,t['brochureLabel'])
    photo('public/media/tank-farm-enhanced.webp',0,370,W,325)
    cv.setFillColor(HexColor(GREEN));cv.rect(0,370,W,125,fill=1,stroke=0)
    text(t['companyTitle'],42,465,W-84,25,'#ffffff',True,34)
    y=text(t['companyIntro'],42,326,W-84,14,GREEN,False,23)
    text(t['brochureNote'],42,y-24,W-84,10,MUTED,False,17)
    y=150
    for i,item in enumerate(t['brochureItems']):
        text(f'0{i+1}  /  '+item,42,y,W-84,11,WINE,True);y-=28
    cv.showPage()
    base(2,t['nav']['services'])
    y=text(t['servicesTitle'],42,710,W-84,24,GREEN,True,33)-20
    for i,item in enumerate(content['services']['items']):
        x=42 if (i%2==0) != rtl else 310
        top=y-(i//2)*137
        cv.setFillColor(HexColor('#ffffff'));cv.roundRect(x-10,top-112,253,128,12,fill=1,stroke=0)
        ty=text(f'0{i+1}  '+item['title'],x,top,227,11.5,GREEN,True,17)
        text(item['body'],x,ty-7,227,9.3,MUTED,False,14.5)
    cv.showPage()
    base(3,t['sections']['strategy'])
    y=text(t['strategyTitle'],42,715,W-84,23,GREEN,True,33)-15
    y=text(t['strategyIntro'],42,y,W-84,11,MUTED,False,19)-22
    for i,item in enumerate(t['priorities']):
        y=text(f'0{i+1}  /  '+item['title'],42,y,W-84,13,GREEN,True,20)
        y=text(item['body'],42,y-4,W-84,11,MUTED,False,19)-25
    cv.setFillColor(HexColor(GREEN));cv.roundRect(42,83,W-84,85,14,fill=1,stroke=0)
    text(t['nav']['proposal'],60,139,W-120,15,'#ffffff',True)
    cv.setFont('TAM',10);cv.setFillColor(HexColor('#bcd1c7'));cv.drawString(60,105,f'tamoilgas.com/{locale}/request-proposal')
    cv.linkURL(f'https://tamoilgas.com/{locale}/request-proposal',(42,83,W-42,168),relative=0)
    cv.save()
    shutil.copyfile(output,ROOT/f'public/downloads/{output.name}')
    print(output)
