from flask import Blueprint, render_template, session, redirect, url_for, request
import datetime

views = Blueprint('views', __name__)

@views.route('/')
def base():
    return render_template("index.html")

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
    return render_template("Raetsel01.html")

@views.route('/raetsel02')
def raetsel02():
    return render_template("Raetsel02.html")

@views.route('/raetsel03')
def raetsel03():
    return render_template("Raetsel03.html")

@views.route('/restart')
def restart():
    session.pop('start_time', None)
    session.pop('solved_riddles', None)
    return redirect(url_for('views.lose'))

@views.route('/check_solution', methods=['POST'])
def check_solution():
    current_riddle = request.form.get('riddle')
    user_solution = request.form.get('solution')

    correct_solutions = {
        'raetsel01': "Läufer f8, Springer h3, Turm h4",
        'raetsel02': "Leibspeise"
    }

    def normalize_string(s):
        return s.replace(" ", "").replace(",", "").lower()

    if current_riddle == 'raetsel03':
        # Logik für das dritte Rätsel
        result = check_riddle_03_solution(request.form)
    else:
        # Allgemeine Logik für die ersten beiden Rätsel
        normalized_user_solution = normalize_string(user_solution)
        normalized_correct_solution = normalize_string(correct_solutions[current_riddle])
        result = normalized_user_solution == normalized_correct_solution

    if 'solved_riddles' not in session:
        session['solved_riddles'] = {}

    session['solved_riddles'][current_riddle] = result
    session.modified = True

    return render_template(current_riddle + ".html", result=result)


def check_riddle_03_solution(form_data):
    correct_solution = {
        'solution_a': '1',
        'solution_b': '1',
        'solution_c': '1',
        'solution_d': '1',
        'solution_e': '1'
    }
    user_solution = {
        'solution_a': form_data.get('solution_a').strip().lower(),
        'solution_b': form_data.get('solution_b').strip().lower(),
        'solution_c': form_data.get('solution_c').strip().lower(),
        'solution_d': form_data.get('solution_d').strip().lower(),
        'solution_e': form_data.get('solution_e').strip().lower()
    }
    return all(user_solution[key] == correct_solution[key].lower() for key in correct_solution)


@views.route('/check_all_solved')
def check_all_solved():
    if all(session.get('solved_riddles', {}).values()):
        return redirect(url_for('views.win'))
    else:
        return redirect(url_for('views.home'))

@views.route('/win')
def win():
    return render_template('win.html')

@views.route('/lose')
def lose():
    return render_template('lose.html')



