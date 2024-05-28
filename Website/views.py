from flask import Blueprint, render_template, session
import datetime

views = Blueprint('views', __name__)

@views.route('/')
def base():
    return render_template("base.html")

@views.route('/home')
def home():
    if 'start_time' not in session:
        session['start_time'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    return render_template("home.html")

@views.route('/video')
def video():
    return render_template("video.html")

@views.route('/raetsel01')
def raetsel01():
    return render_template("Raetsel01.html")

@views.route('/raetsel02')
def raetsel02():
    return render_template("Raetsel02.html")

@views.route('/raetsel03')
def raetsel03():
    return render_template("Raetsel03.html")