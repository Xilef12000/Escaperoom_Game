from flask import Blueprint, render_template, session, redirect, url_for, request
import datetime

views = Blueprint('views', __name__)

@views.route('/')
def base():
    return render_template("base.html")

@views.route('/home')
def home():
    if 'start_time' not in session:
        session['start_time'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    if 'solved_riddles' not in session:
        session['solved_riddles'] = {'raetsel01': False, 'raetsel02': False, 'raetsel03': False}
    return render_template("home.html")

@views.route('/video')
def video():
    return render_template("video.html")

@views.route('/raetsel01')
def raetsel01():
    return render_template("raetsel01.html")

@views.route('/win')
def win():
    return render_template(win.html)

@views.route('/raetsel02')
def raetsel02():
    return render_template("raetsel02.html")

@views.route('/raetsel03')
def raetsel03():
    return render_template("raetsel03.html")

@views.route('/restart')
def restart():
    session.pop('start_time', None)
    session.pop('solved_riddles', None)
    return redirect(url_for('views.base'))


@views.route('/check_solution', methods=['POST'])
def check_solution():
    user_solution = request.form.get('solution')
    current_riddle = request.form.get('riddle')
    solutions = {
        'raetsel01': "Läufer f8, Springer h3, Turm h4",
        'raetsel02': "Lösung für Rätsel 2",
        'raetsel03': "Lösung für Rätsel 3"
    }
    correct_solution = solutions.get(current_riddle, "")
    def normalize_string(s):
        return s.replace(" ", "").replace(",", "").lower()

    # Rätsel 1
    if request.referrer.endswith('raetsel01'):
        correct_solution = "Läufer f8, Springer h3, Turm h4"
    # Rätsel 2
    elif request.referrer.endswith('raetsel02'):
        correct_solution = "Leibspeise"
    # Rätsel 3
    elif request.referrer.endswith('raetsel03'):
        correct_solution = "yet_another_solution"
    else:
        # Fallback, falls die URL nicht übereinstimmt
        return redirect(url_for('views.home'))

    # Normalisierte Versionen der Lösungen
    normalized_user_solution = normalize_string(user_solution)
    normalized_correct_solution = normalize_string(correct_solution)

    # Überprüfen, ob die normalisierten Strings übereinstimmen
    if normalized_user_solution == normalized_correct_solution:
        result = True
    else:
        result = False

    # Extrahieren des Vorlagennamens aus der URL
    template_name = request.referrer.split('/')[-1] + ".html"
    # Rendern der Vorlage mit dem Ergebnis
    return render_template(template_name, result=result)

@views.route('/check_all_solved')
def check_all_solved():
    if all(session['solved_riddles'].values()):
        return "Herzlichen Glückwunsch! Sie haben alle Rätsel gelöst."
    else:
        return "Es gibt noch ungelöste Rätsel. Weiter so!"